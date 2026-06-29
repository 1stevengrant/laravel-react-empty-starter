import type { ReactNode } from 'react';

import ThemeToggle from '@/components/theme-toggle';

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-background px-4">
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>

            <div className="w-full max-w-sm space-y-8 text-center">{children}</div>
        </div>
    );
}
