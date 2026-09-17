import { DemoCard, DemoPage } from './DemoComponents';

export default function ButtonsPage() {
    return (
        <DemoPage title="Buttons" description="Demo button styles pengganti halaman TailAdmin buttons.">
            <DemoCard title="Button Variants">
                <div className="flex flex-wrap gap-3">
                    <button className="rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white">Primary Button</button>
                    <button className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold dark:border-gray-700">Outline Button</button>
                    <button className="rounded-xl bg-success-500 px-5 py-3 text-sm font-semibold text-white">Success Button</button>
                    <button className="rounded-xl bg-warning-500 px-5 py-3 text-sm font-semibold text-white">Warning Button</button>
                    <button className="rounded-xl bg-error-500 px-5 py-3 text-sm font-semibold text-white">Danger Button</button>
                </div>
            </DemoCard>
        </DemoPage>
    );
}
