<?php

declare(strict_types=1);

namespace Domains\Bike\Events;

use Domains\Bike\DataObjects\Rental;
use Spatie\EventSourcing\StoredEvents\ShouldBeStored;

final class BikeRentalWasEnded extends ShouldBeStored
{
    public function __construct(
        public readonly int $rentalId
    ) {}
}