set -e

if [ -z "$1" ]; then
  echo "Usage: $0 <iterations>"
  exit 1
fi

for ((i=1; i<=$1; i++)); do
  echo "Iteration $i"
  echo "--------------------------------"
  result=$(claude --model opus -p "@plans/prd.json @plans/progress.txt \
1. Find the highest-priority feature to work on and work only on that feature. \
This should be the one YOU decide has the highest priority - not necessarily the first in the list. \
Read plans/progress.txt to understand what has already been done. \
2. Explore the codebase to understand existing patterns, models, and conventions. \
3. Implement the feature following Laravel conventions. Use php artisan make:* to generate files. \
4. Write Pest tests for the feature. \
5. Check that tests pass via php artisan test --compact and that Pint passes via vendor/bin/pint --dirty. \
6. Update the PRD with the work that was done - set passes to true for completed features. \
7. Append your progress to plans/progress.txt. \
Use this to leave a note for the next iteration working in the codebase. \
Include: feature worked on, files created/modified, key decisions, blockers. \
8. Make a git commit with a RALPH: prefix. \
ONLY WORK ON A SINGLE FEATURE. \
If, while implementing the feature, you notice the PRD is complete, output <promise>COMPLETE</promise>. \
")

  echo "$result"

  if [[ "$result" == *"<promise>COMPLETE</promise>"* ]]; then
    echo "PRD complete after $i iterations."
    exit 0
  fi
done
