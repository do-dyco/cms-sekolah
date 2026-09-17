<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    protected $table = 'news';

    protected $fillable = [
        'slug', 'title', 'category', 'excerpt', 'content', 'image',
        'published_at', 'is_featured', 'is_promo', 'status', 'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'published_at' => 'date',
            'is_featured' => 'boolean',
            'is_promo' => 'boolean',
            'sort_order' => 'integer',
        ];
    }
}
