<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;


class ProductController extends Controller
{
    public function index()
    {
        // Eager load the relationship we just defined in the Model
        $products = Product::with('product_images')->orderBy('created_at', 'desc')->get();

        return response()->json([
            'status' => 200,
            'data' => $products
        ], 200);
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id', // Matches your JSON key
            'brand_id' => 'required|exists:brands,id',       // Matches your JSON key
            'type' => 'required|in:car,bike',
            'price' => 'required|numeric',
            'model_year' => 'required|numeric',
            'kilometers_run' => 'required|integer',
            'engine_capacity' => 'required',
            'status' => 'required',
            'images.*' => 'image|mimes:jpeg,png,jpg,webp|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        // 1. Save Product Data
        $product = new Product();
        $product->title = $request->title;
        $product->slug = Str::slug($request->title) . '-' . time();

        // FIX: Mapping the keys correctly from your Request body
        $product->category_id = $request->category_id;
        $product->brand_id = $request->brand_id;

        $product->type = $request->type;
        $product->model_year = $request->model_year;
        $product->variant = $request->variant;
        $product->color = $request->color;
        $product->engine_number = $request->engine_number;
        $product->chassis_number = $request->chassis_number;
        $product->kilometers_run = $request->kilometers_run;
        $product->mileage = $request->mileage;
        $product->engine_capacity = $request->engine_capacity;
        $product->fuel_type = $request->fuel_type;
        $product->transmission = $request->transmission;
        $product->condition = $request->condition;
        $product->price = $request->price;
        $product->discount_price = $request->discount_price;
        $product->description = $request->description;
        $product->is_featured = $request->is_featured ?? 'no';
        $product->status = $request->status;
        $product->registration_number = $request->registration_number;
        $product->ownership_number = $request->ownership_number;
        $product->tax_token_expiry = $request->tax_token_expiry;
        $product->save();

        // 2. Handle Multiple Image Uploads
        if (!empty($request->gallery)) {
            foreach ($request->gallery as $key => $tempImageId) {
                $tempImage = TempImage::find($tempImageId);

                $extArray = explode('.', $tempImage->name);
                $ext = end($extArray);
                $imageName = $product->id . '-' . time() . '.' . $ext;
                $manager = new ImageManager(Driver::class);
                $img = $manager->read(public_path('uploads/temp/' . $tempImage->name));
                $img->scaleDown(1200);
                $img->save(public_path('uploads/products/large/' . $imageName));

                $manager = new ImageManager(Driver::class);
                $img = $manager->read(public_path('uploads/temp/' . $tempImage->name));
                $img->coverDown(400, 460);
                $img->save(public_path('uploads/products/small/' . $imageName));

                $productImage = new ProductImage();
                $productImage->product_id = $product->id;
                $productImage->name = $imageName;
                $productImage->save();

                if ($key == 0) {
                    $product->image = $imageName;
                    $product->save();
                }
            }
        }

        return response()->json([
            'status' => 200,
            'data' => $product
        ], 200);
    }

    public function show($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found'
            ], 404);
        }
        return response()->json([
            'status' => 200,
            'data' => $product
        ]);
    }

    public function update($id, Request $request)
    {
        $product = Product::find($id);

        if (empty($product)) {
            return response()->json([
                'status' => 404,
                'message' => 'Vehicle not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'required|exists:brands,id',
            'type' => 'required|in:car,bike',
            'price' => 'required|numeric',
            'model_year' => 'required|numeric',
            'kilometers_run' => 'required|integer',
            'engine_capacity' => 'required',
            'status' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        // 1. Update Product Data
        $product->title = $request->title;
        // Optional: Only update slug if title changes to keep SEO stable
        $product->slug = Str::slug($request->title) . '-' . time();

        $product->category_id = $request->category_id;
        $product->brand_id = $request->brand_id;
        $product->type = $request->type;
        $product->model_year = $request->model_year;
        $product->variant = $request->variant;
        $product->color = $request->color;
        $product->engine_number = $request->engine_number;
        $product->chassis_number = $request->chassis_number;
        $product->kilometers_run = $request->kilometers_run;
        $product->mileage = $request->mileage;
        $product->engine_capacity = $request->engine_capacity;
        $product->fuel_type = $request->fuel_type;
        $product->transmission = $request->transmission;
        $product->condition = $request->condition;
        $product->price = $request->price;
        $product->discount_price = $request->discount_price;
        $product->description = $request->description;
        $product->is_featured = $request->is_featured ?? 'no';
        $product->status = $request->status;
        $product->registration_number = $request->registration_number;
        $product->ownership_number = $request->ownership_number;
        $product->tax_token_expiry = $request->tax_token_expiry;
        $product->save();

        // 2. Handle New Image Uploads (Gallery)
        if (!empty($request->gallery)) {
            foreach ($request->gallery as $key => $tempImageId) {
                $tempImage = TempImage::find($tempImageId);

                if ($tempImage) {
                    $extArray = explode('.', $tempImage->name);
                    $ext = end($extArray);
                    $imageName = $product->id . '-' . time() . '-' . uniqid() . '.' . $ext;

                    // Save Large Image
                    $manager = new ImageManager(Driver::class);
                    $img = $manager->read(public_path('uploads/temp/' . $tempImage->name));
                    $img->scaleDown(1200);
                    $img->save(public_path('uploads/products/large/' . $imageName));

                    // Save Small Thumbnail
                    $img = $manager->read(public_path('uploads/temp/' . $tempImage->name));
                    $img->coverDown(400, 460);
                    $img->save(public_path('uploads/products/small/' . $imageName));

                    // Save to ProductImage Table (Assuming you have this relationship)
                    $productImage = new ProductImage();
                    $productImage->product_id = $product->id;
                    $productImage->name = $imageName;
                    $productImage->save();

                    // If this is the first image being added in this batch,
                    // you might want to update the main product image field
                    if ($key == 0) {
                        $product->image = $imageName;
                        $product->save();
                    }
                }
            }
        }

        return response()->json([
            'status' => 200,
            'message' => 'Vehicle updated successfully',
            'data' => $product
        ], 200);
    }

    public function destroy($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found'
            ], 404);
        }
        $product->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Vehicle deleted successfully'
        ]);
    }
}
