import { Head } from '@inertiajs/react';
import { cn } from '@/lib/utils';

interface ProgressEntry {
    type: 'implemented' | 'fixed' | 'verified';
    prdItems: string[];
    title: string;
    changes: string[];
    nextSteps: string | null;
}

interface Props {
    date: string;
    entries: ProgressEntry[];
    summary: {
        total: number;
        implemented: number;
        fixed: number;
        verified: number;
    };
}

const typeConfig: Record<string, { label: string; bg: string; text: string; border: string; icon: React.ReactNode }> = {
    implemented: {
        label: 'Implemented',
        bg: 'bg-green-50 dark:bg-green-950',
        text: 'text-green-700 dark:text-green-300',
        border: 'border-green-200 dark:border-green-800',
        icon: (
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
        ),
    },
    fixed: {
        label: 'Fixed',
        bg: 'bg-blue-50 dark:bg-blue-950',
        text: 'text-blue-700 dark:text-blue-300',
        border: 'border-blue-200 dark:border-blue-800',
        icon: (
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
    },
    verified: {
        label: 'Verified',
        bg: 'bg-purple-50 dark:bg-purple-950',
        text: 'text-purple-700 dark:text-purple-300',
        border: 'border-purple-200 dark:border-purple-800',
        icon: (
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
};

function TypeBadge({ type }: { type: string }) {
    const config = typeConfig[type] || typeConfig.implemented;
    return (
        <span
            className={cn(
                'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium',
                config.bg,
                config.text,
                config.border
            )}
        >
            {config.icon}
            {config.label}
        </span>
    );
}

function PrdItemBadge({ item }: { item: string }) {
    return (
        <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            PRD #{item}
        </span>
    );
}

function ProgressEntryCard({ entry, index }: { entry: ProgressEntry; index: number }) {
    const config = typeConfig[entry.type] || typeConfig.implemented;

    return (
        <div
            className={cn(
                'overflow-hidden rounded-xl border bg-white shadow-sm transition-shadow hover:shadow-md dark:bg-zinc-900',
                config.border
            )}
        >
            <div className="border-b border-zinc-100 bg-zinc-50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-800/50">
                <div className="flex flex-wrap items-center gap-3">
                    <span className="flex size-8 items-center justify-center rounded-full bg-zinc-200 text-sm font-semibold text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">
                        {index + 1}
                    </span>
                    <TypeBadge type={entry.type} />
                    {entry.prdItems.map((item) => (
                        <PrdItemBadge key={item} item={item} />
                    ))}
                </div>
            </div>

            <div className="p-6">
                <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">{entry.title}</h3>

                {entry.changes.length > 0 && (
                    <div className="space-y-2">
                        <h4 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Changes</h4>
                        <ul className="space-y-2">
                            {entry.changes.map((change, changeIndex) => (
                                <li key={changeIndex} className="flex items-start gap-3">
                                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                                    <span className="text-sm text-zinc-700 dark:text-zinc-300">{change}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {entry.nextSteps && (
                    <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950">
                        <div className="flex items-start gap-2">
                            <svg
                                className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                            </svg>
                            <span className="text-sm text-amber-800 dark:text-amber-200">
                                <span className="font-medium">Next:</span> {entry.nextSteps}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function SummaryCard({ date, summary }: { date: string; summary: Props['summary'] }) {
    return (
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="border-b border-zinc-100 bg-zinc-50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-800/50">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Progress Summary</h2>
                    <span className="rounded-full bg-zinc-200 px-3 py-1 text-sm font-medium text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">
                        {date}
                    </span>
                </div>
            </div>

            <div className="p-6">
                <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{summary.total}</div>
                        <div className="text-sm text-zinc-500 dark:text-zinc-400">Total Entries</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 dark:text-green-400">{summary.implemented}</div>
                        <div className="text-sm text-zinc-500 dark:text-zinc-400">Implemented</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{summary.fixed}</div>
                        <div className="text-sm text-zinc-500 dark:text-zinc-400">Fixed</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{summary.verified}</div>
                        <div className="text-sm text-zinc-500 dark:text-zinc-400">Verified</div>
                    </div>
                </div>

                <div className="mt-6 flex gap-2">
                    <div
                        className="h-3 rounded-l-full bg-green-500 transition-all"
                        style={{ width: `${(summary.implemented / summary.total) * 100}%` }}
                    />
                    <div
                        className="h-3 bg-blue-500 transition-all"
                        style={{ width: `${(summary.fixed / summary.total) * 100}%` }}
                    />
                    <div
                        className="h-3 rounded-r-full bg-purple-500 transition-all"
                        style={{ width: `${(summary.verified / summary.total) * 100}%` }}
                    />
                </div>
                <div className="mt-2 flex justify-center gap-6 text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-green-500" /> Implemented
                    </span>
                    <span className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-blue-500" /> Fixed
                    </span>
                    <span className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-purple-500" /> Verified
                    </span>
                </div>
            </div>
        </div>
    );
}

export default function Progress({ date, entries, summary }: Props) {
    return (
        <>
            <Head title="Progress Log" />

            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
                <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                            Progress Log
                        </h1>
                        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                            Development progress and completed work items
                        </p>
                    </header>

                    <div className="mb-8">
                        <SummaryCard date={date} summary={summary} />
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                            Entries ({entries.length})
                        </h2>
                        <div className="grid gap-6">
                            {entries.map((entry, index) => (
                                <ProgressEntryCard key={index} entry={entry} index={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
