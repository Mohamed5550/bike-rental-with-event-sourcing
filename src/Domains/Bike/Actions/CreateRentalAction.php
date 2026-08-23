<?php

declare(strict_types=1);

namespace Domains\Bike\Actions;

use Domains\Bike\DataObjects\Rental as RentalObject;
use Domains\Bike\Models\Bike;
use Domains\Bike\Models\Rental;

final class CreateRentalAction
{
    public function handle(RentalObject $rental): Rental
    {
        $bike = Bike::where('uuid', $rental->bikeUuid)->firstOrFail();

        return Rental::create([
            'bike_id' => $bike->id,
            'user_id' => $rental->userId,
            'rented_at' => $rental->rentedAt,
            'expected_return_at' => $rental->expectedReturnAt,
            'status' => 'active',
        ]);
    }
}