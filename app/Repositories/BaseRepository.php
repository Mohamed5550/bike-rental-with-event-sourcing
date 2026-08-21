<?php

declare(strict_types=1);

namespace App\Repositories;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

abstract class BaseRepository
{    
    public function __construct(
        protected Model $model
    ) {}

    public function get(): Collection
    {
        return $this->model::get();
    }

    public function find(int $id): ?Model
    {
        return $this->model::find($id);
    }

    public function findOrFail(int $id): Model
    {
        return $this->model::findOrFail($id);
    }

    public function create(array $data): Model
    {
        return $this->model::create($data);
    }

    public function where(string $column, string $value): Builder
    {
        return $this->model::query()->where($column, $value);
    }

    public function paginate(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $query = $this->model::query();

        // Apply filters if any (this method can be overridden in child classes)
        foreach ($filters as $column => $value) {
            $query->where($column, $value);
        }

        return $query->paginate($perPage);
    }

    public function update(Model $model, array $data): Model
    {
        $model->update($data);

        return $model;
    }

    public function updateById(int $id, array $data): Model
    {
        $model = $this->find($id);
        if ($model) {
            $model->update($data);
        }

        return $model;
    }

    public function delete(Model $model): bool
    {
        return $model->delete();
    }

    public function deleteById(int $id): bool
    {
        $model = $this->find($id);
        if ($model) {
            return $model->delete();
        }

        return false;
    }
}
