import { Head, Link, usePage } from '@inertiajs/react';

import { create as loginCreate } from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import { create as registerCreate } from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import DashboardController from '@/actions/App/Http/Controllers/DashboardController';
import { Button } from '@/components/ui/button';
import type {SharedData} from '@/types';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Home" />

            <div className="flex min-h-screen flex-col items-center justify-center bg-background">
                <div className="mx-auto w-full max-w-sm space-y-8 px-4 text-center">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome</h1>
                        <p className="text-muted-foreground">Get started by signing in to your account.</p>
                    </div>

                    <nav className="flex flex-col gap-3">
                        {auth.user ? (
                            <Button asChild size="lg" className="w-full">
                                <Link href={DashboardController.url()}>Dashboard</Link>
                            </Button>
                        ) : (
                            <>
                                <Button asChild size="lg" className="w-full">
                                    <Link href={loginCreate.url()}>Log in</Link>
                                </Button>
                                <Button asChild variant="outline" size="lg" className="w-full">
                                    <Link href={registerCreate.url()}>Create account</Link>
                                </Button>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </>
    );
}
