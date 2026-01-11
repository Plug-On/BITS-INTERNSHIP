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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();

            // Company Info
            $table->string('name');
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->text('address')->nullable();
            $table->enum('status', ['Active', 'Inactive', 'Expired'])->default('Active');

            // Hosting Info
            $table->string('hosting')->nullable();
            $table->string('hosting_plan')->nullable();
            $table->string('hosting_company')->nullable();
            $table->date('hosting_plan_start')->nullable();
            $table->date('hosting_expiry')->nullable();
            $table->decimal('hosting_charge', 10, 2)->nullable();
            $table->decimal('hosting_renew_charge', 10, 2)->nullable();

            // Domain Info
            $table->string('domain')->nullable();
            $table->string('domain_company')->nullable();
            $table->date('domain_plan_start')->nullable();
            $table->date('domain_expiry')->nullable();
            $table->decimal('domain_charge', 10, 2)->nullable();
            $table->decimal('domain_renew_charge', 10, 2)->nullable();

            // Maintenance
            $table->decimal('maintenance_charge', 10, 2)->nullable();

            // Documents (store file paths)
            $table->string('registration_document')->nullable();
            $table->string('pan_document')->nullable();
            $table->string('letter')->nullable();
            $table->string('logo')->nullable();

            // Personal Contact
            $table->string('p_name')->nullable();
            $table->string('p_phone')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
