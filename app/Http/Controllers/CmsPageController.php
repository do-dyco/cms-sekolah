<?php

namespace App\Http\Controllers;

use App\Models\HomepageContent;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CmsPageController extends Controller
{
    public function apiShow(string $page): JsonResponse
    {
        return response()->json(['data' => $this->content($page)]);
    }

    public function edit(string $page, string $view): Response
    {
        return Inertia::render($view, [$page => $this->content($page)]);
    }

    public function update(Request $request, string $page): RedirectResponse
    {
        foreach ($request->except(['_method', '_token']) as $key => $value) {
            HomepageContent::query()->updateOrCreate(
                ['key' => "{$page}.{$key}"],
                ['value' => $value],
            );
        }

        return back()->with('success', 'Konten berhasil disimpan.');
    }

    private function content(string $page): array
    {
        return HomepageContent::query()
            ->where('key', 'like', "{$page}.%")
            ->pluck('value', 'key')
            ->mapWithKeys(fn ($value, $key) => [str_replace("{$page}.", '', $key) => $value])
            ->all();
    }
}
