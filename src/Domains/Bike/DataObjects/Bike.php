<?php

declare(strict_types=1);

namespace Domains\Bike\DataObjects;

final class Bike
{
    public function __construct(
        public readonly string $code,
        public readonly string $brand,
        public readonly string $model,
        public readonly string $type,
        public readonly int $frame_size,
        public readonly int $hourly_rate,
        public readonly string $purchase_date,
        public readonly string $status
    ) {
    }

    public function toArray(): array
    {
        return [
            'code' => $this->code,
            'brand' => $this->brand,
            'model' => $this->model,
            'type' => $this->type,
            'frame_size' => $this->frame_size,
            'hourly_rate' => $this->hourly_rate,
            'purchase_date' => $this->purchase_date,
            'status' => $this->status,
        ];
    }

    
}