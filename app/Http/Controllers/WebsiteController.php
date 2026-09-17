<?php

namespace App\Http\Controllers;

use App\Models\Download;
use App\Models\HomepageContent;
use App\Models\News;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class WebsiteController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('Site/Home', ['homepage' => HomepageContent::query()->pluck('value', 'key')->all()]);
    }

    public function profil(): Response
    {
        return Inertia::render('Site/Profil', ['profil' => $this->page('company')]);
    }

    public function mading(): Response
    {
        return Inertia::render('Site/Mading', ['articles' => $this->articles()]);
    }

    public function madingShow(string $slug): Response
    {
        $mading = News::query()->where('slug', $slug)->where('status', 'published')->first();

        return Inertia::render('Site/MadingDetail', ['mading' => $mading]);
    }

    public function products(): Response
    {
        return Inertia::render('Site/Products', ['products' => $this->programs()]);
    }

    public function productShow(string $slug): Response
    {
        $program = Product::query()->where('slug', $slug)->where('status', 'published')->first();

        $related = $this->programs(4, $program?->id);

        return Inertia::render('Site/ProductDetail', ['program' => $program, 'related' => $related]);
    }

    public function downloads(): Response
    {
        $downloads = Download::query()->where('status', 'published')->orderBy('sort_order')->orderByDesc('id')->get();

        return Inertia::render('Site/Downloads', ['downloads' => $downloads]);
    }

    public function contact(): Response
    {
        return Inertia::render('Site/Contact', ['contact' => $this->page('contact')]);
    }

    public function informasi(): Response
    {
        return Inertia::render('Site/Informasi', ['informasi' => $this->page('customer_service')]);
    }

    private function page(string $key): array
    {
        return HomepageContent::query()->where('key', 'like', "{$key}.%")->pluck('value', 'key')
            ->mapWithKeys(fn ($value, $k) => [str_replace("{$key}.", '', $k) => $value])->all();
    }

    private function articles(): array
    {
        return News::query()->where('status', 'published')->orderByDesc('sort_order')->orderByDesc('published_at')->get()
            ->map(fn (News $article) => [
                'title' => $article->title,
                'description' => $article->excerpt ?? '',
                'image' => $article->image ?? '',
                'category' => $article->category ?? 'UMUM',
                'date' => $article->published_at ?? '',
                'href' => "/mading/{$article->slug}",
                'featured' => $article->is_featured,
                'promo' => false,
            ])->all();
    }

    private function programs(int $limit = null, int $exceptId = null): array
    {
        return Product::query()->where('status', 'published')
            ->when($exceptId, fn ($q) => $q->where('id', '!=', $exceptId))
            ->orderBy('sort_order')->orderBy('name')
            ->when($limit, fn ($q) => $q->limit($limit))
            ->get()
            ->map(fn (Product $product) => [
                'name' => $product->name,
                'description' => $product->description ?? '',
                'image' => $product->image ?? '',
                'badge' => $product->badge ?? '',
                'category' => $product->category ?? '',
                'href' => "/products/{$product->slug}",
            ])->all();
    }
}
