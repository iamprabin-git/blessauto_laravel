<?php

namespace App\Models;

use App\Models\ProductImage;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    // --- ADD THIS SECTION ---
    protected $fillable = [
        'title',
        'slug',
        'category_id',
        'brand_id',
        'type',
        'model_year',
        'variant',
        'color',
        'engine_number',
        'chassis_number',
        'kilometers_run',
        'mileage',
        'engine_capacity',
        'fuel_type',
        'transmission',
        'condition',
        'price',
        'discount_price',
        'description',
        'is_featured',
        'status',
        'registration_number',
        'ownership_number',
        'tax_token_expiry',
        'image' // Add this!
    ];
    // ------------------------

    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        if ($this->image == "") {
            return "";
        }
        return asset('uploads/products/small/' . $this->image);
    }

    public function product_images(): HasMany
    {
        return $this->hasMany(ProductImage::class);
    }
}
