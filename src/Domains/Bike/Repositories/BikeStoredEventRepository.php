<?php

declare(strict_types=1);

namespace Domains\Bike\Repositories;

use Domains\Bike\Models\BikeStoredEvent;
use Spatie\EventSourcing\StoredEvents\Repositories\EloquentStoredEventRepository;

final class BikeStoredEventRepository extends EloquentStoredEventRepository
{
    public function __construct(
        protected string $storedEventModel = BikeStoredEvent::class,
    ) {
        parent::__construct();
    }
}