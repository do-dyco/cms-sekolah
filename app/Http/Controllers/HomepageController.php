<?php

namespace App\Http\Controllers;

use App\Models\HomepageContent;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomepageController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(['data' => $this->content()]);
    }

    public function edit(): Response
    {
        return Inertia::render('Cms/Homepage', ['homepage' => $this->content()]);
    }

    public function update(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'hero' => ['required', 'array'],
            'hero.eyebrow' => ['required', 'string', 'max:100'],
            'hero.title' => ['required', 'string', 'max:255'],
            'hero.description' => ['required', 'string'],
            'hero.primary_button_text' => ['required', 'string', 'max:100'],
            'hero.primary_button_url' => ['required', 'string', 'max:255'],
            'hero.secondary_button_text' => ['required', 'string', 'max:100'],
            'hero.secondary_button_url' => ['required', 'string', 'max:255'],
            'hero.background_image' => ['nullable', 'string', 'max:2048'],
            'standards_section' => ['required', 'array'],
            'standards_section.title' => ['required', 'string', 'max:255'],
            'standards_section.description' => ['required', 'string'],
            'standards' => ['required', 'array', 'min:1'],
            'standards.*.icon' => ['required', 'string', 'max:10'],
            'standards.*.title' => ['required', 'string', 'max:255'],
            'standards.*.description' => ['required', 'string'],
            'featured_section' => ['required', 'array'],
            'featured_section.title' => ['required', 'string', 'max:255'],
            'featured_section.description' => ['required', 'string'],
            'featured_section.link_text' => ['required', 'string', 'max:100'],
            'featured_section.link_url' => ['required', 'string', 'max:255'],
            'featured_products' => ['required', 'array', 'min:1'],
            'featured_products.*.name' => ['required', 'string', 'max:255'],
            'featured_products.*.description' => ['required', 'string'],
            'featured_products.*.image' => ['required', 'string', 'max:2048'],
            'featured_products.*.badge' => ['nullable', 'string', 'max:50'],
            'featured_products.*.href' => ['required', 'string', 'max:255'],
        ]);

        foreach ($data as $key => $value) {
            HomepageContent::query()->updateOrCreate(['key' => $key], ['value' => $value]);
        }

        return back()->with('success', 'Konten homepage berhasil disimpan.');
    }

    private function content(): array
    {
        return HomepageContent::query()->pluck('value', 'key')->all();
    }
}
