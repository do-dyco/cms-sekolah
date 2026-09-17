<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'slug', 'name', 'sku', 'category', 'badge', 'image', 'description',
        'content', 'specs', 'thumbnails', 'resources', 'status', 'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'specs' => 'array',
            'thumbnails' => 'array',
            'resources' => 'array',
            'sort_order' => 'integer',
        ];
    }
}
