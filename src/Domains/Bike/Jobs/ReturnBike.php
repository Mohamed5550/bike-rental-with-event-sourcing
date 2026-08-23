<?php

declare(strict_types=1);

namespace Domains\Bike\Jobs;

use Domains\Bike\Models\Rental;
use Domains\Bike\Aggregates\BikeAggregateRoot;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

final class ReturnBike implements ShouldQueue
{
    use Queueable;
    use Dispatchable;
    use SerializesModels;
    use InteractsWithQueue;

    public function __construct(
        public readonly int $rentalId,
    ) {}

    public function handle(): void
    {
        $rental = Rental::query()
            ->with('bike')
            ->findOrFail($this->rentalId);

        BikeAggregateRoot::retrieve(
            uuid: $rental->bike->uuid,
        )
            ->returnBike(
                $this->rentalId
            )
            ->persist();
    }
}