import { Head } from '@inertiajs/react';
import { cn } from '@/lib/utils';

interface TestCase {
    category: string;
    description: string;
    steps: string[];
    passes: boolean;
}

interface Props {
    testCases: TestCase[];
    summary: {
        total: number;
        passing: number;
        failing: number;
    };
}

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
    functional: {
        bg: 'bg-blue-50 dark:bg-blue-950',
        text: 'text-blue-700 dark:text-blue-300',
        border: 'border-blue-200 dark:border-blue-800',
    },
    ui: {
        bg: 'bg-purple-50 dark:bg-purple-950',
        text: 'text-purple-700 dark:text-purple-300',
        border: 'border-purple-200 dark:border-purple-800',
    },
    'error-handling': {
        bg: 'bg-orange-50 dark:bg-orange-950',
        text: 'text-orange-700 dark:text-orange-300',
        border: 'border-orange-200 dark:border-orange-800',
    },
};

function StatusBadge({ passes }: { passes: boolean }) {
    return (
        <span
            className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium',
                passes
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            )}
        >
            {passes ? (
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            ) : (
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            )}
            {passes ? 'Passing' : 'Failing'}
        </span>
    );
}

function CategoryBadge({ category }: { category: string }) {
    const colors = categoryColors[category] || categoryColors.functional;
    return (
        <span
            className={cn(
                'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium capitalize',
                colors.bg,
                colors.text,
                colors.border
            )}
        >
            {category.replace('-', ' ')}
        </span>
    );
}

function TestCaseCard({ testCase, index }: { testCase: TestCase; index: number }) {
    return (
        <div
            className={cn(
                'overflow-hidden rounded-xl border bg-white shadow-sm transition-shadow hover:shadow-md dark:bg-zinc-900',
                testCase.passes ? 'border-green-200 dark:border-green-800' : 'border-zinc-200 dark:border-zinc-800'
            )}
        >
            <div className="border-b border-zinc-100 bg-zinc-50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-800/50">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <span className="flex size-8 items-center justify-center rounded-full bg-zinc-200 text-sm font-semibold text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">
                            {index + 1}
                        </span>
                        <CategoryBadge category={testCase.category} />
                    </div>
                    <StatusBadge passes={testCase.passes} />
                </div>
            </div>

            <div className="p-6">
                <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {testCase.description}
                </h3>

                <div className="space-y-2">
                    <h4 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Test Steps</h4>
                    <ol className="space-y-2">
                        {testCase.steps.map((step, stepIndex) => (
                            <li key={stepIndex} className="flex items-start gap-3">
                                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                                    {stepIndex + 1}
                                </span>
                                <span className="text-sm text-zinc-700 dark:text-zinc-300">{step}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
}

function SummaryCard({ summary }: { summary: Props['summary'] }) {
    const passRate = summary.total > 0 ? Math.round((summary.passing / summary.total) * 100) : 0;

    return (
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="border-b border-zinc-100 bg-zinc-50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-800/50">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Test Summary</h2>
            </div>

            <div className="p-6">
                <div className="mb-6 grid grid-cols-3 gap-4">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{summary.total}</div>
                        <div className="text-sm text-zinc-500 dark:text-zinc-400">Total Tests</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 dark:text-green-400">{summary.passing}</div>
                        <div className="text-sm text-zinc-500 dark:text-zinc-400">Passing</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-red-600 dark:text-red-400">{summary.failing}</div>
                        <div className="text-sm text-zinc-500 dark:text-zinc-400">Failing</div>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-zinc-600 dark:text-zinc-400">Pass Rate</span>
                        <span className="font-medium text-zinc-900 dark:text-zinc-100">{passRate}%</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                        <div
                            className={cn(
                                'h-full rounded-full transition-all duration-500',
                                passRate >= 80
                                    ? 'bg-green-500'
                                    : passRate >= 50
                                      ? 'bg-yellow-500'
                                      : 'bg-red-500'
                            )}
                            style={{ width: `${passRate}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function PrdStatus({ testCases, summary }: Props) {
    return (
        <>
            <Head title="PRD Status" />

            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
                <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                            PRD Test Status
                        </h1>
                        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                            Track the implementation progress of product requirements
                        </p>
                    </header>

                    <div className="mb-8">
                        <SummaryCard summary={summary} />
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Test Cases</h2>
                        <div className="grid gap-6">
                            {testCases.map((testCase, index) => (
                                <TestCaseCard key={index} testCase={testCase} index={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
