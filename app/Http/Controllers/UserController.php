<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    private function authorizeAdmin(Request $request): void
    {
        abort_unless($request->user()?->can('users.view'), 403);
    }

    public function index(Request $request): Response
    {
        $this->authorizeAdmin($request);

        $search = trim((string) $request->input('search', ''));

        $users = User::query()
            ->with('roles:id,name')
            ->when($search !== '', fn ($query) => $query->where(function ($inner) use ($search) {
                $inner->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            }))
            ->latest()
            ->paginate(25)
            ->withQueryString()
            ->through(fn (User $user) => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->getRoleNames()->values(),
                'created_at' => $user->created_at?->format('Y-m-d H:i:s'),
            ]);

        return Inertia::render('Users/Index', [
            'title' => 'Users',
            'filters' => ['search' => $search],
            'users' => $users,
        ]);
    }

    public function show(Request $request, User $user): Response
    {
        $this->authorizeAdmin($request);

        return Inertia::render('Users/Show', [
            'title' => 'User Detail',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->getRoleNames()->values(),
                'permissions' => $user->getAllPermissions()->pluck('name')->values(),
                'created_at' => $user->created_at?->format('Y-m-d H:i:s'),
            ],
        ]);
    }

    public function create(Request $request): Response
    {
        abort_unless($request->user()?->can('users.create'), 403);

        return Inertia::render('Users/Create', [
            'title' => 'Create User',
            'availableRoles' => Role::query()->orderBy('name')->pluck('name')->values(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        abort_unless($request->user()?->can('users.create'), 403);

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'roles' => ['nullable', 'array'],
            'roles.*' => ['string', 'exists:roles,name'],
        ]);

        $user = User::create($data);
        $user->syncRoles($data['roles'] ?? ['guru']);

        return redirect()->route('users.index')->with('success', 'User berhasil dibuat.');
    }

    public function edit(Request $request, User $user): Response
    {
        abort_unless($request->user()?->can('users.update'), 403);

        return Inertia::render('Users/Edit', [
            'title' => 'Edit User',
            'availableRoles' => Role::query()->orderBy('name')->pluck('name')->values(),
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->getRoleNames()->values(),
            ],
        ]);
    }

    public function update(Request $request, User $user): RedirectResponse
    {
        abort_unless($request->user()?->can('users.update'), 403);

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
            'roles' => ['nullable', 'array'],
            'roles.*' => ['string', 'exists:roles,name'],
        ]);

        if (blank($data['password'] ?? null)) {
            unset($data['password']);
        }

        $roles = $data['roles'] ?? $user->getRoleNames()->all();
        unset($data['roles']);

        $user->update($data);
        $user->syncRoles($roles);

        return redirect()->route('users.index')->with('success', 'User berhasil diupdate.');
    }

    public function destroy(Request $request, User $user): RedirectResponse
    {
        abort_unless($request->user()?->can('users.delete'), 403);

        if ((int) $request->user()->id === (int) $user->id) {
            return back()->withErrors([
                'user' => 'User login tidak boleh menghapus dirinya sendiri.',
            ]);
        }

        $user->delete();

        return redirect()->route('users.index')->with('success', 'User berhasil dihapus.');
    }
}
