<?php

declare(strict_types=1);

namespace Domains\Bike\Services;

use App\Services\BaseService;
use Domains\Bike\Repositories\BikeRepository;
use Illuminate\Database\Eloquent\Collection;

class BikeService extends BaseService
{
    public function __construct(
        BikeRepository $repository
    ) {
        parent::__construct($repository);
    }

    public function getAvailableBikes(): Collection
    {
        return $this->repository->getAvailableBikes();
    }
}