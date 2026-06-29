<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class PrdSummaryData extends Data
{
    public function __construct(
        public int $total,
        public int $passing,
        public int $failing,
    ) {}
}
