<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class ProgressReportData extends Data
{
    /**
     * @param  array<int, ProgressEntryData>  $entries
     */
    public function __construct(
        public string $date,
        public array $entries,
        public ProgressSummaryData $summary,
    ) {}
}
