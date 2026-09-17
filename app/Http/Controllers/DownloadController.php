<?php

namespace App\Http\Controllers;

use App\Models\Download;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class DownloadController extends Controller
{
    public function apiIndex(): JsonResponse
    {
        $items = Download::query()
            ->where('status', 'published')
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->get();

        return response()->json(['data' => $items]);
    }

    public function index(): Response
    {
        return Inertia::render('Cms/Downloads', [
            'downloads' => Download::query()->orderBy('sort_order')->orderByDesc('id')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Download::create($this->validated($request));
        return back()->with('success', 'Download item berhasil ditambahkan.');
    }

    public function update(Request $request, Download $download): RedirectResponse
    {
        $download->update($this->validated($request));
        return back()->with('success', 'Download item berhasil diperbarui.');
    }

    public function destroy(Download $download): RedirectResponse
    {
        $download->delete();
        return back()->with('success', 'Download item berhasil dihapus.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'type' => ['nullable', 'string', 'max:100'],
            'category' => ['nullable', 'string', 'max:100'],
            'version' => ['nullable', 'string', 'max:50'],
            'file_url' => ['nullable', 'string', 'max:2048'],
            'file_size' => ['nullable', 'string', 'max:50'],
            'language' => ['nullable', 'string', 'max:50'],
            'badge' => ['nullable', 'string', 'max:50'],
            'status' => ['required', Rule::in(['published', 'draft'])],
            'sort_order' => ['required', 'integer', 'min:0'],
        ]);
    }
}
