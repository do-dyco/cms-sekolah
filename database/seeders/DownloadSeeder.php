<?php

namespace Database\Seeders;

use App\Models\Download;
use Illuminate\Database\Seeder;

class DownloadSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            ['title'=>'Efoxpro Quantum Series Controller Driver','type'=>'Driver','category'=>'Drivers','version'=>'v2.4.1','file_size'=>'45 MB','badge'=>'Latest','status'=>'published','sort_order'=>1],
            ['title'=>'Quantum Series Installation Guide','type'=>'Manual','category'=>'Manuals','language'=>'EN/DE/FR','file_size'=>'12 MB','status'=>'published','sort_order'=>2],
            ['title'=>'Efoxpro X-700 Specifications','type'=>'Datasheet','category'=>'Datasheets','language'=>'EN','file_size'=>'2.5 MB','status'=>'published','sort_order'=>3],
            ['title'=>'EFX-9000 Edge Router Firmware','type'=>'Software','category'=>'Software','version'=>'v2.1.4','file_size'=>'45 MB','badge'=>'Latest','status'=>'published','sort_order'=>4],
        ];
        foreach ($items as $item) Download::updateOrCreate(['title' => $item['title']], $item);
    }
}
