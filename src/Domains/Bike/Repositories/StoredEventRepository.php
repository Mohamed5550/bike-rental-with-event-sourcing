<?php

declare(strict_types=1);

namespace Domains\Bike\Repositories;

use Domains\Bike\Models\StoredEvent;
use Spatie\EventSourcing\StoredEvents\Repositories\EloquentStoredEventRepository;

final class StoredEventRepository extends EloquentStoredEventRepository
{
    public function __construct(
        protected string $storedEventModel = StoredEvent::class,
    ) {
        parent::__construct();
    }
}