#!/usr/bin/env bun

import { spawnSync } from 'child_process';

function runStatus() {
  const git = spawnSync('git', ['status', '--porcelain'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  if (git.status === 0 && git.stdout) {
    process.stdout.write(git.stdout);
    return;
  }

  console.error('Unable to get git status: git returned non-zero or no output.');
  process.exit(1);
}

function runGitCommit(argsFrom: string[]) {
  const message = argsFrom.join(' ') || 'chore: commit from opencode tool';

  // Stage all changes
  const add = spawnSync('git', ['add', '--all'], { stdio: 'inherit' });
  if (add.status !== 0) process.exit(add.status || 1);

  // Commit with message
  const commit = spawnSync('git', ['commit', '-m', message], { stdio: 'inherit' });
  if (commit.status !== 0) {
    // If nothing to commit, return success
    if (commit.status === 1) {
      process.exit(0);
    }
    process.exit(commit.status || 1);
  }
}

const args = process.argv.slice(2);
if (args.length > 0 && args[0] === 'status') {
  runStatus();
} else if (args.length > 0 && args[0] === 'commit') {
  runGitCommit(args.slice(1));
} else {
  // Backward-compatible default: treat args as commit message
  runGitCommit(args);
}
