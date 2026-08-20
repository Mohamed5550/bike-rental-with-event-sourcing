<?php

declare(strict_types=1);

namespace Domains\Bike\Providers;

use Domains\Bike\Projectors\BikeProjector;
use Illuminate\Support\ServiceProvider;
use Spatie\EventSourcing\Facades\Projectionist;

final class EventSourcingServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        Projectionist::addProjector(
            projector: BikeProjector::class
        );
    }
}