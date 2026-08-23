<?php

declare(strict_types=1);

namespace Domains\Bike\Controllers;

use App\Http\Controllers\Controller;
use Domains\Bike\Jobs\RentBike;
use Domains\Bike\Jobs\ReturnBike;
use Domains\Bike\Models\Rental;
use Domains\Bike\Requests\RentBikeRequest;
use Domains\Bike\Services\BikeService;
use Domains\Bike\Services\RentalService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;

class RentalController extends Controller
{
    public function __construct(
        protected RentalService $service,
        protected BikeService $bikeService
    ) {}

    public function index(): Response
    {
        return inertia('rentals/index', [
            'rentals' => $this->service->paginateWithRelations(),
        ]);
    }

    public function create(): Response
    {
        return inertia('rentals/create', [
            'bikes' => $this->bikeService->getAvailableBikes(),
        ]);
    }

    public function store(RentBikeRequest $request): RedirectResponse
    {
        RentBike::dispatchSync(
            bikeUuid: $request->input('bike_uuid'),
            userId: Auth::id(),
            durationInHours: $request->input('duration_in_hours')
        );

        return redirect()->route('rentals.index');
    }

    public function returnRental(Rental $rental): void
    {
        ReturnBike::dispatchSync(
            rentalId: $rental->id
        );
    }
}