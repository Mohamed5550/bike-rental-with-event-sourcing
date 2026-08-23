<?php

declare(strict_types=1);

namespace Domains\Bike\Projectors;

use Domains\Bike\Actions\RegisterBikeAction;
use Domains\Bike\Events\BikeRentalWasStarted;
use Domains\Bike\Events\BikeWasRegistered;
use Spatie\EventSourcing\EventHandlers\Projectors\Projector;
use Domains\Bike\Actions\CreateRentalAction;

final class BikeProjector extends Projector
{
    public function __construct(
        private readonly RegisterBikeAction $registerBikeAction,
        private readonly CreateRentalAction $createRentalAction,
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
}