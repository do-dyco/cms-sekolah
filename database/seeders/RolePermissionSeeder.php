<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = collect([
            'dashboard.view',
            'users.view', 'users.create', 'users.update', 'users.delete',
            'roles.view', 'roles.update',
            'mading.view', 'mading.create', 'mading.update', 'mading.delete',
        ])->mapWithKeys(fn (string $name) => [$name => Permission::findOrCreate($name, 'web')]);

        $admin = Role::findOrCreate('admin', 'web');
        $admin->syncPermissions($permissions->values());

        $guru = Role::findOrCreate('guru', 'web');
        $guru->syncPermissions([
            $permissions['dashboard.view'],
            $permissions['mading.view'],
            $permissions['mading.create'],
            $permissions['mading.update'],
            $permissions['mading.delete'],
        ]);
    }
}
