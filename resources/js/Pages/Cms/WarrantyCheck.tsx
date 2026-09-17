import { ContentFormPage } from './Components';

export default function WarrantyCheck() {
    return <ContentFormPage title="Warranty Check" description="Atur konten halaman cek garansi di frontend." sections={[
        { title: 'Konten Halaman', description: 'Informasi yang tampil di halaman warranty check.', fields: [
            { label: 'Judul Halaman', value: 'Warranty Check' },
            { label: 'Deskripsi', value: 'Cek status garansi produk Efoxpro Anda dengan memasukkan serial number.', type: 'textarea' },
            { label: 'Placeholder Input', value: 'Masukkan Serial Number' },
            { label: 'Teks Tombol', value: 'Cek Garansi' },
        ]},
        { title: 'Informasi Tambahan', description: 'Catatan atau instruksi tambahan untuk user.', fields: [
            { label: 'Teks Bantuan', value: 'Serial number terdiri dari 12 digit dan tertera pada kemasan produk.', type: 'textarea' },
            { label: 'Link Kontak Support', value: '/customer-service' },
        ]},
    ]} />;
}
