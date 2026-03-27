import inertia from '@inertiajs/vite';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { exec } from 'child_process';
import laravel from 'laravel-vite-plugin';
import { type Plugin, defineConfig } from 'vite';

function runOnChange(commands: { name: string; run: string[]; pattern: RegExp }[]): Plugin {
    return {
        name: 'run-on-change',
        configureServer(server) {
            server.watcher.on('change', (file) => {
                for (const cmd of commands) {
                    if (cmd.pattern.test(file)) {
                        exec(cmd.run.join(' '), (err, _stdout, stderr) => {
                            if (err) {
                                server.config.logger.error(`[${cmd.name}] ${stderr}`);
                            } else {
                                server.config.logger.info(`[${cmd.name}] done`);
                            }
                        });
                    }
                }
            });
        },
    };
}

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
        }),
        inertia(),
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
        runOnChange([
            {
                name: 'typescript transform',
                run: ['php', 'artisan', 'typescript:transform'],
                pattern: /app\/.*Data\.php$/,
            },
        ]),
    ],
});
