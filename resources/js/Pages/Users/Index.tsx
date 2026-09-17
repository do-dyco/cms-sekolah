import { useState } from 'react';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import AppLayout from '../../layouts/AppLayout';
import type { AppPageProps, Pagination, UserRow } from '../../types';

type IndexProps = {
  users: Pagination<UserRow>;
  filters: { search: string };
};

export default function UsersIndex({ users, filters }: IndexProps) {
  const { auth, flash } = usePage<AppPageProps>().props;
  const [search, setSearch] = useState(filters.search ?? '');
  const canCreate = auth.user?.permissions.includes('users.create') ?? false;
  const canDelete = auth.user?.permissions.includes('users.delete') ?? false;

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get('/users', { search }, { preserveState: true, replace: true });
  };

  return (
    <AppLayout title="Users">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Users</h1>
        {canCreate && (
          <Link href="/users/create" className="rounded-lg bg-brand-500 px-4 py-2 text-white">
            + New User
          </Link>
        )}
      </div>

      {flash?.success && (
        <div className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
          {flash.success}
        </div>
      )}

      <form onSubmit={submitSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name or email..."
          className="w-full max-w-sm rounded-lg border px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
        />
        <button type="submit" className="rounded-lg bg-gray-200 px-4 py-2 text-sm dark:bg-gray-700">
          Search
        </button>
      </form>

      <div className="overflow-x-auto rounded-2xl bg-white shadow dark:bg-gray-800">
        <table className="w-full text-left text-sm">
          <thead className="border-b text-gray-500 dark:border-gray-700">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Roles</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.data.map((u) => (
              <tr key={u.id} className="border-b last:border-0 dark:border-gray-700">
                <td className="px-4 py-3 font-medium">{u.name}</td>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {u.roles.map((r) => (
                      <span key={r} className="rounded-full bg-brand-50 px-2 py-0.5 text-xs text-brand-600">
                        {r}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-500">{u.created_at ?? '-'}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/users/${u.id}`} className="mr-2 text-brand-500 hover:underline">
                    View
                  </Link>
                  <Link href={`/users/${u.id}/edit`} className="mr-2 text-brand-500 hover:underline">
                    Edit
                  </Link>
                  {canDelete && auth.user?.id !== u.id && (
                    <button
                      onClick={() => {
                        if (confirm(`Delete user \"${u.name}\"?`)) router.delete(`/users/${u.id}`);
                      }}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {users.data.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {users.last_page > 1 && (
        <div className="mt-4 flex flex-wrap gap-1">
          {users.links.map((link, i) => (
            <Link
              key={i}
              href={link.url ?? '#'}
              preserveScroll
              className={`rounded px-3 py-1 text-sm ${
                link.active ? 'bg-brand-500 text-white' : 'bg-gray-100 dark:bg-gray-700'
              } ${!link.url ? 'pointer-events-none opacity-50' : ''}`}
              dangerouslySetInnerHTML={{ __html: link.label }}
            />
          ))}
        </div>
      )}
    </AppLayout>
  );
}

type UserFormProps = {
  mode: 'create' | 'edit';
  user?: UserRow;
  availableRoles: string[];
};

export function UserForm({ mode, user, availableRoles }: UserFormProps) {
  const isEdit = mode === 'edit';
  const f = useForm({
    name: user?.name ?? '',
    email: user?.email ?? '',
    password: '',
    password_confirmation: '',
    roles: user?.roles ?? [],
  });

  const toggleRole = (role: string) => {
    f.setData('roles', f.data.roles.includes(role)
      ? f.data.roles.filter((r) => r !== role)
      : [...f.data.roles, role]);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit && user) {
      f.put(`/users/${user.id}`);
    } else {
      f.post('/users');
    }
  };

  const title = isEdit ? 'Edit User' : 'Create User';

  return (
    <AppLayout title={title}>
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow dark:bg-gray-800">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <Link href="/users" className="text-sm text-brand-500 hover:underline">
            &larr; Back
          </Link>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-gray-500">Name</label>
            <input
              type="text"
              value={f.data.name}
              onChange={(e) => f.setData('name', e.target.value)}
              className="w-full rounded-lg border px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
            />
            {f.errors.name && <p className="mt-1 text-xs text-red-500">{f.errors.name}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-500">Email</label>
            <input
              type="email"
              value={f.data.email}
              onChange={(e) => f.setData('email', e.target.value)}
              className="w-full rounded-lg border px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
            />
            {f.errors.email && <p className="mt-1 text-xs text-red-500">{f.errors.email}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-500">
              Password {isEdit && <span className="text-gray-400">(leave blank to keep)</span>}
            </label>
            <input
              type="password"
              value={f.data.password}
              onChange={(e) => f.setData('password', e.target.value)}
              className="w-full rounded-lg border px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
            />
            {f.errors.password && <p className="mt-1 text-xs text-red-500">{f.errors.password}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-500">Confirm Password</label>
            <input
              type="password"
              value={f.data.password_confirmation}
              onChange={(e) => f.setData('password_confirmation', e.target.value)}
              className="w-full rounded-lg border px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-500">Roles</label>
            <div className="flex flex-wrap gap-2">
              {availableRoles.map((role) => (
                <label key={role} className="flex items-center gap-1 text-sm">
                  <input
                    type="checkbox"
                    checked={f.data.roles.includes(role)}
                    onChange={() => toggleRole(role)}
                  />
                  {role}
                </label>
              ))}
            </div>
            {f.errors.roles && <p className="mt-1 text-xs text-red-500">{f.errors.roles}</p>}
          </div>

          <button
            type="submit"
            disabled={f.processing}
            className="rounded-lg bg-brand-500 px-4 py-2 text-white disabled:opacity-50"
          >
            {isEdit ? 'Update User' : 'Create User'}
          </button>
        </form>
      </div>
    </AppLayout>
  );
}
