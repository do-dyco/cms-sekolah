<?php

namespace App\Http\Middleware;

use App\Models\HomepageContent;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function rootView(Request $request): string
    {
        // Website publik memakai bundle terpisah (public.blade.php + site.css) agar CSS website tidak tercampur CSS admin.
        return $request->is('/') || $request->is('mading*') || $request->is('profil') || $request->is('products*') || $request->is('downloads') || $request->is('contact') || $request->is('customer-service')
            ? 'public' : parent::rootView($request);
    }

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'appName' => config('app.name'),
            'siteSettings' => fn () => HomepageContent::query()
                ->whereIn('key', ['global.site_name', 'global.tagline', 'global.footer_text'])
                ->pluck('value', 'key')
                ->mapWithKeys(fn ($value, $key) => [str_replace('global.', '', $key) => $value])
                ->all(),
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'roles' => $request->user()->getRoleNames()->values()->all(),
                    'permissions' => $request->user()->getAllPermissions()->pluck('name')->values()->all(),
                ] : null,
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
            ],
        ];
    }
}
