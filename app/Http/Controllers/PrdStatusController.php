<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\File;

class PrdStatusController extends Controller
{
    public function __invoke(): Response
    {
        $prdPath = base_path('plans/example-prd.json');

        $testCases = File::exists($prdPath)
            ? json_decode(File::get($prdPath), true)
            : [];

        $passing = collect($testCases)->where('passes', true)->count();
        $failing = collect($testCases)->where('passes', false)->count();

        return Inertia::render('prd-status', [
            'testCases' => $testCases,
            'summary' => [
                'total' => count($testCases),
                'passing' => $passing,
                'failing' => $failing,
            ],
        ]);
    }
}
