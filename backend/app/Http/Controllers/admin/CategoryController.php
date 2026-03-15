<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class CategoryController extends Controller
{
    //  this method will return all categories
    public function index(){
        $categories = Category::orderBy('created_at','desc')->get();
        return response()->json([
            'status' => 200,
            'data'=>$categories
        ]);
    }
    //   this method will store a category in db
    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }
        $category = new Category();
        $category->name = $request->name;
        $category->status = $request->status;
        $category->save();
        return response()->json([
            'status' => 200,
            'data'=>$category,
            'message'=>'Category Created Successfully',

        ], 200);
    }


    //   this method will return single category
    public function show(){
        return view('admin.category.create');
    }
    //   this method will update single category
    public function update(){
        return view('admin.category.create');
    }
    //   this method will delete single category
    public function destroy(){
        return view('admin.category.create');
    }
}
