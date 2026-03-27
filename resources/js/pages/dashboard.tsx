import { Head, Link, usePage } from '@inertiajs/react';

import { destroy } from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import { edit as profileEdit } from '@/actions/App/Http/Controllers/Settings/ProfileController';
import { Button } from '@/components/ui/button';
import type {SharedData} from '@/types';

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Dashboard" />

            <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
                <div className="w-full max-w-sm space-y-8 text-center">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
                        <p className="text-muted-foreground">
                            Welcome back, {auth.user.first_name}.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Button asChild variant="outline" size="lg" className="w-full">
                            <Link href={profileEdit.url()}>Profile settings</Link>
                        </Button>
                        <Button asChild variant="ghost" size="lg" className="w-full">
                            <Link href={destroy.url()} method="post" as="button">
                                Log out
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
