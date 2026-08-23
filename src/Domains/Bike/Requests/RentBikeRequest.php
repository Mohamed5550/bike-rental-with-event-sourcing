<?php

declare(strict_types=1);

namespace Domains\Bike\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RentBikeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'bike_uuid' => ['required', 'uuid', 'exists:bikes,uuid'],
            'duration_in_hours' => ['required', 'integer', 'min:1', 'max:24'],
        ];
    }
}