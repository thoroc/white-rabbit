#!/usr/bin/env bun

import { spawnSync } from 'child_process';
import fs from 'fs';

const CONFIG_PATH = '.opencode/tool/version-control/config.json';

type Config = {
    validateConventionalCommits?: boolean;
    kbPath?: string | null;
    bypassValidationWithExplicitApproval?: boolean;
    requireExplicitFileConfirmation?: boolean;
    kbFilenameConvention?: string;
};

const loadConfig = () => {
    try {
        const raw = fs.readFileSync(CONFIG_PATH, 'utf8');
        return JSON.parse(raw);
    } catch (err) {
        return {
            validateConventionalCommits: false,
            kbPath: null,
            bypassValidationWithExplicitApproval: false,
            requireExplicitFileConfirmation: false,
            kbFilenameConvention: 'lowercase-kebab',
        };
    }
};

const ensureGitRepo = () => {
    const rev = spawnSync('git', ['rev-parse', '--is-inside-work-tree'], {
        encoding: 'utf8',
    });
    if (rev.status !== 0 || String(rev.stdout || '').trim() !== 'true') {
        console.error('Not a git repository or git is not available in PATH.');
        process.exit(1);
    }
};

const runStatus = () => {
    const git = spawnSync('git', ['status', '--porcelain'], {
        encoding: 'utf8',
    });
    if (git.status === 0) {
        if (git.stdout && String(git.stdout).trim() !== '') {
            process.stdout.write(git.stdout);
        }
        process.exit(0);
    }

    console.error(
        'Unable to get git status:',
        git.stderr || `exit ${git.status}`
    );
    process.exit(git.status || 1);
};

const promptYesNo = (prompt: string) => {
    const cmd = `read -p "${prompt} " ans; printf "%s" "$ans"`;
    const out = spawnSync('sh', ['-c', cmd], {
        encoding: 'utf8',
        stdio: ['inherit', 'pipe', 'pipe'],
    });
    if (out.status !== 0) return false;
    const val = String(out.stdout || '')
        .trim()
        .toLowerCase();
    return val === 'y' || val === 'yes';
};

const promptForString = (prompt: string) => {
    const cmd = `read -p "${prompt} " ans; printf "%s" "$ans"`;
    const out = spawnSync('sh', ['-c', cmd], {
        encoding: 'utf8',
        stdio: ['inherit', 'pipe', 'pipe'],
    });
    if (out.status !== 0) return '';
    return String(out.stdout || '').trim();
};

const isConventionalCommit = (message: string) => {
    const re =
        /^(feat|fix|docs|style|refactor|perf|test|chore|ci|build|revert|wip)(?:\([a-zA-Z0-9_\- ]+\))?:\s.+$/;
    return re.test(message.trim());
};

const parseFlags = (argsFrom: string[]) => {
    let noVerify = false;
    let dryRun = false;
    const filtered: string[] = [];
    for (const a of argsFrom) {
        if (a === '--no-verify' || a === '-n') {
            noVerify = true;
            continue;
        }
        if (a === '--dry-run' || a === '-d') {
            dryRun = true;
            continue;
        }
        filtered.push(a);
    }
    return { noVerify, dryRun, filtered };
};

const stageAll = () => {
    const add = spawnSync('git', ['add', '--all'], {
        encoding: 'utf8',
        stdio: 'pipe',
    });
    if (add.status !== 0) {
        if (add.stdout) process.stdout.write(add.stdout);
        if (add.stderr) process.stderr.write(add.stderr);
        console.error('git add failed with exit code', add.status);
        process.exit(add.status || 1);
    }
};

const getStagedFiles = (): string => {
    const staged = spawnSync('git', ['diff', '--cached', '--name-only'], {
        encoding: 'utf8',
    });
    if (staged.status !== 0) {
        console.error(
            'Failed to determine staged changes:',
            staged.stderr || `exit ${staged.status}`
        );
        process.exit(staged.status || 1);
    }
    return String(staged.stdout || '');
};

const confirmStagedFiles = (cfg: Config) => {
    if (!cfg.requireExplicitFileConfirmation) return true;
    const ok = promptYesNo('Proceed to commit these files? (y/N)');
    return Boolean(ok);
};

const performCommit = (commitArgs: string[]) => {
    const commit = spawnSync('git', commitArgs, {
        encoding: 'utf8',
        stdio: 'pipe',
    });
    if (commit.status === 0) {
        if (commit.stdout) process.stdout.write(commit.stdout);
        return 0;
    }
    if (commit.stdout) process.stdout.write(commit.stdout);
    if (commit.stderr) process.stderr.write(commit.stderr);
    console.error('git commit failed with exit code', commit.status);
    return commit.status || 1;
};

const validateCommitMessage = (cfg: Config, message: string) => {
    if (!cfg.validateConventionalCommits) return;
    if (isConventionalCommit(message)) return;

    console.error(
        'Commit message does not follow Conventional Commits format.'
    );
    if (cfg.bypassValidationWithExplicitApproval) {
        const bypass = promptForString('Type BYPASS to override and continue:');
        if (bypass === 'BYPASS') return;
        console.error('Bypass not provided. Aborting commit.');
    }
    process.exit(1);
};

const runGitCommit = (argsFrom: string[]) => {
    const cfg = loadConfig();
    const { noVerify, dryRun, filtered } = parseFlags(argsFrom);
    const message = filtered.join(' ') || 'chore: commit from opencode tool';

    validateCommitMessage(cfg, message);

    stageAll();

    const stagedOutput = getStagedFiles();
    if (!stagedOutput || String(stagedOutput).trim() === '') {
        console.log('No changes to commit.');
        process.exit(0);
    }

    console.log('Staged files:');
    console.log(String(stagedOutput).trim());

    if (!confirmStagedFiles(cfg)) {
        console.log('Commit cancelled by user.');
        process.exit(0);
    }

    if (dryRun) {
        console.log('Dry run: commit not performed.');
        process.exit(0);
    }

    const commitArgs = [
        'commit',
        ...(noVerify ? ['--no-verify'] : []),
        '-m',
        message,
    ];
    const status = performCommit(commitArgs);
    process.exit(status === 0 ? 0 : 1);
};

const args = process.argv.slice(2);
ensureGitRepo();
if (args.length > 0 && args[0] === 'status') {
    runStatus();
} else if (args.length > 0 && args[0] === 'commit') {
    runGitCommit(args.slice(1));
} else {
    runGitCommit(args);
}
