<?php

declare(strict_types=1);

namespace Domains\Bike\Exceptions;

use DomainException;

class DomainValidationException extends DomainException
{
    public function __construct(
        public readonly string $field,
        string $message,
    ) {
        parent::__construct($message);
    }
}