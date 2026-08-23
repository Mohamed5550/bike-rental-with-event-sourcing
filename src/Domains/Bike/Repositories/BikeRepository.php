<?php

declare(strict_types=1);

namespace Domains\Bike\Repositories;

use App\Repositories\BaseRepository;
use Domains\Bike\Enums\BikeStatus;
use Domains\Bike\Models\Bike;
use Illuminate\Database\Eloquent\Collection;

class BikeRepository extends BaseRepository
{
    public function __construct(
        Bike $model
    ) {
        parent::__construct($model);
    }

    public function getAvailableBikes(): Collection
    {
        return $this->model->where('status', BikeStatus::AVAILABLE)->get();
    }
}