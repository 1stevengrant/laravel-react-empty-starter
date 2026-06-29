<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class ProgressEntryData extends Data
{
    /**
     * @param  array<int, string>  $prdItems
     * @param  array<int, string>  $changes
     */
    public function __construct(
        public string $type,
        public array $prdItems,
        public string $title,
        public array $changes,
        public ?string $nextSteps,
    ) {}
}
