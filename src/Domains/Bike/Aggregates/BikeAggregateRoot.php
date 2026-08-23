<?php
declare(strict_types=1);

namespace Domains\Bike\Aggregates;

use Domains\Bike\DataObjects\Bike;
use Domains\Bike\DataObjects\Rental;
use Domains\Bike\Events\BikeRentalWasEnded;
use Domains\Bike\Events\BikeRentalWasStarted;
use Domains\Bike\Events\BikeWasRegistered;
use Domains\Bike\Exceptions\DomainValidationException;
use Domains\Bike\Repositories\StoredEventRepository;
use Spatie\EventSourcing\AggregateRoots\AggregateRoot;
use Spatie\EventSourcing\StoredEvents\Repositories\StoredEventRepository as BaseStoredEventRepository;

final class BikeAggregateRoot extends AggregateRoot
{
    protected bool $isRented = false;

    protected function getStoredEventRepository(): BaseStoredEventRepository
    {
        return app()->make(
            abstract: StoredEventRepository::class
        );
    }

    public function registerBike(Bike $bike): self
    {
        $this->recordThat(
            domainEvent: new BikeWasRegistered(
                bikeUuid: $this->uuid(),
                bike: $bike
            )
        );

        return $this;
    }

    public function rentBike(
        int $userId,
        int $durationInHours
        ): self
    {
        if($this->isRented)
        {
            throw new DomainValidationException(
                field: "bike_uuid",
                message: "This bike is already rented"
            );
        }

        $this->recordThat(
            domainEvent: new BikeRentalWasStarted(
                rental: new Rental(
                    bikeUuid: $this->uuid(),
                    userId: $userId,
                    rentedAt: now()->toISOString(),
                    expectedReturnAt: now()
                        ->addHours($durationInHours)
                        ->toISOString(),
                )
            )
        );

        return $this;
    }

    public function applyBikeRentalWasStarted(
        BikeRentalWasStarted $event
    ): void
    {
        $this->isRented = true;
    }

    public function applyBikeRentalWasEnded(
        BikeRentalWasEnded $event
    ): void
    {
        $this->isRented = false;
    }

    public function returnBike(int $rentalId): self
    {
        if (! $this->isRented) {
            throw new DomainValidationException(
                field: 'bike_uuid',
                message: 'The bike is not currently rented.',
            );
        }

        $this->recordThat(
            new BikeRentalWasEnded($rentalId)
        );

        return $this;
    }


}