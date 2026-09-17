<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    public function apiIndex(): JsonResponse
    {
        $articles = News::query()
            ->where('status', 'published')
            ->orderByDesc('sort_order')
            ->orderByDesc('published_at')
            ->get();

        return response()->json(['data' => $articles]);
    }

    public function apiShow(string $slug): JsonResponse
    {
        $article = News::query()
            ->where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        return response()->json(['data' => $article]);
    }

    public function index(): Response
    {
        return Inertia::render('Cms/News', [
            'articles' => News::query()->orderByDesc('sort_order')->orderByDesc('published_at')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        News::create($this->validated($request));

        return back()->with('success', 'Artikel berhasil ditambahkan.');
    }

    public function update(Request $request, News $news): RedirectResponse
    {
        $news->update($this->validated($request, $news));

        return back()->with('success', 'Artikel berhasil diperbarui.');
    }

    public function destroy(News $news): RedirectResponse
    {
        $news->delete();

        return back()->with('success', 'Artikel berhasil dihapus.');
    }

    private function validated(Request $request, ?News $news = null): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', Rule::unique('news', 'slug')->ignore($news)],
            'category' => ['nullable', 'string', 'max:100'],
            'excerpt' => ['nullable', 'string'],
            'content' => ['nullable', 'string'],
            'image' => ['nullable', 'string', 'max:2048'],
            'published_at' => ['nullable', 'date'],
            'is_featured' => ['boolean'],
            'is_promo' => ['boolean'],
            'status' => ['required', Rule::in(['published', 'draft'])],
            'sort_order' => ['required', 'integer', 'min:0'],
        ]);
    }
}
