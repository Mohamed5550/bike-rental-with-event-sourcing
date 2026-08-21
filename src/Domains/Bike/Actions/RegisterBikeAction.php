<?php

declare(strict_types=1);

namespace Domains\Bike\Actions;

use Domains\Bike\Actions\RegisterBikeActionContract;
use Domains\Bike\DataObjects\Bike as BikeObject;
use Domains\Bike\Models\Bike;

final class RegisterBikeAction implements RegisterBikeActionContract
{
    public function handle(BikeObject $bike): Bike
    {
        return Bike::create(
            attributes: $bike->toArray()
        );
    }
}