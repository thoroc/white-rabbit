#!/usr/bin/env bun

import { spawnSync } from 'child_process';

function ensureGitRepo() {
  const rev = spawnSync('git', ['rev-parse', '--is-inside-work-tree'], { encoding: 'utf8' });
  if (rev.status !== 0 || String(rev.stdout || '').trim() !== 'true') {
    console.error('Not a git repository or git is not available in PATH.');
    process.exit(1);
  }
}

function runStatus() {
  const git = spawnSync('git', ['status', '--porcelain'], { encoding: 'utf8' });
  if (git.status === 0) {
    if (git.stdout && String(git.stdout).trim() !== '') {
      process.stdout.write(git.stdout);
    }
    process.exit(0);
  }

  console.error('Unable to get git status:', git.stderr || `exit ${git.status}`);
  process.exit(git.status || 1);
}

function runGitCommit(argsFrom: string[]) {
  // Parse simple flags (support --no-verify or -n)
  let noVerify = false;
  const filtered: string[] = [];
  for (const a of argsFrom) {
    if (a === '--no-verify' || a === '-n') {
      noVerify = true;
      continue;
    }
    filtered.push(a);
  }

  const message = filtered.join(' ') || 'chore: commit from opencode tool';

  // Stage all changes
  const add = spawnSync('git', ['add', '--all'], { encoding: 'utf8', stdio: 'pipe' });
  if (add.status !== 0) {
    if (add.stdout) process.stdout.write(add.stdout);
    if (add.stderr) process.stderr.write(add.stderr);
    console.error('git add failed with exit code', add.status);
    process.exit(add.status || 1);
  }

  // Check for staged changes
  const staged = spawnSync('git', ['diff', '--cached', '--name-only'], { encoding: 'utf8' });
  if (staged.status !== 0) {
    console.error('Failed to determine staged changes:', staged.stderr || `exit ${staged.status}`);
    process.exit(staged.status || 1);
  }

  if (!staged.stdout || String(staged.stdout).trim() === '') {
    console.log('No changes to commit.');
    process.exit(0);
  }

  // Print staged files
  console.log('Staged files:');
  console.log(String(staged.stdout).trim());

  // Prepare commit arguments
  const commitArgs = ['commit', ...(noVerify ? ['--no-verify'] : []), '-m', message];

  // Run commit capturing output so we can surface git hook messages clearly
  const commit = spawnSync('git', commitArgs, { encoding: 'utf8', stdio: 'pipe' });
  if (commit.status === 0) {
    if (commit.stdout) process.stdout.write(commit.stdout);
    process.exit(0);
  }

  // On failure, show stdout/stderr for diagnostics
  if (commit.stdout) process.stdout.write(commit.stdout);
  if (commit.stderr) process.stderr.write(commit.stderr);
  console.error('git commit failed with exit code', commit.status);
  process.exit(commit.status || 1);
}

const args = process.argv.slice(2);
ensureGitRepo();
if (args.length > 0 && args[0] === 'status') {
  runStatus();
} else if (args.length > 0 && args[0] === 'commit') {
  runGitCommit(args.slice(1));
} else {
  // Backward-compatible default: treat args as commit message
  runGitCommit(args);
}
