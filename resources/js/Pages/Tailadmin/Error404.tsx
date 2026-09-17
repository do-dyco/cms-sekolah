import { DemoCard, DemoPage } from './DemoComponents';

export default function Error404Page() {
    return (
        <DemoPage title="Error 404" description="Preview halaman error TailAdmin di dalam admin app.">
            <DemoCard title="404 Preview">
                <div className="grid gap-6 md:grid-cols-[1.2fr_.8fr] md:items-center">
                    <div>
                        <span className="mb-3 inline-block rounded-full bg-error-50 px-3 py-1 text-xs font-semibold text-error-600">Error Page</span>
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Oops! Page Not Found</h2>
                        <p className="mt-3 max-w-xl text-sm text-gray-500">The page you are looking for does not exist or has been moved. This page is provided to replace the TailAdmin Blade demo.</p>
                        <div className="mt-6 flex gap-3"><button className="rounded-xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white">Go Dashboard</button><button className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold dark:border-gray-700">Contact Support</button></div>
                    </div>
                    <img src="/images/error/404.svg" alt="404" className="mx-auto max-h-72 w-full object-contain dark:hidden" />
                </div>
            </DemoCard>
        </DemoPage>
    );
}
