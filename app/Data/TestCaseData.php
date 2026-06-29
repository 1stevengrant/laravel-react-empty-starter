<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class TestCaseData extends Data
{
    /**
     * @param  array<int, string>  $steps
     */
    public function __construct(
        public string $category,
        public string $description,
        public array $steps,
        public bool $passes,
    ) {}
}
