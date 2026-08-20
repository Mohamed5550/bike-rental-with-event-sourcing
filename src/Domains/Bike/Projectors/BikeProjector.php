<?php

declare(strict_types=1);

namespace Domains\Bike\Projectors;

use Domains\Bike\Actions\RegisterBikeAction;
use Domains\Bike\Events\BikeWasRegistered;
use Spatie\EventSourcing\EventHandlers\Projectors\Projector;

final class BikeProjector extends Projector
{
    public function __construct(
        private readonly RegisterBikeAction $action
    ) {}

    public function onBikeWasRegistered(
        BikeWasRegistered $event
    ): void
    {
        $this->action->handle(
            bike: $event->bike
        );
    }
}