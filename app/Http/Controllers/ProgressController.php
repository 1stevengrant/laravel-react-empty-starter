<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Data\ProgressReportData;
use App\Actions\ParseProgressReport;

class ProgressController extends Controller
{
    public function __invoke(ParseProgressReport $parseProgressReport): Response
    {
        $report = $parseProgressReport->handle(base_path('plans/progress.txt'));

        return Inertia::render('progress', ProgressReportData::from($report));
    }
}
