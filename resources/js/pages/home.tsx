import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Home" />
            <nav>
                {auth.user ? (
                    <Link href={route('dashboard')}>Dashboard</Link>
                ) : (
                    <>
                        <Link href={route('login')}>Log in</Link>
                        <Link href={route('register')}>Register</Link>
                    </>
                )}
            </nav>
        </>
    );
}
