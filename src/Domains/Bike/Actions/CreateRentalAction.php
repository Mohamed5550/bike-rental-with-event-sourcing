<?php

declare(strict_types=1);

namespace Domains\Bike\Actions;

use Domains\Bike\DataObjects\Rental as RentalObject;
use Domains\Bike\Enums\BikeStatus;
use Domains\Bike\Models\Bike;
use Domains\Bike\Models\Rental;
use Illuminate\Support\Facades\DB;

final class CreateRentalAction
{
    public function handle(RentalObject $rental): Rental
    {
        return DB::transaction(function () use ($rental): Rental {
            $bike = Bike::query()
                ->where('uuid', $rental->bikeUuid)
                ->firstOrFail();

            $bike->update([
                'status' => BikeStatus::RENTED,
            ]);

            return Rental::create([
                'bike_id' => $bike->id,
                'user_id' => $rental->userId,
                'rented_at' => $rental->rentedAt,
                'expected_return_at' => $rental->expectedReturnAt,
                'status' => 'active',
            ]);
        });
    }
}