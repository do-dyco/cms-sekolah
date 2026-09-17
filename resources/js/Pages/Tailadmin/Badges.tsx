import { DemoCard, DemoPage } from './DemoComponents';

const badges = [
    ['Primary', 'bg-brand-50 text-brand-600'],
    ['Success', 'bg-success-50 text-success-700'],
    ['Warning', 'bg-warning-50 text-warning-700'],
    ['Error', 'bg-error-50 text-error-700'],
    ['Dark', 'bg-gray-900 text-white'],
];

export default function BadgesPage() {
    return (
        <DemoPage title="Badges" description="Demo badge styles pengganti halaman TailAdmin badges.">
            <DemoCard title="Badge Collection">
                <div className="flex flex-wrap gap-3">{badges.map(([label, cls]) => <span key={label} className={`rounded-full px-4 py-2 text-sm font-semibold ${cls}`}>{label}</span>)}</div>
            </DemoCard>
        </DemoPage>
    );
}
