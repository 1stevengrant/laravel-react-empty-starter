<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class ProgressSummaryData extends Data
{
    public function __construct(
        public int $total,
        public int $implemented,
        public int $fixed,
        public int $verified,
    ) {}
}
