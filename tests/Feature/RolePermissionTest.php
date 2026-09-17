<?php

use App\Models\User;
use Database\Seeders\RolePermissionSeeder;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    $this->seed(RolePermissionSeeder::class);
});

test('admin can view user detail with roles and permissions', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin');
    $user = User::factory()->create();
    $user->assignRole('guru');

    $this->actingAs($admin)
        ->get(route('users.show', $user))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Users/Show')
            ->where('user.id', $user->id)
            ->where('user.roles.0', 'guru')
            ->has('user.permissions'));
});

test('regular user cannot access user management', function () {
    $user = User::factory()->create();
    $user->assignRole('guru');

    $this->actingAs($user)
        ->get(route('users.index'))
        ->assertForbidden();
});

test('admin can assign a role to user', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin');
    $user = User::factory()->create();

    $this->actingAs($admin)
        ->put(route('users.update', $user), [
            'name' => $user->name,
            'email' => $user->email,
            'roles' => ['guru'],
        ])
        ->assertRedirect(route('users.index'));

    expect($user->fresh()->hasRole('guru'))->toBeTrue();
});

test('admin can view role management page', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin');

    $this->actingAs($admin)
        ->get(route('roles.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Roles/Index')
            ->has('roles'));
});

test('admin can update role permissions', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin');
    $role = Role::findByName('guru');

    $this->actingAs($admin)
        ->put(route('roles.update', $role), [
            'permissions' => ['dashboard.view'],
        ])
        ->assertRedirect(route('roles.index'));

    expect($role->fresh()->hasPermissionTo('dashboard.view'))->toBeTrue();
});
