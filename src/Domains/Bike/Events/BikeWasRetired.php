<?php

declare(strict_types=1);

namespace Domains\Bike\Events;

use Domains\Bike\DataObjects\Bike;
use Spatie\EventSourcing\StoredEvents\ShouldBeStored;

final class BikeWasRetired extends ShouldBeStored
{
    public function __construct(
        public readonly Bike $bike
    ) {}
}