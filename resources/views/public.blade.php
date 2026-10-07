<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="icon" type="image/png" href="/images/logo/logo-sekolah.png">
    @viteReactRefresh
    @vite(['resources/css/site.css', 'resources/js/public.tsx'])
    <script>if (localStorage.getItem('site-theme') === 'dark' || (!localStorage.getItem('site-theme') && matchMedia('(prefers-color-scheme: dark)').matches)) document.documentElement.classList.add('dark');</script>
    @inertiaHead
</head>
<body>
    @inertia
</body>
</html>
