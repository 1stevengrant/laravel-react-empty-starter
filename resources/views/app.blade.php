@php $theme = config('app.theme', 'default'); @endphp
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark']) data-theme="{{ $theme }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
        @if($theme === 'brutalist')
            <link href="https://fonts.bunny.net/css?family=space-grotesk:400,500,600,700" rel="stylesheet" />
        @elseif($theme === 'ink')
            <link href="https://fonts.bunny.net/css?family=playfair-display:400,500,600,700,400i,700i" rel="stylesheet" />
        @elseif($theme === 'terminal')
            <link href="https://fonts.bunny.net/css?family=jetbrains-mono:400,500,600,700" rel="stylesheet" />
        @elseif($theme === 'retro')
            <link href="https://fonts.bunny.net/css?family=press-start-2p:400|vt323:400" rel="stylesheet" />
        @endif
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
