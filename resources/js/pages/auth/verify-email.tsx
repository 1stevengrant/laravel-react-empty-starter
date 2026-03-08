import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import { destroy } from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import { store } from '@/actions/App/Http/Controllers/Auth/EmailVerificationNotificationController';
import StatusMessage from '@/components/status-message';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <Head title="Email verification" />

            <div className="w-full max-w-sm space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Verify your email</h1>
                    <p className="text-sm text-muted-foreground">
                        Before getting started, please verify your email address by clicking on the link we just emailed to you.
                    </p>
                </div>

                <StatusMessage
                    message={status === 'verification-link-sent' ? 'A new verification link has been sent to the email address you provided during registration.' : null}
                />

                <Form action={store.url()} method="post">
                    {({ processing }) => (
                        <Button className="w-full" disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Resend verification email
                        </Button>
                    )}
                </Form>

                <div className="text-center text-sm text-muted-foreground">
                    <TextLink href={destroy.url()} method="post">
                        Log out
                    </TextLink>
                </div>
            </div>
        </div>
    );
}
