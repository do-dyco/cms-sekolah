import React from 'react';
import AppLayout from '../../layouts/AppLayout';
import { PageHeader } from '../Cms/Components';

export function DemoPage({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
    return (
        <AppLayout title={title}>
            <PageHeader title={title} description={description ?? 'TailAdmin UI demo page.'} action="" />
            <div className="space-y-6">{children}</div>
        </AppLayout>
    );
}

export function DemoCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-800">
            <div className="border-b border-gray-100 px-6 py-4 dark:border-gray-700">
                <h2 className="font-semibold text-gray-900 dark:text-white">{title}</h2>
            </div>
            <div className="p-6">{children}</div>
        </section>
    );
}
