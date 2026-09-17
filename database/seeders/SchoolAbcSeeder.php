<?php

namespace Database\Seeders;

use App\Models\Download;
use App\Models\HomepageContent;
use App\Models\News;
use App\Models\Product;
use Illuminate\Database\Seeder;

class SchoolAbcSeeder extends Seeder
{
    public function run(): void
    {
        $images = [
            'kelas-digital' => 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
            'klub-sains' => 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
            'sepak-bola' => 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80',
        ];

        $homepage = [
            'hero' => [
                'eyebrow' => 'SEKOLAH ABC',
                'title' => 'Membangun Generasi Unggul dan Berkarakter',
                'description' => 'Sekolah ABC menghadirkan pembelajaran berkualitas, lingkungan yang aman, dan ruang tumbuh bagi setiap peserta didik.',
                'primary_button_text' => 'Lihat Program',
                'primary_button_url' => '/products',
                'secondary_button_text' => 'Profil Sekolah',
                'secondary_button_url' => '/profil',
                'background_image' => 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80',
            ],
            'standards_section' => [
                'title' => 'Keunggulan Sekolah ABC',
                'description' => 'Pendidikan yang berpusat pada karakter, prestasi, dan kesiapan menghadapi masa depan.',
            ],
            'standards' => [
                ['icon' => '✓', 'title' => 'Pembelajaran Berkualitas', 'description' => 'Kurikulum dan metode belajar yang mendukung perkembangan akademik serta potensi siswa.'],
                ['icon' => '◇', 'title' => 'Karakter Positif', 'description' => 'Membentuk siswa yang berintegritas, bertanggung jawab, dan menghargai sesama.'],
                ['icon' => '◉', 'title' => 'Guru Profesional', 'description' => 'Didampingi pendidik yang kompeten, peduli, dan terus berkembang.'],
                ['icon' => '★', 'title' => 'Prestasi Siswa', 'description' => 'Mendorong prestasi akademik dan nonakademik melalui kegiatan yang beragam.'],
            ],
            'featured_section' => [
                'title' => 'Program Unggulan',
                'description' => 'Pilihan program yang membantu siswa berkembang sesuai minat dan bakatnya.',
                'link_text' => 'Lihat Semua Program',
                'link_url' => '/products',
            ],
            'featured_products' => [
                ['name' => 'Kelas Digital', 'description' => 'Pembelajaran berbasis teknologi untuk meningkatkan kreativitas dan keterampilan digital siswa.', 'image' => $images['kelas-digital'], 'badge' => 'UNGGULAN', 'href' => '/products/kelas-digital'],
                ['name' => 'Klub Sains', 'description' => 'Kegiatan eksperimen dan proyek sains untuk menumbuhkan rasa ingin tahu siswa.', 'image' => $images['klub-sains'], 'badge' => 'POPULER', 'href' => '/products/klub-sains'],
                ['name' => 'Ekstrakurikuler Sepak Bola', 'description' => 'Latihan olahraga rutin untuk membangun kesehatan, disiplin, dan kerja sama tim.', 'image' => $images['sepak-bola'], 'badge' => null, 'href' => '/products/sepak-bola'],
            ],
        ];

        foreach ($homepage as $key => $value) {
            HomepageContent::query()->updateOrCreate(['key' => $key], ['value' => $value]);
        }

        $pages = [
            'company' => [
                'title' => 'Profil Sekolah ABC',
                'description' => 'Sekolah ABC adalah lingkungan belajar yang mendorong setiap siswa untuk berprestasi, berkarakter, dan siap berkontribusi bagi masyarakat.',
                'image' => '',
                'pill' => 'BERDIRI SEJAK 1998',
                'visi' => 'Menjadi sekolah terpercaya yang membentuk generasi unggul, berkarakter, kreatif, dan peduli terhadap sesama.',
                'misi' => "Menyelenggarakan pembelajaran yang aktif dan bermakna.\nMengembangkan potensi akademik dan nonakademik siswa.\nMembangun budaya sekolah yang aman, disiplin, dan berintegritas.",
            ],
            'contact' => [
                'phone' => '(021) 555-0123',
                'email' => 'info@sekolahabc.sch.id',
            ],
            'customer_service' => [
                'phone' => '(021) 555-0123',
                'email' => 'info@sekolahabc.sch.id',
                'whatsapp' => '628125550123',
                'hero_title' => 'Informasi Sekolah ABC',
                'hero_description' => 'Hubungi Sekolah ABC untuk informasi pendaftaran, akademik, kegiatan, dan layanan sekolah.',
            ],
            'global' => [
                'site_name' => 'Sekolah ABC',
                'tagline' => 'Unggul, Berkarakter, Berprestasi',
                'footer_text' => '© 2026 Sekolah ABC. Semua hak dilindungi.',
            ],
        ];

        foreach ($pages as $page => $fields) {
            foreach ($fields as $key => $value) {
                HomepageContent::query()->updateOrCreate(['key' => "{$page}.{$key}"], ['value' => $value]);
            }
        }

        Product::query()->delete();
        foreach ([
            ['slug' => 'kelas-digital', 'name' => 'Kelas Digital', 'sku' => 'ABC-PROG-01', 'category' => 'AKADEMIK', 'badge' => 'UNGGULAN', 'description' => 'Pembelajaran berbasis teknologi untuk meningkatkan kreativitas dan keterampilan digital siswa.', 'content' => 'Program ini memadukan pembelajaran tatap muka dengan sumber belajar digital yang terarah.', 'image' => $images['kelas-digital'], 'specs' => [['label' => 'Peserta', 'value' => 'Siswa kelas 7–9'], ['label' => 'Jadwal', 'value' => 'Senin dan Rabu']], 'thumbnails' => [], 'resources' => [], 'status' => 'published', 'sort_order' => 1],
            ['slug' => 'klub-sains', 'name' => 'Klub Sains', 'sku' => 'ABC-PROG-02', 'category' => 'EKSTRAKURIKULER', 'badge' => 'POPULER', 'description' => 'Kegiatan eksperimen dan proyek sains untuk menumbuhkan rasa ingin tahu siswa.', 'content' => 'Siswa belajar melalui eksperimen sederhana, diskusi, dan proyek kolaboratif.', 'image' => $images['klub-sains'], 'specs' => [['label' => 'Peserta', 'value' => 'Siswa kelas 4–9'], ['label' => 'Jadwal', 'value' => 'Jumat']], 'thumbnails' => [], 'resources' => [], 'status' => 'published', 'sort_order' => 2],
            ['slug' => 'sepak-bola', 'name' => 'Ekstrakurikuler Sepak Bola', 'sku' => 'ABC-PROG-03', 'category' => 'OLAHRAGA', 'badge' => null, 'description' => 'Latihan olahraga rutin untuk membangun kesehatan, disiplin, dan kerja sama tim.', 'content' => 'Program dibimbing pelatih berpengalaman dan terbuka bagi siswa sesuai kelompok usia.', 'image' => $images['sepak-bola'], 'specs' => [['label' => 'Peserta', 'value' => 'Siswa kelas 4–9'], ['label' => 'Jadwal', 'value' => 'Selasa dan Kamis']], 'thumbnails' => [], 'resources' => [], 'status' => 'published', 'sort_order' => 3],
        ] as $product) {
            Product::query()->create($product);
        }

        News::query()->delete();
        foreach ([
            ['slug' => 'penerimaan-peserta-didik-baru', 'title' => 'Pendaftaran Peserta Didik Baru Sekolah ABC Dibuka', 'category' => 'PENGUMUMAN', 'excerpt' => 'Informasi jadwal dan persyaratan pendaftaran peserta didik baru Sekolah ABC.', 'content' => 'Pendaftaran peserta didik baru dibuka mulai bulan Februari. Silakan hubungi sekolah untuk informasi lengkap.', 'image' => null, 'published_at' => '2026-02-01', 'is_featured' => true, 'is_promo' => false, 'status' => 'published', 'sort_order' => 3],
            ['slug' => 'siswa-abc-raih-prestasi-sains', 'title' => 'Siswa Sekolah ABC Raih Prestasi di Olimpiade Sains', 'category' => 'PRESTASI', 'excerpt' => 'Selamat kepada siswa Sekolah ABC yang berhasil meraih juara dalam Olimpiade Sains tingkat kota.', 'content' => 'Prestasi ini menjadi hasil kerja keras siswa, guru, dan dukungan orang tua.', 'image' => null, 'published_at' => '2026-01-20', 'is_featured' => false, 'is_promo' => false, 'status' => 'published', 'sort_order' => 2],
            ['slug' => 'kegiatan-hari-guru', 'title' => 'Sekolah ABC Memperingati Hari Guru', 'category' => 'KEGIATAN', 'excerpt' => 'Rangkaian kegiatan peringatan Hari Guru berlangsung meriah dan penuh apresiasi.', 'content' => 'Seluruh warga sekolah mengikuti kegiatan dengan antusias.', 'image' => null, 'published_at' => '2025-11-25', 'is_featured' => false, 'is_promo' => false, 'status' => 'published', 'sort_order' => 1],
        ] as $article) {
            News::query()->create($article);
        }

        Download::query()->delete();
        foreach ([
            ['title' => 'Kalender Akademik Sekolah ABC', 'type' => 'Dokumen', 'category' => 'Akademik', 'version' => '2026', 'file_size' => '1 MB', 'language' => 'ID', 'badge' => 'Terbaru', 'status' => 'published', 'sort_order' => 1],
            ['title' => 'Brosur Profil Sekolah ABC', 'type' => 'Brosur', 'category' => 'Profil', 'version' => '2026', 'file_size' => '2 MB', 'language' => 'ID', 'badge' => null, 'status' => 'published', 'sort_order' => 2],
            ['title' => 'Formulir Pendaftaran Siswa Baru', 'type' => 'Formulir', 'category' => 'Pendaftaran', 'version' => '2026', 'file_size' => '500 KB', 'language' => 'ID', 'badge' => null, 'status' => 'published', 'sort_order' => 3],
        ] as $download) {
            Download::query()->create($download);
        }
    }
}
