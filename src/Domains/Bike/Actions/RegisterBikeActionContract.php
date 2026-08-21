<?php

declare(strict_types=1);

namespace Domains\Bike\Actions;

use Domains\Bike\DataObjects\Bike as BikeObject;
use Domains\Bike\Models\Bike;

interface RegisterBikeActionContract
{
    public function handle(BikeObject $bike): Bike;
}