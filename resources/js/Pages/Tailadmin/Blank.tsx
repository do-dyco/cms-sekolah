import { DemoCard, DemoPage } from './DemoComponents';

export default function BlankPage() {
    return (
        <DemoPage title="Blank" description="Halaman kosong untuk kebutuhan custom page TailAdmin style.">
            <DemoCard title="Blank Canvas">
                <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-16 text-center text-gray-500 dark:border-gray-700 dark:bg-gray-900">
                    Start building your page here.
                </div>
            </DemoCard>
        </DemoPage>
    );
}
