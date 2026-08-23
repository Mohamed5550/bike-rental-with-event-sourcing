<?php

declare(strict_types=1);

namespace Domains\Bike\Services;

use App\Services\BaseService;
use Domains\Bike\Repositories\RentalRepository;
use Illuminate\Pagination\LengthAwarePaginator;

class RentalService extends BaseService
{
    public function __construct(
        RentalRepository $repository
    ) {
        parent::__construct($repository);
    }

    public function paginateWithRelations(
        array $filters = [],
        int $perPage = 15
    ): LengthAwarePaginator {
        return $this->repository->paginateWithRelations(
            $filters,
            $perPage
        );
    }
}