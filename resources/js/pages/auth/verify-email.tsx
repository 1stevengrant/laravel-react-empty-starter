import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import { destroy } from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import { store } from '@/actions/App/Http/Controllers/Auth/EmailVerificationNotificationController';
import StatusMessage from '@/components/status-message';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <AuthLayout
            title="Verify your email"
            description="Before getting started, please verify your email address by clicking on the link we just emailed to you."
        >
            <Head title="Email verification" />

            <StatusMessage
                message={
                    status === 'verification-link-sent'
                        ? 'A new verification link has been sent to the email address you provided during registration.'
                        : null
                }
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
        </AuthLayout>
    );
}
