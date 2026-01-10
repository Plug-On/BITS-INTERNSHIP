
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
            $table->string('name');
            $table->string('email')->unique();
            $table->string('address')->nullable();
            $table->string('phone')->nullable();
            $table->enum('hosting', ['shared', 'single'])->nullable();
            $table->string('hosting_plan')->nullable();
            $table->string('hosting_company')->nullable();
            $table->string('hosting_plan_start')->nullable();
            $table->string('hosting_expiry')->nullable();
            $table->string('domain')->nullable();
            $table->string('domain_company')->nullable();
            $table->string('domain_plan_start')->nullable();
            $table->string('domain_expiry')->nullable();
            $table->string('registration_document')->nullable();
            $table->string('pan_document')->nullable();
            $table->string('letter')->nullable();
            $table->string('logo')->nullable();
            $table->double('hosting_charge')->nullable();
            $table->double('domain_charge')->nullable();
            $table->double( 'maintenance_charge')->nullable();
            $table->double('hosting_renew_charge')->nullable();
            $table->double('domain_renew_charge')->nullable();
            $table->enum('status', ['active' , 'inactive'])->default('active');
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
