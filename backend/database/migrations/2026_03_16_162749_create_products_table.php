<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            // Core Links
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->foreignId('brand_id')->constrained()->onDelete('cascade');

            // Identity
            $table->string('title');
            $table->string('slug')->unique();
            $table->enum('type', ['car', 'bike'])->default('bike');
            $table->string('model_year');
            $table->string('variant')->nullable();
            $table->string('color')->nullable();
             $table->string('engine_number')->nullable();     // For legal/registration checks
            $table->string('chassis_number')->nullable();    // For legal/registration checks
            $table->integer('kilometers_run');               // Standard mileage


            // Technical Specs
            $table->string('mileage')->nullable();
            $table->string('engine_capacity'); // e.g., 150cc or 1.2L
            $table->enum('fuel_type', ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG']);
            $table->enum('transmission', ['Manual', 'Automatic', 'Semi-Auto']);
            $table->enum('condition', ['Brand New', 'Excellent', 'Good', 'Fair']);

            // Pricing and Status
            $table->decimal('price', 15, 2);
            $table->decimal('discount_price', 15, 2)->nullable();
            $table->text('description')->nullable();
            $table->enum('is_featured', ['no', 'yes'])->default('no');
            $table->integer('status')->default(1);
            // Ownership & Docs
            $table->string('registration_number')->nullable();
            $table->integer('ownership_number')->default(1); // 1st owner, 2nd owner, etc.
            $table->date('tax_token_expiry')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
