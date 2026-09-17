<?php

use App\Models\User;

describe('Authentication', function () {
    test('guest can view login page', function () {
        $this->get(route('login'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Auth/Login'));
    });

    test('user can login with correct credentials', function () {
        $user = User::factory()->create([
            'email' => 'admin@efoxpro.com',
            'password' => 'qwerty123',
        ]);

        $this->post(route('login'), [
            'email' => 'admin@efoxpro.com',
            'password' => 'qwerty123',
        ])->assertRedirect(route('dashboard'));

        $this->assertAuthenticatedAs($user);
    });

    test('user cannot login with wrong password', function () {
        User::factory()->create([
            'email' => 'admin@efoxpro.com',
            'password' => 'qwerty123',
        ]);

        $this->from(route('login'))->post(route('login'), [
            'email' => 'admin@efoxpro.com',
            'password' => 'wrong-password',
        ])->assertRedirect(route('login'));

        $this->assertGuest();
    });

    test('authenticated user can logout', function () {
        $user = User::factory()->create();
        $this->actingAs($user);

        $this->delete(route('logout'))
            ->assertRedirect('/');

        $this->assertGuest();
    });

    test('guest is redirected from dashboard to login', function () {
        $this->get(route('dashboard'))
            ->assertRedirect(route('login'));
    });
});
