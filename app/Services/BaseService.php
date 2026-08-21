<?php

declare(strict_types=1);

namespace App\Services;

use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

abstract class BaseService
{
    public function __construct(
        protected BaseRepository $repository
    ) {}

    public function get()
    {
        return $this->repository->get();
    }

    public function find(int $id)
    {
        return $this->repository->find($id);
    }

    public function findOrFail(int $id)
    {
        return $this->repository->findOrFail($id);
    }

    public function create(array $data)
    {
        return $this->repository->create($data);
    }

    public function where(string $column, string $value)
    {
        return $this->repository->where($column, $value);
    }

    public function paginate(array $filters = [], int $perPage = 15)
    {
        return $this->repository->paginate($filters, $perPage);
    }

    public function update(Model $model, array $data): Model
    {
        return $this->repository->update($model, $data);
    }

    public function updateById(int $id, array $data)
    {
        return $this->repository->updateById($id, $data);
    }

    public function delete(Model $model): bool
    {
        return $this->repository->delete($model);
    }

    public function deleteById(int $id): bool
    {
        return $this->repository->deleteById($id);
    }
}
