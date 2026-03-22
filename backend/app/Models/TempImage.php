<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TempImage extends Model
{
    // Ensure 'name' is fillable so it can be saved in the first place
    protected $fillable = ['name'];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        if (empty($this->name)) {
            return "";
        }
        // Make sure this folder actually matches where you store the file
        return asset('/uploads/temp/thumb/' . $this->name);
    }
}
