<?php

use App\Models\HomepageContent;
use App\Models\User;
use Database\Seeders\RolePermissionSeeder;

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
