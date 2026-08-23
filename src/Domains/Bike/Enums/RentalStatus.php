<?php

declare(strict_types=1);

namespace Domains\Bike\Enums;

enum RentalStatus: string
{
    case ACTIVE = 'active';
    case RETURNED = 'returned';
    case CANCELLED = 'cancelled';
    case COMPLETED = 'completed';

    public function getLabel(): string
    {
        return match ($this) {
            self::ACTIVE => 'Active',
            self::RETURNED => 'Returned',
            self::CANCELLED => 'Cancelled',
            self::COMPLETED => 'Completed',
        };
    }
}