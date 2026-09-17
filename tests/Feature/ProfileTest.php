<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;

describe('Authenticated user profile', function () {
    beforeEach(function () {
        $this->user = User::factory()->create([
            'name' => 'Current User',
            'email' => 'current@example.com',
            'password' => 'old-password',
        ]);
        $this->actingAs($this->user);
    });

    test('authenticated user can view own profile page', function () {
        $this->get(route('profile.edit'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Account/Profile'));
    });

    test('authenticated user can update own profile', function () {
        $this->put(route('profile.update'), [
            'name' => 'Updated User',
            'email' => 'updated@example.com',
        ])->assertRedirect(route('profile.edit'));

        $this->user->refresh();
        expect($this->user->name)->toBe('Updated User')
            ->and($this->user->email)->toBe('updated@example.com');
    });

    test('authenticated user can change password with current password', function () {
        $this->put(route('profile.password'), [
            'current_password' => 'old-password',
            'password' => 'new-password-123',
            'password_confirmation' => 'new-password-123',
        ])->assertRedirect(route('profile.edit'));

        expect(Hash::check('new-password-123', $this->user->refresh()->password))->toBeTrue();
    });

    test('password change rejects an incorrect current password', function () {
        $this->from(route('profile.edit'))->put(route('profile.password'), [
            'current_password' => 'incorrect-password',
            'password' => 'new-password-123',
            'password_confirmation' => 'new-password-123',
        ])->assertRedirect(route('profile.edit'))
            ->assertSessionHasErrors('current_password');

        expect(Hash::check('old-password', $this->user->refresh()->password))->toBeTrue();
    });
});
