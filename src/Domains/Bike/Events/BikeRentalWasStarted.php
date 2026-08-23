<?php

declare(strict_types=1);

namespace Domains\Bike\Events;

use Domains\Bike\DataObjects\Bike;
use Domains\Bike\DataObjects\Rental;
use Spatie\EventSourcing\StoredEvents\ShouldBeStored;

final class BikeRentalWasStarted extends ShouldBeStored
{
    public function __construct(
        public readonly Rental $rental
    ) {}
}