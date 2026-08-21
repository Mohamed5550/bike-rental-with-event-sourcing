<?php

declare(strict_types=1);

namespace Domains\Bike\Services;

use App\Services\BaseService;
use Domains\Bike\Repositories\BikeRepository;

class BikeService extends BaseService
{
    public function __construct(
        BikeRepository $repository
    ) {
        parent::__construct($repository);
    }
}