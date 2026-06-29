import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';

import { store } from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import { create as forgotPasswordCreate } from '@/actions/App/Http/Controllers/Auth/PasswordResetLinkController';
import { create as registerCreate } from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import InputError from '@/components/input-error';
import StatusMessage from '@/components/status-message';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const [remember, setRemember] = useState(false);

    return (
        <AuthLayout title="Welcome back" description="Enter your credentials to sign in to your account">
            <Head title="Log in" />

            <StatusMessage message={status} />

            <Form action={store.url()} method="post" resetOnError={['password']} transform={(data) => ({ ...data, remember })} className="space-y-6">
                {({ errors, processing }) => (
                    <>
                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input id="email" name="email" type="email" required autoFocus autoComplete="email" placeholder="email@example.com" />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    {canResetPassword && (
                                        <TextLink href={forgotPasswordCreate.url()} className="ml-auto text-sm">
                                            Forgot password?
                                        </TextLink>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    placeholder="Password"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox id="remember" checked={remember} onCheckedChange={(checked) => setRemember(checked === true)} />
                                <Label htmlFor="remember">Remember me</Label>
                            </div>
                        </div>

                        <Button type="submit" className="w-full" disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Log in
                        </Button>
                    </>
                )}
            </Form>

            <p className="text-center text-sm text-muted-foreground">
                Don't have an account? <TextLink href={registerCreate.url()}>Sign up</TextLink>
            </p>
        </AuthLayout>
    );
}
