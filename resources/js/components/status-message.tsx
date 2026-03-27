import { cva  } from 'class-variance-authority';
import type {VariantProps} from 'class-variance-authority';
import type {HTMLAttributes} from 'react';
import { cn } from '@/lib/utils';

const statusMessageVariants = cva('rounded-md p-3 text-center text-sm font-medium', {
    variants: {
        variant: {
            success: 'bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400',
            error: 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400',
            warning: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-400',
            info: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
        },
    },
    defaultVariants: {
        variant: 'success',
    },
});

interface StatusMessageProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof statusMessageVariants> {
    message?: string | null;
}

export default function StatusMessage({ message, variant, className, ...props }: StatusMessageProps) {
    return message ? (
        <div {...props} className={cn(statusMessageVariants({ variant }), className)}>
            {message}
        </div>
    ) : null;
}
