# Ralph - Autonomous Development Scripts

Scripts that use Claude Code to implement features autonomously, one at a time. Based on the [Ralph Wiggum Technique](https://ghuntley.com/ralph/).

## Two Modes

### PRD Mode (`plans/prd.json`)

Work through a predefined product requirements document. Claude picks the highest-priority feature, implements it, runs tests, commits, and marks it done.

### Backlog Mode (GitHub Issues)

Work through open GitHub issues. Claude fetches issues, breaks them into tasks, picks the most important one, implements it, and closes or comments on the issue.

## Scripts

### `plans/ralph-once.sh`

**Interactive, single feature.** Runs Claude once in your terminal. You watch it work and can intervene.

```bash
./plans/ralph-once.sh
```

### `plans/ralph.sh <iterations>`

**Autonomous loop.** Runs Claude N times unattended. Stops early if the PRD is complete.

```bash
./plans/ralph.sh 10     # Run up to 10 iterations
```

### `plans/backlog/once.sh`

**Interactive, single issue.** Fetches open GitHub issues, runs Claude once to pick and implement one task.

```bash
./plans/backlog/once.sh
```

### `plans/backlog/afk.sh <iterations>`

**Autonomous loop for issues.** Same as `once.sh` but loops N times. Stops early when all issues are resolved.

```bash
./plans/backlog/afk.sh 5
```

## When to Use Which

**PRD mode** — you have a plan and want to execute it.

- **`ralph-once.sh`** — You're at your desk and want to watch Claude build the next feature. You can step in if it goes sideways. Use this when you're actively developing and want to stay in the loop.
- **`ralph.sh 10`** — You're going to lunch, going to bed, or context-switching to something else. Let Claude chew through the PRD while you're away. Check `progress.txt` and the git log when you get back.

**Backlog mode** — you don't have a plan, you have GitHub issues.

- **`backlog/once.sh`** — A few bugs and feature requests have piled up in issues. You want Claude to grab one and fix it while you watch. Good for triaging — you see how Claude interprets and prioritises the issues.
- **`backlog/afk.sh 5`** — Same as above but unattended. You've got a backlog of issues and want Claude to grind through them overnight. It fetches fresh issues each iteration so if someone files a critical bug mid-loop, Claude will see it.

**In short**: PRD for greenfield feature work with a defined scope. Backlog for ongoing maintenance and bug fixes driven by issues. `once` when you're present, `afk`/`ralph.sh` when you're not.

## How It Works

1. Claude reads the PRD (or fetches GitHub issues) and `progress.txt`
2. Claude decides what to work on next based on priority and dependencies
3. Claude explores the codebase, implements the feature, writes tests
4. Claude runs `php artisan test --compact` and `vendor/bin/pint --dirty`
5. Claude updates `prd.json` (marks feature as done) and appends to `progress.txt`
6. Claude commits with a `RALPH:` prefix
7. If all features/issues are done, outputs `<promise>COMPLETE</promise>` and the loop exits

## Files

| File | Purpose |
|------|---------|
| `prd.json` | Product requirements with `"passes": true/false` per feature |
| `progress.txt` | Running log of what each iteration accomplished |
| `backlog/prompt.md` | Task breakdown and prioritization strategy for issue-driven work |

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `CLAUDE_CMD` | `~/.claude/local/claude` | Path to Claude binary |

## Tips

- Review `progress.txt` between runs to see what Claude did and catch any issues early
- The PRD scripts use `--permission-mode acceptEdits` so Claude can create and modify files freely
- The loop scripts use `-p` (print mode) for non-interactive execution
- All commits are prefixed with `RALPH:` so you can easily filter them: `git log --grep="RALPH"`
