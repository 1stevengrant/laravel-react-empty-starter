set -e

issues=$(gh issue list --state open --json number,title,body,comments --limit 20)
ralph_commits=$(git log --all --grep="RALPH" --max-count=10 --format="%h %ad %s" --date=short 2>/dev/null || echo "No RALPH commits found")

claude --model opus --permission-mode acceptEdits \
  "@plans/backlog/prompt.md" \
  "ISSUES: $issues" \
  "RECENT RALPH COMMITS: $ralph_commits"
