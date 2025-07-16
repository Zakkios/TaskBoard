<?php

declare(strict_types=1);

namespace App\Enum;

enum SameSiteEnum: string
{
    case LAX = 'lax';
    case STRICT = 'strict';
    case NONE = 'none';

    public static function fromString(?string $value): ?self
    {
        return match (strtolower((string) $value)) {
            'lax' => self::LAX,
            'strict' => self::STRICT,
            'none' => self::NONE,
            default => null,
        };
    }
}
