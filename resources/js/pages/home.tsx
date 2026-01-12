import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

import { create as loginCreate } from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import { create as registerCreate } from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import DashboardController from '@/actions/App/Http/Controllers/DashboardController';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Home" />
            <nav>
                {auth.user ? (
                    <Link href={DashboardController.url()}>Dashboard</Link>
                ) : (
                    <>
                        <Link href={loginCreate.url()}>Log in</Link>
                        <Link href={registerCreate.url()}>Register</Link>
                    </>
                )}
            </nav>
        </>
    );
}
