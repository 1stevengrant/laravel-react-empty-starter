<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class UserData extends Data
{
    public function __construct(
        public int $id,
        public string $first_name,
        public string $last_name,
        public string $name,
        public string $email,
        public ?string $avatar,
        public ?string $email_verified_at,
        public string $created_at,
        public string $updated_at,
        public array $additional = []
    ) {}
}
