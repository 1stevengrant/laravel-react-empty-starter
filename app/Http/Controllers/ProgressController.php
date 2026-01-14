<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;

class ProgressController extends Controller
{
    public function __invoke(): Response
    {
        $progressPath = base_path('plans/progress.txt');

        $content = File::exists($progressPath)
            ? File::get($progressPath)
            : '';

        $parsed = $this->parseProgress($content);

        return Inertia::render('progress', [
            'date' => $parsed['date'],
            'entries' => $parsed['entries'],
            'summary' => $parsed['summary'],
        ]);
    }

    /**
     * @return array{date: string, entries: array<int, array{type: string, prdItems: array<string>, title: string, changes: array<string>, nextSteps: string|null}>, summary: array{total: int, implemented: int, fixed: int, verified: int}}
     */
    private function parseProgress(string $content): array
    {
        $date = '';
        $entries = [];

        if (preg_match('/^## (\d{4}-\d{2}-\d{2})/m', $content, $dateMatch)) {
            $date = $dateMatch[1];
        }

        $blocks = preg_split('/\n---\n/', $content);

        foreach ($blocks as $block) {
            $block = mb_trim($block);
            if (empty($block)) {
                continue;
            }

            $lines = explode("\n", $block);
            $titleLine = null;
            $changes = [];
            $nextSteps = null;

            foreach ($lines as $line) {
                $line = mb_trim($line);

                if (empty($line) || Str::startsWith($line, '#')) {
                    continue;
                }

                if ($titleLine === null && preg_match('/^(Implemented|Fixed|Verified)/i', $line)) {
                    $titleLine = $line;

                    continue;
                }

                if (Str::startsWith($line, 'Next:')) {
                    $nextSteps = mb_trim(Str::after($line, 'Next:'));

                    continue;
                }

                if (Str::startsWith($line, '- ')) {
                    $changes[] = mb_trim(Str::after($line, '- '));
                }
            }

            if ($titleLine === null) {
                continue;
            }

            $type = $this->extractType($titleLine);
            $prdItems = $this->extractPrdItems($titleLine);
            $title = $this->extractTitle($titleLine);

            $entries[] = [
                'type' => $type,
                'prdItems' => $prdItems,
                'title' => $title,
                'changes' => $changes,
                'nextSteps' => $nextSteps,
            ];
        }

        $implemented = collect($entries)->where('type', 'implemented')->count();
        $fixed = collect($entries)->where('type', 'fixed')->count();
        $verified = collect($entries)->where('type', 'verified')->count();

        return [
            'date' => $date,
            'entries' => $entries,
            'summary' => [
                'total' => count($entries),
                'implemented' => $implemented,
                'fixed' => $fixed,
                'verified' => $verified,
            ],
        ];
    }

    private function extractType(string $line): string
    {
        if (Str::startsWith($line, 'Implemented')) {
            return 'implemented';
        }

        if (Str::startsWith($line, 'Fixed')) {
            return 'fixed';
        }

        if (Str::startsWith($line, 'Verified')) {
            return 'verified';
        }

        return 'implemented';
    }

    /**
     * @return array<string>
     */
    private function extractPrdItems(string $line): array
    {
        $items = [];

        if (preg_match_all('/PRD items? #([\d,\s&-]+)/i', $line, $matches)) {
            foreach ($matches[1] as $match) {
                $parts = preg_split('/[,&\s]+/', $match);
                foreach ($parts as $part) {
                    $part = mb_trim($part);
                    if (preg_match('/^(\d+)-(\d+)$/', $part, $rangeMatch)) {
                        for ($i = (int) $rangeMatch[1]; $i <= (int) $rangeMatch[2]; $i++) {
                            $items[] = (string) $i;
                        }
                    } elseif (is_numeric($part)) {
                        $items[] = $part;
                    }
                }
            }
        }

        return array_unique($items);
    }

    private function extractTitle(string $line): string
    {
        $title = preg_replace('/^(Implemented|Fixed|Verified)\s+PRD items?\s+#[\d,\s&-]+:\s*/i', '', $line);

        return mb_trim($title ?? $line);
    }
}
