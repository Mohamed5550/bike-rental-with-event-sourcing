<?php
declare(strict_types=1);

namespace Domains\Bike\Aggregates;

use Domains\Bike\DataObjects\Bike;
use Domains\Bike\Events\BikeWasRegistered;
use Domains\Bike\Repositories\BikeStoredEventRepository;
use Spatie\EventSourcing\AggregateRoots\AggregateRoot;
use Spatie\EventSourcing\StoredEvents\Repositories\StoredEventRepository;

final class BikeAggregateRoot extends AggregateRoot
{
    protected function getStoredEventRepository(): StoredEventRepository
    {
        return app()->make(
            abstract: BikeStoredEventRepository::class
        );
    }

    public function registerBike(Bike $bike): self
    {
        $this->recordThat(
            domainEvent: new BikeWasRegistered(
                bike: $bike
            )
        );

        return $this;
    }
}