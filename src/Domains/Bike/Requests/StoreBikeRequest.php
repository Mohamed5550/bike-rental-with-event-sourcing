<?php

namespace Domains\Bike\Requests;

use Domains\Bike\Enums\BikeType;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBikeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'code' => ['required', 'string', 'max:50', 'unique:bikes,code'],
            'brand' => ['required', 'string', 'max:100'],
            'model' => ['required', 'string', 'max:100'],
            'type' => ['required', 'string', Rule::enum(BikeType::class)],
            'frame_size' => ['required', 'integer', 'min:1', 'max:100'],
            'hourly_rate' => ['required', 'integer', 'min:0'],
            'purchase_date' => ['required', 'date', 'before_or_equal:today'],
            'status' => ['required', 'string', Rule::in([
                'available',
                'rented',
                'maintenance',
            ])],
        ];
    }
}
