<?php

namespace Domains\Bike\Jobs;

use Domains\Bike\Aggregates\BikeAggregateRoot;
use Domains\Bike\DataObjects\Bike;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Str;

class RegisterBike implements ShouldQueue
{
    use Queueable;
    use Dispatchable;
    use SerializesModels;
    use InteractsWithQueue;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public readonly Bike $bike
    )
    {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        BikeAggregateRoot::retrieve(
            uuid: Str::uuid()->toString()
        )->registerBike(
            bike: $this->bike
        )->persist();
    }
}
