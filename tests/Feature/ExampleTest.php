<?php

test('public homepage renders', function () {
    $this->get('/')->assertOk()->assertInertia(fn ($page) => $page->component('Site/Home', false));
});

test('dashboard requires auth', function () {
    $this->get('/dashboard')->assertRedirect(route('login'));
});
