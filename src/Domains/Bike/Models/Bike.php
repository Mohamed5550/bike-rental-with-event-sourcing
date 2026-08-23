<?php

namespace Domains\Bike\Models;

use Domains\Bike\Enums\BikeStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bike extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'brand',
        'model',
        'type',
        'frame_size',
        'hourly_rate',
        'purchase_date',
        'status'
    ];

    protected $casts = [
        'status' => BikeStatus::class
    ];
}
