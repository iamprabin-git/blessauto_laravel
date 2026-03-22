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
use Illuminate\Support\Facades\File;



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
            // Required Fields (Database level NOT NULL)
            'title'           => 'required|string|max:255',
            'category_id'     => 'required|exists:categories,id',
            'brand_id'        => 'required|exists:brands,id',
            'price'           => 'required|numeric|min:0',
            'model_year'      => 'required|numeric|digits:4',
            'kilometers_run'  => 'required|integer|min:0',
            'engine_capacity' => 'required|string',

            // Enum Validations (Matches Migration Options)
            'type'            => 'required|in:car,bike',
            'fuel_type'       => 'required|in:Petrol,Diesel,Electric,Hybrid,CNG',
            'transmission'    => 'required|in:Manual,Automatic,Semi-Auto',
            'condition'       => 'required|in:Brand New,Excellent,Good,Fair',

            // Optional / Nullable Fields
            'variant'             => 'nullable|string|max:255',
            'color'               => 'nullable|string|max:100',
            'engine_number'       => 'nullable|string',
            'chassis_number'      => 'nullable|string',
            'mileage'             => 'nullable|string',
            'discount_price'      => 'nullable|numeric|lt:price', // Must be less than price
            'description'         => 'nullable|string',
            'is_featured'         => 'nullable|in:yes,no',
            'status'              => 'required|integer',
            'registration_number' => 'nullable|string',
            'ownership_number'    => 'nullable|integer|min:1',
            'tax_token_expiry'    => 'nullable|date',

            // Gallery Validation
            'gallery'             => 'nullable|array',
            'gallery.*'           => 'exists:temp_images,id'
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
                $productImage->image = $imageName;
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
        $product = Product::with('product_images')
            ->find($id);
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

   public function saveProductImages(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 400, 'errors' => $validator->errors()], 400);
        }

        // 1. Save Temp Image Record
        $tempImage = new TempImage();
        $tempImage->name = 'temp_placeholder';
        $tempImage->save();

        // 2. Process File
        $image = $request->file('image');
        $extension = $image->getClientOriginalExtension();
        $imageName = $tempImage->id . '-' . time() . '.' . $extension;

        // Move to temp folder
        $image->move(public_path('uploads/temp'), $imageName);

        // 3. Create Thumbnail for React Preview
        $manager = new ImageManager(Driver::class);
        $img = $manager->read(public_path('uploads/temp/' . $imageName));
        $img->coverDown(400, 450);
        $img->save(public_path('uploads/temp/thumb/' . $imageName));

        // 4. Update Database with real name
        $tempImage->name = $imageName;
        $tempImage->save();

        return response()->json([
            'status' => 200,
            'message' => 'Image uploaded to temp storage',
            'data' => [
                'id' => $tempImage->id,
                'image_url' => asset('uploads/temp/thumb/' . $imageName)
            ]
        ], 200);
    }

    /**
     * Finalize the product update including moving temp images to gallery
     * Route: PUT /products/{id}
     */
    public function update($id, Request $request)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['status' => 404, 'message' => 'Vehicle not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'required|exists:brands,id',
            'price' => 'required|numeric',
            'status' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 400, 'errors' => $validator->errors()], 400);
        }

        // Save text data via helper
        $this->saveProductData($product, $request);
        $product->save();

        // Handle Image Gallery (Moves temp images to permanent product folders)
        if (!empty($request->gallery)) {
            $this->processGallery($product, $request->gallery);
        }

        return response()->json([
            'status' => 200,
            'message' => 'Vehicle updated successfully',
            'data' => $product->load('product_images')
        ], 200);
    }

    private function saveProductData($product, $request)
    {
        $product->title = $request->title;
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
    }

    private function processGallery($product, $gallery)
    {
        foreach ($gallery as $tempImageId) {
            $tempImage = TempImage::find($tempImageId);
            if (!$tempImage) continue;

            $sourcePath = public_path('uploads/temp/' . $tempImage->name);
            if (!File::exists($sourcePath)) continue;

            $ext = pathinfo($tempImage->name, PATHINFO_EXTENSION);
            $imageName = $product->id . '-' . time() . '-' . uniqid() . '.' . $ext;

            $manager = new ImageManager(Driver::class);

            // Save Large
            $imgLarge = $manager->read($sourcePath);
            $imgLarge->scaleDown(1200);
            $imgLarge->save(public_path('uploads/products/large/' . $imageName));

            // Save Small
            $imgSmall = $manager->read($sourcePath);
            $imgSmall->coverDown(400, 460);
            $imgSmall->save(public_path('uploads/products/small/' . $imageName));

            // Record in DB
            $productImage = new ProductImage();
            $productImage->product_id = $product->id;
            $productImage->image = $imageName;
            $productImage->save();

            // Set main image if product has none
            if (empty($product->image)) {
                $product->image = $imageName;
                $product->save();
            }

            // Cleanup
            File::delete($sourcePath);
            File::delete(public_path('uploads/temp/thumb/' . $tempImage->name));
            $tempImage->delete();
        }
    }
    public function updateDefaultImage(Request $request)
    {
        $product=Product::find($request->product_id);
        $product->image=$request->image;
        $product->save();
        return response()->json([
            'status' => 200,
            'message' => 'Product Image changed successfully',

        ], 200);
    }

    public function destroy($id)
    {
        $productImage = ProductImage::find($id);
        if (!$productImage) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found'
            ], 404);
        }

        File::delete(public_path('uploads/products/large/' . $productImage->image));
        File::delete(public_path('uploads/products/small/' . $productImage->image));

        $productImage->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Vehicle deleted successfully'
        ]);
    }
}
