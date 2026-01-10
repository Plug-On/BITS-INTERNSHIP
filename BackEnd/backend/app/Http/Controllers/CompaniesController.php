<?php

namespace App\Http\Controllers;

use App\Models\Companies;
use Illuminate\Http\Request;

class CompaniesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $companies = Companies::Select(["id", "name", "hosting", "domain", "status", "phone"])->get();
        return  response()->json([$companies]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $company = Companies::create([
            'name' => $request->name,
            'email' => $request->email,
            'address' => $request->address,
            'phone' => $request->phone,
            'hosting' => $request->hosting,
            'hosting_plan' => $request->hosting_plan,
            'hosting_company' => $request->hosting_company,
            'hosting_plan_start' => $request->hosting_plan_start,
            'hosting expiry' => $request->hosting_expiry,
            'domain' => $request->domain,
            'domain_company' => $request->domain_company,
            'domain_plan_start' => $request->domain_plan_start,
            'domain_expiry' => $request->domain_expiry,
            'registration_document' => $request->registration_document,
            'pan_document' => $request->pan_document,
            'letter' => $request->letter,
            'logo' => $request->logo,
            'hosting_charge' => $request->hosting_charge,
            'domain_charge' => $request->domain_charge,
            'maintenance_charge' => $request->maintenance_charge,
            'hosting_renew_charge' => $request->hosting_renew_charge,
            'domain_renew_charge' => $request->domain_renew_charge,
            'status' => $request->status,
            'p_name' => $request->p_name,
            'p_phone' => $request->p_phone,
        ]);

        return response()->json([
            "id" => $company->id,
            "name" =>  $company->name,
            "email" =>  $company->email,
            "phone" =>  $company->phone,
            "status" =>  $company->status,
            "hosting" =>  $company->hosting,
            "domain" =>  $company->domain,
            "hosting_charge" =>  $company->hosting_charge,
            "domain_charge" =>  $company->domain_charge,
            "maintenance_charge" =>  $company->maintenance_charge,
            "hosting_renew_charge" =>  $company->hosting_renew_charge,
            "domain renew charge" =>  $company->domain_renew_charge,
            "p_name" =>  $company->p_name,
            "p_phone" =>  $company->p_phone,
            "address" =>  $company->address,
            "hosting_plan" =>  $company->hosting_plan,
            "hosting_company" =>  $company->hosting_company,
            "hosting_plan_start" =>  $company->hosting_plan_start,
            "hosting_expiry" =>  $company->hosting_expiry,
            "domain_company" =>  $company->domain_company,
            "domain_plan_start" =>  $company->domain_plan_start,
            "domain_expiry" =>  $company->domain_expiry,
            "registration_document" =>  $company->registration_document,
            "pan_document" =>  $company->pan_document,
            "letter" =>  $company->letter,
            "logo" =>  $company->logo,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $companies = Companies::find($id);
        $companies->name = $request->name;
        $companies->email = $request->email;
        $companies->address = $request->address;
        $companies->phone = $request->phone;
        $companies->hosting = $request->hosting;
        $companies->hosting_plan = $request->hosting_plan;
        $companies->hosting_company = $request->hosting_company;
        $companies->hosting_plan_start = $request->hosting_plan_start;
        $companies->hosting_expiry = $request->hosting_expiry;
        $companies->domain = $request->domain;
        $companies->domain_company = $request->domain_company;
        $companies->domain_plan_start = $request->domain_plan_start;
        $companies->domain_expiry = $request->domain_expiry;
        $companies->registration_document = $request->registration_document;
        $companies->pan_document = $request->pan_document;
        $companies->letter = $request->letter;
        $companies->logo = $request->logo;
        $companies->hosting_charge = $request->hosting_charge;
        $companies->domain_charge = $request->domain_charge;
        $companies->maintenance_charge = $request->maintenance_charge;
        $companies->hosting_renew_charge = $request->hosting_renew_charge;
        $companies->domain_renew_charge = $request->domain_renew_charge;
        $companies->status = $request->status;
        $companies->p_name = $request->p_name;
        $companies->p_phone = $request->p_phone;
        $companies->save();

        return response()->json([
            "id" => $companies->id,
            "name" =>  $companies->name,
            "email" =>  $companies->email,
            "phone" =>  $companies->phone,
            "status" =>  $companies->status,
            "hosting" =>  $companies->hosting,
            "domain" =>  $companies->domain,
            "hosting_charge" =>  $companies->hosting_charge,
            "domain_charge" =>  $companies->domain_charge,
            "maintenance_charge" =>  $companies->maintenance_charge,
            "hosting_renew_charge" =>  $companies->hosting_renew_charge,
            "domain_renew_charge" =>  $companies->domain_renew_charge,
            "p_name" =>  $companies->p_name,
            "p_phone" =>  $companies->p_phone,
            "address" =>  $companies->address,
            "hosting_plan" =>  $companies->hosting_plan,
            "hosting_company" =>  $companies->hosting_company,
            "hosting_plan start" =>  $companies->hosting_plan_start,
            "hosting_expiry" =>  $companies->hosting_expiry,
            "domain_company" =>  $companies->domain_company,
            "domain_plan_start" =>  $companies->domain_plan_start,
            "domain_expiry" =>  $companies->domain_expiry,
            "registration_document" =>  $companies->registration_document,
            "pan_document" =>  $companies->pan_document,
            "letter" =>  $companies->letter,
            "logo" =>  $companies->logo,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Companies::destroy($id);
        return response()->json(['message' => 'Company deleted successfully']);
    }
}
