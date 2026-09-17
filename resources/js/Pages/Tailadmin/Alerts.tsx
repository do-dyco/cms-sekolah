import { DemoCard, DemoPage } from './DemoComponents';

const alerts = [
    ['Info alert', 'bg-blue-light-50 text-blue-light-700'],
    ['Success alert', 'bg-success-50 text-success-700'],
    ['Warning alert', 'bg-warning-50 text-warning-700'],
    ['Error alert', 'bg-error-50 text-error-700'],
];

export default function AlertsPage() {
    return (
        <DemoPage title="Alerts" description="Demo alert components pengganti halaman TailAdmin alerts.">
            <div className="grid gap-6">
                {alerts.map(([label, classes]) => (
                    <DemoCard key={label} title={label}>
                        <div className={`rounded-2xl px-5 py-4 text-sm font-medium ${classes}`}>{label} - this is a preview component for admin UI.</div>
                    </DemoCard>
                ))}
            </div>
        </DemoPage>
    );
}
