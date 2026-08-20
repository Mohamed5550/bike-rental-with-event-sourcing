<?php

namespace App\Models;

use Spatie\EventSourcing\StoredEvents\Models\EloquentStoredEvent;

class BikeStoredEvent extends EloquentStoredEvent
{
    public $table = 'bike_stored_events';
}
