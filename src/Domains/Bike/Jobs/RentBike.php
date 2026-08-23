<?php

namespace Domains\Bike\Jobs;

use Domains\Bike\Aggregates\BikeAggregateRoot;
use Domains\Bike\DataObjects\Bike;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class RentBike implements ShouldQueue
{
    use Queueable;
    use Dispatchable;
    use SerializesModels;
    use InteractsWithQueue;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public readonly string $bikeUuid,
        public readonly int $userId,
        public readonly int $durationInHours,
    )
    {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        BikeAggregateRoot::retrieve(
            uuid: $this->bikeUuid
        )->rentBike(
            userId: $this->userId,
            durationInHours: $this->durationInHours
        )->persist();
    }
}
