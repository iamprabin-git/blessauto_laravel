<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{

    public function getProducts(Request $request){
        $products = Product::orderBy('created_at', 'desc')
        ->where('status', 1);

        if(!empty($request->category)){
            $catArray = explode(',', $request->category);
            $products = $products->whereIn('category_id', $catArray);
        }

        if(!empty($request->brand)){
            $brandArray = explode(',', $request->brand);
            $products = $products->whereIn('category_id', $brandArray);
        }

        $products= $products->get();
        return response()->json([
            'status' => 200,
            'data' => $products
        ], 200);
    }
    public function latestProducts()
    {
        $products = Product::orderBy('created_at', 'desc')
            ->where('status', 1)
            ->limit(4)
            ->get();

        return response()->json([
            'status' => 200,
            'data' => $products
        ], 200);
    }

    public function featuredProducts()
    {
        $products = Product::orderBy('created_at', 'desc')
            ->where('status', 1)
            ->where('is_featured', 'yes')
            ->limit(4)
            ->get();

        return response()->json([
            'status' => 200,
            'data' => $products
        ], 200);
    }

    public function getCategories(){
        $categories = Category::orderBy('name', 'asc')
        ->where('status', 1)
        ->get();
        return response()->json([
            'status' => 200,
            'data' => $categories
        ], 200);
    }

    public function getBrands(){
        $brands = Brand::orderBy('name', 'asc')
        ->where('status', 1)
        ->get();
        return response()->json([
            'status' => 200,
            'data' => $brands
        ], 200);
    }
}
