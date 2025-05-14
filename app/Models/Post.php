<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Tag;

class Post extends Model
{
    protected $fillable = [
        'title',
        'description',
        'photo',
    ];

    /**
     * Get the tags associated with the post.
     */
    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }
}
