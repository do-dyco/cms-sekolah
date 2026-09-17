<?php

namespace Database\Seeders;

use App\Models\HomepageContent;
use Illuminate\Database\Seeder;

class CmsPageSeeder extends Seeder
{
    public function run(): void
    {
        $pages = [
            'company' => [
                'title' => 'Engineering the Future.',
                'description' => 'Efoxpro represents a legacy of industrial precision. We combine heavy-duty manufacturing principles with lightweight technological efficiency to deliver solutions that endure.',
                'image' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHao65ilDtGr1YbnjRh3MezvtzjJnnojzXvsLzSjORwnH2atxqYieZSj4utgF3rf_Kex8P_nglMEpMz6Qsf7iGJdN4PwvdlNGnyt7miCdQE9VYN_w71oKweD-Ahn8dZrBdoN4IuRCryejDLEt1_pM2NeWG0U-sXu9Fz_RNegOy8KyDK1UXP4wKq8nMBF-u3ynmrxIctYM3MYz5avEOCMaiUfcTDjif-0NaXG7gikzp8Opcgvz-LaWs-g',
                'pill' => 'FACILITY ALPHA - EST. 1998',
            ],
            'contact' => [
                'phone' => '+1 (800) 555-0199',
                'email' => 'support@efoxpro.example',
            ],
            'customer_service' => [
                'phone' => '+1 (800) 555-0199',
                'email' => 'support@efoxpro.example',
                'whatsapp' => '',
                'hero_title' => 'How can we help you today?',
                'hero_description' => 'Find answers to common questions, explore our warranty process, or connect directly with our technical support team for personalized assistance.',
            ],
            'global' => [
                'site_name' => 'Efoxpro',
                'tagline' => 'Industrial Precision Hardware',
                'footer_text' => '© 2024 Efoxpro. All rights reserved.',
            ],
        ];

        foreach ($pages as $page => $fields) {
            foreach ($fields as $key => $value) {
                HomepageContent::query()->updateOrCreate(
                    ['key' => "{$page}.{$key}"],
                    ['value' => $value],
                );
            }
        }
    }
}
