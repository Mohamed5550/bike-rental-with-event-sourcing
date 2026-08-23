<?php

declare(strict_types=1);

namespace Domains\Bike\Repositories;

use App\Repositories\BaseRepository;
use Domains\Bike\Models\Rental;
use Illuminate\Pagination\LengthAwarePaginator;

class RentalRepository extends BaseRepository
{
    public function __construct(
        Rental $model
    ) {
        parent::__construct($model);
    }

    public function paginateWithRelations(
        array $filters = [],
        int $perPage = 15
    ): LengthAwarePaginator {
        return $this->model
            ->with(['bike', 'user'])
            ->paginate($perPage);
    }
}