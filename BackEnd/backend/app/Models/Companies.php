<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Companies extends Model
{
    // protected $table = 'companies';

    protected $fillable = [
        'name',
        'email',
        'address',
        'phone',
        'hosting',
        'hosting_plan',
        'hosting_company',
        'hosting_plan_start',
        'hosting_expiry',
        'domain',
        'domain_company',
        'domain_plan_start',
        'domain_expiry',
        'registration_document',
        'pan_document',
        'letter',
        'logo',
        'hosting_charge',
        'domain_charge',
        'maintenance_charge',
        'hosting_renew_charge',
        'domain_renew_charge',
        'status',
        'p_name',
        'p_phone',
    ];
}
