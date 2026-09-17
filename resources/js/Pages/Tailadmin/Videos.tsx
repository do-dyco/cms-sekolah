import { DemoCard, DemoPage } from './DemoComponents';

export default function VideosPage() {
    return (
        <DemoPage title="Videos" description="Demo video preview pengganti halaman TailAdmin videos.">
            <DemoCard title="Video Preview">
                <div className="relative overflow-hidden rounded-2xl">
                    <img src="/images/video-thumb/thumb-16.png" alt="Video thumbnail" className="w-full rounded-2xl object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <button className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 shadow-xl"><img src="/images/video-thumb/youtube-icon-84.svg" alt="Play" className="h-12 w-12" /></button>
                    </div>
                </div>
            </DemoCard>
        </DemoPage>
    );
}
