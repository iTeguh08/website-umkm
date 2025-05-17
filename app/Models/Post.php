<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Tag;
use App\Models\User;

class Post extends Model
{
    protected $fillable = [
        'title',
        'description',
        'photo',
        'sticky',
        'published',
        'featured',
    ];

    protected $casts = [
        'sticky' => 'boolean',
        'published' => 'boolean',
        'featured' => 'boolean',
    ];

    /**
     * Get the tags associated with the post.
     */
    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    /**
     * Get the user that created the post.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopeSticky($query)
    {
        return $query->where('sticky', true);
    }

    public function scopePublished($query)
    {
        return $query->where('published', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }

    public function isSticky()
    {
        return (bool) $this->sticky;
    }

    public function isPublished()
    {
        return (bool) $this->published;
    }

    public function isFeatured()
    {
        return (bool) $this->featured;
    }
}
