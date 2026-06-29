import { Link, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';

import { edit as passwordEdit } from '@/actions/App/Http/Controllers/Settings/PasswordController';
import { edit as profileEdit } from '@/actions/App/Http/Controllers/Settings/ProfileController';
import ThemeToggle from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
    { title: 'Profile', href: profileEdit.url() },
    { title: 'Password', href: passwordEdit.url() },
];

interface SettingsLayoutProps {
    children: ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
    const { url } = usePage();

    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
                <header className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">Settings</h1>
                        <p className="text-sm text-muted-foreground">Manage your account settings</p>
                    </div>
                    <ThemeToggle />
                </header>

                <nav className="mb-8 flex gap-1">
                    {navItems.map((item) => (
                        <Button key={item.href} asChild variant="ghost" size="sm" className={cn(url.startsWith(item.href) && 'bg-muted')}>
                            <Link href={item.href}>{item.title}</Link>
                        </Button>
                    ))}
                </nav>

                {children}
            </div>
        </div>
    );
}
