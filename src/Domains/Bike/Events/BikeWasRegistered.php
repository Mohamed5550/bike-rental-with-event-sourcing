<?php

declare(strict_types=1);

namespace Domains\Bike\Events;

use Domains\Bike\DataObjects\Bike;
use Spatie\EventSourcing\StoredEvents\ShouldBeStored;

final class BikeWasRegistered extends ShouldBeStored
{
    public function __construct(
        public readonly string $bikeUuid,
        public readonly Bike $bike,
    ) {}
}