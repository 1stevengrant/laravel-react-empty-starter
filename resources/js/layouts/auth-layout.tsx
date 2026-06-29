import type { ReactNode } from 'react';

import ThemeToggle from '@/components/theme-toggle';

interface AuthLayoutProps {
    description?: string;
    title: string;
    children: ReactNode;
}

export default function AuthLayout({ description, title, children }: AuthLayoutProps) {
    return (
        <div className="relative flex min-h-screen items-center justify-center bg-background px-4">
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>

            <div className="w-full max-w-sm space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
                    {description && <p className="text-sm text-muted-foreground">{description}</p>}
                </div>

                {children}
            </div>
        </div>
    );
}
