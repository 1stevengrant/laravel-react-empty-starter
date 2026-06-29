<?php

use App\Actions\ParseProgressReport;

test('it returns empty defaults when the file is missing', function (): void {
    $report = (new ParseProgressReport)->handle('/path/that/does/not/exist.txt');

    expect($report['date'])->toBe('')
        ->and($report['entries'])->toBe([])
        ->and($report['summary'])->toBe([
            'total' => 0,
            'implemented' => 0,
            'fixed' => 0,
            'verified' => 0,
        ]);
});

test('it parses entries, types, prd items and next steps', function (): void {
    $content = implode("\n", [
        '## 2026-06-29',
        '',
        'Implemented PRD items #1, 2 & 4-5: Add login flow',
        '- Created controller',
        '- Wired routes',
        'Next: polish UI',
        '---',
        'Fixed PRD item #3: Resolve crash',
        '- Guarded null',
    ]);

    $path = tempnam(sys_get_temp_dir(), 'progress');
    file_put_contents($path, $content);

    try {
        $report = (new ParseProgressReport)->handle($path);
    } finally {
        @unlink($path);
    }

    expect($report['date'])->toBe('2026-06-29')
        ->and($report['summary'])->toBe([
            'total' => 2,
            'implemented' => 1,
            'fixed' => 1,
            'verified' => 0,
        ]);

    expect($report['entries'][0])->toMatchArray([
        'type' => 'implemented',
        'prdItems' => ['1', '2', '4', '5'],
        'title' => 'Add login flow',
        'changes' => ['Created controller', 'Wired routes'],
        'nextSteps' => 'polish UI',
    ]);

    expect($report['entries'][1])->toMatchArray([
        'type' => 'fixed',
        'prdItems' => ['3'],
        'title' => 'Resolve crash',
        'changes' => ['Guarded null'],
        'nextSteps' => null,
    ]);
});
