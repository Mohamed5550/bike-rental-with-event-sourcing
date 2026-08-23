<?php

declare(strict_types=1);

namespace Domains\Bike\Projectors;

use Domains\Bike\Actions\CreateRentalAction;
use Domains\Bike\Actions\EndRentalAction;
use Domains\Bike\Actions\RegisterBikeAction;
use Domains\Bike\Events\BikeRentalWasEnded;
use Domains\Bike\Events\BikeRentalWasStarted;
use Domains\Bike\Events\BikeWasRegistered;
use Spatie\EventSourcing\EventHandlers\Projectors\Projector;

final class BikeProjector extends Projector
{
    public function __construct(
        private readonly RegisterBikeAction $registerBikeAction,
        private readonly CreateRentalAction $createRentalAction,
        private readonly EndRentalAction $endRentalAction
    ) {}

    public function onBikeWasRegistered(BikeWasRegistered $event): void
    {
        $this->registerBikeAction->handle(
            bikeUuid: $event->bikeUuid,
            bike: $event->bike,
        );
    }

    public function onBikeRentalWasStarted(BikeRentalWasStarted $event): void
    {
        $this->createRentalAction->handle(
            rental: $event->rental
        );
    }

    public function onBikeRentalWasEnded(BikeRentalWasEnded $event): void
    {
        $this->endRentalAction->handle(
            rentalId: $event->rentalId
        );
    }
}