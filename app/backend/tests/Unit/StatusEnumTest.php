<?php

namespace App\Tests\Unit;

use App\Enum\StatusEnum;
use PHPUnit\Framework\TestCase;

class StatusEnumTest extends TestCase
{
    public function testEnumValues(): void
    {
        $this->assertSame('todo', StatusEnum::TODO->value);
        $this->assertSame('doing', StatusEnum::DOING->value);
        $this->assertSame('done', StatusEnum::DONE->value);
    }

    public function testFromValue(): void
    {
        $this->assertSame(StatusEnum::TODO, StatusEnum::from('todo'));
        $this->assertSame(StatusEnum::DOING, StatusEnum::from('doing'));
        $this->assertSame(StatusEnum::DONE, StatusEnum::from('done'));
    }
}
