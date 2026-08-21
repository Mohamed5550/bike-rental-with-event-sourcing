<?php

declare(strict_types=1);

namespace Domains\Bike\Repositories;

use App\Repositories\BaseRepository;
use Domains\Bike\Models\Bike;

class BikeRepository extends BaseRepository
{
    public function __construct(
        Bike $model
    ) {
        parent::__construct($model);
    }
}