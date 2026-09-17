<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $this->call([
            RolePermissionSeeder::class,
            HomepageContentSeeder::class,
            ProductSeeder::class,
            NewsSeeder::class,
            DownloadSeeder::class,
            CmsPageSeeder::class,
            SchoolAbcSeeder::class,
        ]);

        $admin = User::query()->updateOrCreate(
            ['email' => 'admin@sekolahabc.sch.id'],
            [
                'name' => 'Administrator Sekolah ABC',
                'password' => 'qwerty123',
                'email_verified_at' => now(),
            ]
        );

        $admin->syncRoles(['admin']);
    }
}
