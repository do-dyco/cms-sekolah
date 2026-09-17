<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function apiIndex(): JsonResponse
    {
        $products = Product::query()
            ->where('status', 'published')
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();

        return response()->json(['data' => $products]);
    }

    public function apiShow(string $slug): JsonResponse
    {
        $product = Product::query()
            ->where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        $related = Product::query()
            ->where('status', 'published')
            ->where('id', '!=', $product->id)
            ->orderBy('sort_order')
            ->limit(4)
            ->get();

        return response()->json(['data' => $product, 'related' => $related]);
    }

    public function index(): Response
    {
        return Inertia::render('Cms/Products', [
            'products' => Product::query()->orderBy('sort_order')->orderBy('name')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Product::create($this->validated($request));

        return back()->with('success', 'Produk berhasil ditambahkan.');
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $product->update($this->validated($request, $product));

        return back()->with('success', 'Produk berhasil diperbarui.');
    }

    public function destroy(Product $product): RedirectResponse
    {
        $product->delete();

        return back()->with('success', 'Produk berhasil dihapus.');
    }

    private function validated(Request $request, ?Product $product = null): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', Rule::unique('products', 'slug')->ignore($product)],
            'sku' => ['nullable', 'string', 'max:100'],
            'category' => ['nullable', 'string', 'max:100'],
            'badge' => ['nullable', 'string', 'max:50'],
            'image' => ['nullable', 'string', 'max:2048'],
            'description' => ['nullable', 'string'],
            'content' => ['nullable', 'string'],
            'specs' => ['nullable', 'array'],
            'specs.*.label' => ['required_with:specs', 'string', 'max:255'],
            'specs.*.value' => ['required_with:specs', 'string'],
            'thumbnails' => ['nullable', 'array'],
            'thumbnails.*' => ['nullable', 'string', 'max:2048'],
            'resources' => ['nullable', 'array'],
            'resources.*.label' => ['required_with:resources', 'string', 'max:255'],
            'resources.*.url' => ['nullable', 'string', 'max:2048'],
            'status' => ['required', Rule::in(['published', 'draft'])],
            'sort_order' => ['required', 'integer', 'min:0'],
        ]);
    }
}
