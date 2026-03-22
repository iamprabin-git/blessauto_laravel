<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model
{
    // Updated to match your specific field names
    protected $fillable = ['product_id', 'image', 'is_main'];

    // This makes the image_url available in your React JSON response automatically
    protected $appends = ['image_url'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Accessor to get the full URL for the gallery image
     */
    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return "";
        }
        // Usually, the gallery shows the 'large' version
        return asset('uploads/products/small/' . $this->image);
    }
}
