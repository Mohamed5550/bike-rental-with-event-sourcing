<?php

namespace Domains\Bike\Models;

use Spatie\EventSourcing\StoredEvents\Models\EloquentStoredEvent;

class StoredEvent extends EloquentStoredEvent
{
    public $table = 'stored_events';
}
