<?php

declare(strict_types=1);

namespace Domains\Bike\Models;

use App\Models\User;
use Domains\Bike\Enums\RentalStatus;
use Domains\Bike\Models\Bike;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Rental extends Model
{
    protected $fillable = [
        'bike_id',
        'user_id',
        'rented_at',
        'expected_return_at',
        'returned_at',
        'status',
    ];

    protected $casts = [
        'rented_at' => 'datetime',
        'expected_return_at' => 'datetime',
        'returned_at' => 'datetime',
        'status' => RentalStatus::class,
    ];

    public function bike(): BelongsTo
    {
        return $this->belongsTo(Bike::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}