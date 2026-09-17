import { DemoCard, DemoPage } from './DemoComponents';

const images = ['/images/cards/card-01.jpg', '/images/cards/card-02.jpg', '/images/cards/card-03.jpg', '/images/product/product-01.jpg'];

export default function ImagesPage() {
    return (
        <DemoPage title="Images" description="Demo image components pengganti halaman TailAdmin images.">
            <DemoCard title="Image Grid">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{images.map(src => <img key={src} src={src} alt="Demo" className="h-52 w-full rounded-2xl object-cover" />)}</div>
            </DemoCard>
        </DemoPage>
    );
}
