import { DemoCard, DemoPage } from './DemoComponents';

const avatars = Array.from({ length: 8 }, (_, i) => `/images/user/user-${String(i + 1).padStart(2, '0')}.jpg`);

export default function AvatarsPage() {
    return (
        <DemoPage title="Avatars" description="Demo avatar styles pengganti halaman TailAdmin avatars.">
            <DemoCard title="Avatar Variants">
                <div className="flex flex-wrap items-center gap-4">{avatars.map((src, index) => <img key={src} src={src} alt={`User ${index + 1}`} className={`rounded-full object-cover ${index < 2 ? 'h-10 w-10' : index < 5 ? 'h-14 w-14' : 'h-20 w-20'}`} />)}</div>
            </DemoCard>
        </DemoPage>
    );
}
