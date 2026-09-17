<?php

use App\Models\User;
use Database\Seeders\RolePermissionSeeder;

describe('User CRUD', function () {
    beforeEach(function () {
        $this->seed(RolePermissionSeeder::class);

        $this->admin = User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@efoxpro.com',
        ]);
        $this->admin->assignRole('admin');
        $this->actingAs($this->admin);
    });

    test('can view users index page', function () {
        User::factory()->count(3)->create();

        $this->get(route('users.index'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('Users/Index')
                ->has('users.data', 4)
                ->where('users.per_page', 25)
                ->where('users.total', 4));
    });

    test('can view user detail page', function () {
        $user = User::factory()->create();
        $user->assignRole('guru');

        $this->get(route('users.show', $user))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('Users/Show')
                ->where('user.id', $user->id));
    });

    test('can view create user page', function () {
        $this->get(route('users.create'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Users/Create'));
    });

    test('can store a new user', function () {
        $this->post(route('users.store'), [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'roles' => ['guru'],
        ])->assertRedirect(route('users.index'));

        $this->assertDatabaseHas('users', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
        ]);
    });

    test('cannot store user with duplicate email', function () {
        User::factory()->create(['email' => 'taken@example.com']);

        $this->post(route('users.store'), [
            'name' => 'Dup',
            'email' => 'taken@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'roles' => ['guru'],
        ])->assertSessionHasErrors('email');
    });

    test('can view edit user page', function () {
        $user = User::factory()->create();
        $user->assignRole('guru');

        $this->get(route('users.edit', $user))
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Users/Edit'));
    });

    test('can update user', function () {
        $user = User::factory()->create();
        $user->assignRole('guru');

        $this->put(route('users.update', $user), [
            'name' => 'Updated Name',
            'email' => $user->email,
            'roles' => ['guru'],
        ])->assertRedirect(route('users.index'));

        $user->refresh();
        expect($user->name)->toBe('Updated Name');
    });

    test('can delete user', function () {
        $user = User::factory()->create();
        $user->assignRole('guru');

        $this->delete(route('users.destroy', $user))
            ->assertRedirect(route('users.index'));

        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    });

    test('cannot delete self', function () {
        $this->delete(route('users.destroy', $this->admin))
            ->assertSessionHasErrors();

        $this->assertDatabaseHas('users', ['id' => $this->admin->id]);
    });
});
