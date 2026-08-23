<?php

declare(strict_types=1);

namespace Domains\Bike\Controllers;

use App\Http\Controllers\Controller;
use Domains\Bike\DataObjects\Bike;
use Domains\Bike\Jobs\RegisterBike;
use Domains\Bike\Requests\StoreBikeRequest;
use Domains\Bike\Services\BikeService;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class BikeController extends Controller
{
    public function __construct(
        protected BikeService $service
    ) {}

    public function index(): Response
    {
        return inertia('bikes/index', [
            'bikes' => $this->service->paginate(),
        ]);
    }

    public function create(): Response
    {
        return inertia('bikes/create');
    }

    public function store(StoreBikeRequest $request): RedirectResponse
    {
        RegisterBike::dispatchSync(
            Bike::fromArray($request->validated())
        );

        return redirect()->route('bikes.index');
    }
}