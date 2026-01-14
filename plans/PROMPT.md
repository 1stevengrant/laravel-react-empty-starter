# Task

Implement the features defined in `./plans/prd.json`. Work through each feature systematically.

## Instructions

1. Read `./plans/prd.json` to understand all features to implement
2. Read `./plans/progress.txt` to see what was accomplished in previous iterations
3. Find the next feature where `"passes": false`
4. Implement that feature following Laravel conventions
5. Write tests for the feature
6. Run `composer test` to validate
7. If tests pass, update `./plans/prd.json` to set `"passes": true` for that feature
8. Update `./plans/progress.txt` with what you accomplished this iteration

## Constraints

- Follow Laravel conventions and best practices
- Use existing patterns found in this codebase
- Write tests for all new functionality
- Do not break existing tests
- Only mark a feature as `"passes": true` after its tests pass

## Progress Tracking

After each iteration, append to `./plans/progress.txt`:
- Which feature you worked on
- What was implemented
- Test results (pass/fail)
- Any blockers or issues encountered

## Completion

When all features in `./plans/prd.json` have `"passes": true`, the task is complete.

## If Stuck

After multiple failed attempts on a feature:
1. Document the blocker in `./plans/progress.txt`
2. Try an alternative approach
3. Simplify the implementation if needed
