<?php

declare(strict_types=1);

namespace Domains\Bike\Actions;

use Domains\Bike\Enums\BikeStatus;
use Domains\Bike\Enums\RentalStatus;
use Domains\Bike\Models\Rental;
use Illuminate\Support\Facades\DB;

final class EndRentalAction
{
    public function handle(int $rentalId): void
    {
        DB::transaction(function () use ($rentalId): void {
            $rental = Rental::query()
                ->with('bike')
                ->findOrFail($rentalId);

            $rental->update([
                'returned_at' => now(),
                'status' => RentalStatus::COMPLETED,
            ]);

            $rental->bike->update([
                'status' => BikeStatus::AVAILABLE,
            ]);
        });
    }
}