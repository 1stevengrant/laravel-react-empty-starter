set -e

if [ -z "$1" ]; then
  echo "Usage: $0 <iterations>"
  exit 1
fi

for ((i=1; i<=$1; i++)); do
  echo "Iteration $i"
  echo "--------------------------------"

  issues=$(gh issue list --state open --json number,title,body,comments --limit 20)
  ralph_commits=$(git log --all --grep="RALPH" --max-count=10 --format="%h %ad %s" --date=short 2>/dev/null || echo "No RALPH commits found")

  result=$(claude --model opus -p \
    "@plans/backlog/prompt.md" \
    "ISSUES: $issues" \
    "RECENT RALPH COMMITS: $ralph_commits")

  echo "$result"

  if [[ "$result" == *"<promise>COMPLETE</promise>"* ]]; then
    echo "All issues complete after $i iterations."
    exit 0
  fi
done
