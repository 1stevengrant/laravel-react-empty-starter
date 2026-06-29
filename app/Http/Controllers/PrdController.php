<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Data\TestCaseData;
use App\Data\PrdStatusData;
use App\Data\PrdSummaryData;
use Illuminate\Support\Facades\File;

class PrdController extends Controller
{
    public function __invoke(): Response
    {
        $prdPath = base_path('plans/prd.json');

        $decoded = File::exists($prdPath)
            ? json_decode(File::get($prdPath), true)
            : [];

        $testCases = collect(is_array($decoded) ? $decoded : [])
            ->filter(fn ($case): bool => is_array($case))
            ->map(fn (array $case): TestCaseData => TestCaseData::from($case))
            ->values();

        return Inertia::render('prd-status', new PrdStatusData(
            testCases: $testCases->all(),
            summary: new PrdSummaryData(
                total: $testCases->count(),
                passing: $testCases->where('passes', true)->count(),
                failing: $testCases->where('passes', false)->count(),
            ),
        ));
    }
}
