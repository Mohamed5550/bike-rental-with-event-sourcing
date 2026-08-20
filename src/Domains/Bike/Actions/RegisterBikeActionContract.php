<?php

declare(strict_types=1);

namespace Domains\Bike\Actions;

use App\Models\Bike;
use Domains\Bike\DataObjects\Bike as BikeObject;

interface RegisterBikeActionContract
{
    public function handle(BikeObject $bike): Bike;
}