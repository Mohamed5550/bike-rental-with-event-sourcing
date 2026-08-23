<?php

declare(strict_types=1);

namespace Domains\Bike\Actions;

use Domains\Bike\DataObjects\Bike as BikeObject;
use Domains\Bike\Models\Bike;

final class RegisterBikeAction
{
    public function handle(string $bikeUuid, BikeObject $bike): Bike
    {
        return Bike::create(
            attributes: array_merge($bike->toArray(), ['uuid' => $bikeUuid])
        );
    }
}