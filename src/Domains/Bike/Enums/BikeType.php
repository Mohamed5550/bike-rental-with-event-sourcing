<?php

declare(strict_types=1);

namespace Domains\Bike\Enums;

enum BikeType: string
{
    case HYBRID = 'hybrid';
    case ROAD = 'road';
    case MOUNTAIN = 'mountain';
    case GRAVEL = 'gravel';
    case CITY = 'city';

    public function getLabel(): string
    {
        return match ($this) {
            self::HYBRID => 'Hybrid',
            self::ROAD => 'Road',
            self::MOUNTAIN => 'Mountain',
            self::GRAVEL => 'Gravel',
            self::CITY => 'City',
        };
    }
}