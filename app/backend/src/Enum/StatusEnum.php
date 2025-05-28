<?php

declare(strict_types=1);

namespace App\Enum;

enum StatusEnum: string
{
    case TODO = 'todo';
    case DOING = 'doing';
    case DONE = 'done';
}