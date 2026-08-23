<?php

declare(strict_types=1);

namespace Domains\Bike\DataObjects;

final class Rental
{
    public function __construct(
        public readonly string $bikeUuid,
        public readonly int $userId,
        public readonly string $rentedAt,
        public readonly string $expectedReturnAt,
    ) {}

    public function toArray(): array
    {
        return [
            'bike_uuid' => $this->bikeUuid,
            'user_id' => $this->userId,
            'rented_at' => $this->rentedAt,
            'expected_return_at' => $this->expectedReturnAt,
        ];
    }

    public static function fromArray(array $data): self
    {
        return new self(
            bikeUuid: $data['bike_uuid'],
            userId: $data['user_id'],
            rentedAt: $data['rented_at'],
            expectedReturnAt: $data['expected_return_at'],
        );
    }
}