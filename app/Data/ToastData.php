<?php

namespace App\Data;

use App\Enums\ToastType;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class ToastData extends Data
{
    public function __construct(
        public ToastType $type,
        public string $message,
    ) {}

    public static function success(string $message): self
    {
        return new self(ToastType::Success, $message);
    }
}
