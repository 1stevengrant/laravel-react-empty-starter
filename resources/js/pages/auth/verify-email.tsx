// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import { destroy } from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import { store } from '@/actions/App/Http/Controllers/Auth/EmailVerificationNotificationController';
import StatusMessage from '@/components/status-message';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(store.url());
    };

    return (
        <>
            <Head title="Email verification" />

            <StatusMessage
                message={status === 'verification-link-sent' ? 'A new verification link has been sent to the email address you provided during registration.' : null}
                className="mb-4"
            />

            <form onSubmit={submit} className="space-y-6 text-center">
                <Button disabled={processing} variant="secondary">
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Resend verification email
                </Button>

                <TextLink href={destroy.url()} method="post" className="mx-auto block text-sm">
                    Log out
                </TextLink>
            </form>
        </>
    );
}
