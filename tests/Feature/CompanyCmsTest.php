<?php

use App\Models\HomepageContent;
use App\Models\User;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    $this->seed(RolePermissionSeeder::class);
});

test('admin can view company cms page', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin');

    $this->actingAs($admin)->get('/cms/company')->assertOk();
});

test('admin can save visi misi on company cms page', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin');

    $this->actingAs($admin)->put('/cms/company', [
        'title' => 'Profil Sekolah Example',
        'description' => 'Deskripsi profil.',
        'image' => 'https://example.com/img.jpg',
        'pill' => 'Akreditasi A',
        'visi' => 'Terwujudnya generasi unggul dan berkarakter.',
        'misi' => "1. Pendidikan berkualitas.\n2. Lingkungan aman.\n3. Pendidik profesional.",
    ])->assertRedirect();

    expect(HomepageContent::query()->where('key', 'company.visi')->value('value'))
        ->toBe('Terwujudnya generasi unggul dan berkarakter.');
    expect(HomepageContent::query()->where('key', 'company.misi')->value('value'))
        ->toBe("1. Pendidikan berkualitas.\n2. Lingkungan aman.\n3. Pendidik profesional.");
});

test('public profil page shows saved visi misi', function () {
    HomepageContent::query()->create(['key' => 'company.visi', 'value' => 'Visi FE test.']);
    HomepageContent::query()->create(['key' => 'company.misi', 'value' => 'Misi FE test.']);

    $this->get('/profil')->assertOk()->assertInertia(fn ($page) => $page
        ->where('profil.visi', 'Visi FE test.')
        ->where('profil.misi', 'Misi FE test.'));
});

test('public pages share website settings', function () {
    HomepageContent::query()->create(['key' => 'global.site_name', 'value' => 'Sekolah ABC']);
    HomepageContent::query()->create(['key' => 'global.tagline', 'value' => 'Belajar bersama']);
    HomepageContent::query()->create(['key' => 'global.footer_text', 'value' => '© Sekolah ABC']);

    $this->get('/')->assertOk()->assertInertia(fn ($page) => $page
        ->where('siteSettings.site_name', 'Sekolah ABC')
        ->where('siteSettings.tagline', 'Belajar bersama')
        ->where('siteSettings.footer_text', '© Sekolah ABC'));
});

test('admin can upload cms image', function () {
    Storage::fake('public');
    $admin = User::factory()->create();
    $admin->assignRole('admin');

    // ponytail: minimal JPEG bytes, karena ekstensi GD tidak tersedia untuk fake()->image()
    $jpeg = hex2bin('FFD8FFE000104A46494600010100000100010000FFD9');
    $file = UploadedFile::fake()->createWithContent('sekolah.jpg', $jpeg);

    $path = $this->actingAs($admin)->post('/cms/upload-image', [
        'image' => $file,
    ])->assertOk()->json('path');

    expect($path)->toStartWith('/storage/cms/');
    Storage::disk('public')->assertExists(str_replace('/storage/', '', $path));
});
