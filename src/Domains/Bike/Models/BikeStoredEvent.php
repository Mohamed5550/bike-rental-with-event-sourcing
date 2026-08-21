<?php

namespace Domains\Bike\Models;

use Spatie\EventSourcing\StoredEvents\Models\EloquentStoredEvent;

class BikeStoredEvent extends EloquentStoredEvent
{
    public $table = 'bike_stored_events';
}
