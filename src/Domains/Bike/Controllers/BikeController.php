<?php

declare(strict_types=1);

namespace Domains\Bike\Controllers;

use App\Http\Controllers\Controller;
use Domains\Bike\Services\BikeService;
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
}