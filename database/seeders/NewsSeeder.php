<?php

namespace Database\Seeders;

use App\Models\News;
use Illuminate\Database\Seeder;

class NewsSeeder extends Seeder
{
    public function run(): void
    {
        $articles = [
            ['slug'=>'efoxpro-unveils-next-generation-smart-manufacturing-hub','title'=>'Efoxpro Unveils Next-Generation Smart Manufacturing Hub','category'=>'COMPANY UPDATE','excerpt'=>'The new facility integrates advanced robotics and AI-driven quality control, promising a 40% increase in production efficiency while maintaining our rigorous reliability standards.','content'=>'Full article content here.','image'=>'https://lh3.googleusercontent.com/aida-public/AB6AXuCp65TM3KgxE0bpHtFgr5S0lmkCrLlkSx7zTHOaqK-RHn_xDzOLfUrHZ_AOuGPhjvfTejYHYA3k5MvZoeUhIPgJyXFyZtjxz2kjeKRBC4w741fYWWHRR6aOU8DmO3xa8sz2RltXCdPMSTL6yad8h41QqMSe19yERd-5_cDp5tNagg-rgRsLavYlRYfT9V_m08XN75dDqFwo4jTREwwQy1qOB377gGYm-UsByIGgCS8gfjh8Stpgzj3ZRQ','published_at'=>'2024-10-24','is_featured'=>true,'status'=>'published','sort_order'=>10],
            ['slug'=>'advancements-in-micro-precision-tooling-for-2025','title'=>'Advancements in Micro-Precision Tooling for 2025','category'=>'TECHNOLOGY','excerpt'=>'A deep dive into the new materials and techniques setting the standard for enterprise hardware durability.','content'=>'Full article content here.','image'=>'https://lh3.googleusercontent.com/aida-public/AB6AXuDs1egvn-bosBUKLS4RhbLoU2HHEGZLNbfl5EevgQKRPZUAuzBRSfVGxe89NHvYIvL3iCzPpZyZmSg0NiOg5r0I2QR46YeY4X-3kcs2RlQUfnO6RNZ41pTxj7SdhoRQOWgiiq8NzadrwiWGAdk6IhCp0xBS68tKGE08qXZrn2lALcNuHpVGpK7X2qOZirVVKEuBizjL2aKO4B7UazF0pT0FKJfYWuwvFLsuIPnMWdKgYrpvlXSPxD-Biw','published_at'=>'2024-10-18','status'=>'published','sort_order'=>9],
            ['slug'=>'navigating-the-global-supply-chain-challenges','title'=>'Navigating the Global Supply Chain Challenges','category'=>'INSIGHTS','excerpt'=>'Our logistics experts share strategies for maintaining inventory stability in a volatile global market.','content'=>'Full article content here.','image'=>'https://lh3.googleusercontent.com/aida-public/AB6AXuAJ0CfbXVEBlamOX004lSoMwurd5b2szx5XsTUllT7OG8Z1jv3-og5z7OfRoGA_7CR4wmQSaFDeHbtkty8P6dXF0rwkZAkI4aA5M2XGu7z6inIYEjJ33M9Ik1QiwkFxhXsCdUhj6cepG3yhMrLI97Ar958NeAoKwfULkuLuKtJUBTig7Gbc6x8MVLOk9oyamLc10-ThUvxWWCvVucq6H_Dw9pbk2LvEkbwR1tJsmLsOe4sy2zBeNx2EMg','published_at'=>'2024-10-12','status'=>'published','sort_order'=>8],
            ['slug'=>'introducing-the-efoxpro-proxima-series-server-racks','title'=>'Introducing the Efoxpro Proxima Series Server Racks','category'=>'PRODUCT LAUNCH','excerpt'=>'Engineered for maximum thermal efficiency and modular scalability in modern data centers.','content'=>'Full article content here.','image'=>'https://lh3.googleusercontent.com/aida-public/AB6AXuBEYRHyo8fi8XuON9JeGiOQO7uvw0j-Al_A2t54Ci5t3-NJ5lXV4pyo-1K4iug8r8oCgN_Y_UrEjGT0meTJM7ER93_pWX3KdyFMYXV5uBimqvh-QBHtdYuBRDP2PxNMlNjlRENzSXLhmEARF-Kg_JDiEWlcO19Dyb2WlmYTs3NfqrUBsm6qrqRtv-mGoSC402X3pTxFyvzqw2jZKE8aPFtIRQvOEAAvywX1PAYXOH5R14EyQG_AQHHQKg','published_at'=>'2024-10-05','status'=>'published','sort_order'=>7],
            ['slug'=>'the-future-of-industrial-automation','title'=>'Listen: The Future of Industrial Automation','category'=>'PODCAST','excerpt'=>'Join our CEO in the latest episode of TechTalk Industrial.','content'=>'Full article content here.','image'=>null,'is_promo'=>true,'status'=>'published','sort_order'=>6],
        ];
        foreach ($articles as $article) News::updateOrCreate(['slug' => $article['slug']], $article);
    }
}
