import { type SharedData } from '@/types';
import { Form, Head, Link, usePage } from '@inertiajs/react';

import { store as verificationStore } from '@/actions/App/Http/Controllers/Auth/EmailVerificationNotificationController';
import { update } from '@/actions/App/Http/Controllers/Settings/ProfileController';
import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import StatusMessage from '@/components/status-message';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth, flash } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Profile settings" />

            <div className="space-y-6">
                <HeadingSmall title="Profile information" description="Update your name and email address" />

                <Form
                    action={update.url()}
                    method="patch"
                    options={{ preserveScroll: true }}
                    className="space-y-6"
                >
                    {({ errors, processing, recentlySuccessful }) => (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="first_name">First name</Label>

                                    <Input
                                        id="first_name"
                                        name="first_name"
                                        className="mt-1 block w-full"
                                        defaultValue={auth.user.first_name}
                                        required
                                        autoComplete="given-name"
                                        placeholder="First name"
                                    />

                                    <InputError className="mt-2" message={errors.first_name} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="last_name">Last name</Label>

                                    <Input
                                        id="last_name"
                                        name="last_name"
                                        className="mt-1 block w-full"
                                        defaultValue={auth.user.last_name}
                                        required
                                        autoComplete="family-name"
                                        placeholder="Last name"
                                    />

                                    <InputError className="mt-2" message={errors.last_name} />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>

                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="mt-1 block w-full"
                                    defaultValue={auth.user.email}
                                    required
                                    autoComplete="username"
                                    placeholder="Email address"
                                />

                                <InputError className="mt-2" message={errors.email} />
                            </div>

                            {mustVerifyEmail && auth.user.email_verified_at === null && (
                                <div>
                                    <p className="-mt-4 text-sm text-muted-foreground">
                                        Your email address is unverified.{' '}
                                        <Link
                                            href={verificationStore.url()}
                                            method="post"
                                            as="button"
                                            className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                        >
                                            Click here to resend the verification email.
                                        </Link>
                                    </p>

                                    <StatusMessage
                                        message={status === 'verification-link-sent' ? 'A new verification link has been sent to your email address.' : null}
                                        className="mt-2"
                                    />
                                </div>
                            )}

                            <div className="flex items-center gap-4">
                                <Button type="submit" disabled={processing}>
                                    Save
                                </Button>

                                {recentlySuccessful && <p className="text-sm text-neutral-600 animate-in fade-in">Saved</p>}
                            </div>

                            <StatusMessage message={flash?.success} />
                        </>
                    )}
                </Form>
            </div>

            <DeleteUser />
        </>
    );
}
