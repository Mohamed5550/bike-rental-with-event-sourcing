<?php

declare(strict_types=1);

namespace Domains\Bike\Actions;

use App\Models\Bike;
use Domains\Bike\Actions\RegisterBikeActionContract;
use Domains\Bike\DataObjects\Bike as BikeObject;

final class RegisterBikeAction implements RegisterBikeActionContract
{
    public function handle(BikeObject $bike): Bike
    {
        return Bike::create(
            attributes: $bike->toArray()
        );
    }
}