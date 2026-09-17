<?php

namespace Database\Seeders;

use App\Models\HomepageContent;
use Illuminate\Database\Seeder;

class HomepageContentSeeder extends Seeder
{
    public function run(): void
    {
        foreach ($this->content() as $key => $value) {
            HomepageContent::query()->updateOrCreate(['key' => $key], ['value' => $value]);
        }
    }

    private function content(): array
    {
        return [
            'hero' => [
                'eyebrow' => 'INDUSTRIAL SOLUTIONS',
                'title' => 'Empowering Industrial Excellence',
                'description' => 'Precision-engineered hardware and robust networking solutions designed for the most demanding enterprise environments. Built for reliability, crafted for performance.',
                'primary_button_text' => 'Explore Products',
                'primary_button_url' => '/products',
                'secondary_button_text' => 'Technical Specs',
                'secondary_button_url' => '/products',
                'background_image' => null,
            ],
            'standards_section' => [
                'title' => 'The Efoxpro Standard',
                'description' => 'Rigorous quality control and unyielding technical support form the foundation of our industrial offerings.',
            ],
            'standards' => [
                ['icon' => '✓', 'title' => 'High Quality', 'description' => 'Military-grade components tested in extreme environmental conditions.'],
                ['icon' => '◇', 'title' => 'Official Warranty', 'description' => 'Comprehensive coverage and rapid replacement SLAs for enterprise clients.'],
                ['icon' => '◉', 'title' => 'Technical Support', 'description' => '24/7 dedicated engineering team for integration and troubleshooting.'],
                ['icon' => '★', 'title' => 'Certified Product', 'description' => 'Compliant with stringent international industrial safety standards.'],
            ],
            'featured_section' => [
                'title' => 'Featured Hardware',
                'description' => 'Latest innovations in industrial computing.',
                'link_text' => 'View Full Catalog',
                'link_url' => '/products',
            ],
            'featured_products' => [
                ['name' => 'EFX-IPC-7000 Series', 'description' => 'Fanless Industrial PC with Intel 12th Gen Processors, designed for extreme temperature environments.', 'image' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuAn_Fg0dto1U12tHduBNMzNTS8DNQtrqiAJ5O48Mq7gqNmxG_42whkoou6T5DuXTZo1FQP81at5VnXqznc-qjOZkB6emK0loIkcoIuaonvq3tJHel9R12P8fZIzx2fWz0cTJ1AbsSHmkM0QpX-kDCMGf19515jjQJ5uN-HY5TBy_GIIBFEAAzDVn7wMHf3y1-43yLr1fyAtNgmWMSboaYsA4EXtsrH_GNxcxUzte4pKYCKmE624Xmp_cw', 'badge' => 'NEW', 'href' => '/products/efx-ipc-7000'],
                ['name' => 'EFX-NET-Gigabit', 'description' => 'Managed Industrial Switch with 16 Ports, DIN-rail mountable with redundant power inputs.', 'image' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjX-FBqJXZVRd-HLiSwCTjLdOkNip1yZsbhyrcQjW9p90M2Xf14aykYMtbQgzK8bt87kjFP5HgC6SPA0iZhkd0EsmupVTaW1oaIotPbzLXSW5SfzwgKl-X9qDdSYkq8KbXrB42jb8yHWkoqNOsjGdkTJw8sC6Fr8RUBcY8m8D-Hj4-15eOIIK51yh58xQgn3EFeddYEabSPhTwkt38yH8r2AgPPG06V-0a5PlGFDkLAV1pfB-bn2-uUA', 'badge' => null, 'href' => '/products/efx-net-gigabit'],
                ['name' => 'EFX-SENS-Pro', 'description' => 'Advanced Environmental Sensor Module for predictive maintenance and real-time monitoring.', 'image' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZuJCDVnQwpiI2KKX2KvXMVadK-8rWSYUsmy9pR0a-aG6zikbdk61zSYFTEIyy3zL916tqmPYBJqgXuggxsGaDP3WUFDrmB-24Tmd90GAKBBklxj-ftannn4HfG0Tq1g0X4Iw5ZSN_nLnsa0pYWjeyyn2hklO4qNCwLKtdN0Tu3Py2G16BdhTg1Es_LBXNFrJGbJckuYjNkNx0njuvaEwY5iA-r01Y2lu-jqQ0iTFe2a_ZzSG7UestCw', 'badge' => 'UPDATED', 'href' => '/products/efx-sens-pro'],
            ],
        ];
    }
}
