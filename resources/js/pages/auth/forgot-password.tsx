import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import { create as loginCreate } from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import { store } from '@/actions/App/Http/Controllers/Auth/PasswordResetLinkController';
import InputError from '@/components/input-error';
import StatusMessage from '@/components/status-message';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <AuthLayout title="Forgot password" description="Enter your email to receive a password reset link">
            <Head title="Forgot password" />

            <StatusMessage message={status} />

            <Form action={store.url()} method="post" className="space-y-6">
                {({ errors, processing }) => (
                    <>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input id="email" type="email" name="email" autoComplete="off" autoFocus placeholder="email@example.com" />
                            <InputError message={errors.email} />
                        </div>

                        <Button className="w-full" disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Email password reset link
                        </Button>
                    </>
                )}
            </Form>

            <div className="space-x-1 text-center text-sm text-muted-foreground">
                <span>Or, return to</span>
                <TextLink href={loginCreate.url()}>log in</TextLink>
            </div>
        </AuthLayout>
    );
}
