<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class PrdStatusData extends Data
{
    /**
     * @param  array<int, TestCaseData>  $testCases
     */
    public function __construct(
        public array $testCases,
        public PrdSummaryData $summary,
    ) {}
}
