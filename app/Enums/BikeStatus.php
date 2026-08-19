<?php

namespace App\Enums;

enum BikeStatus: string
{
    case AVAILABLE = 'available';
    case RENTED = 'rented';
    case MAINTENANCE = 'maintenance';

    public function getLabel(): string
    {
        return match ($this) {
            self::AVAILABLE => 'Available',
            self::RENTED => 'Rented',
            self::MAINTENANCE => 'Maintenance',
        };
    }
}