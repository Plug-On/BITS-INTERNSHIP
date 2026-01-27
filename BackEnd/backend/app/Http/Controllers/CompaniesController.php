<?php

namespace App\Http\Controllers;

use App\Models\Companies;
use Illuminate\Http\Request;
use Carbon\Carbon;

class CompaniesController extends Controller
{
    /**
     * Display a listing of companies
     */
   public function index()
{
    $companies = Companies::select([
    "id",
    "name",
    "hosting",
    "hosting_plan",
    "hosting_company",
    "hosting_plan_start",
    "hosting_expiry",
    "domain",
    "domain_company",
    "domain_plan_start",
    "domain_expiry",
    "status",
    "p_phone",
    "p_name",
    "logo",
    "created_at",
    "updated_at",
])->get();


    // Optional: convert logo path to full URL for easier React usage
    $companies->transform(function ($company) {
        if ($company->logo) {
            $company->logo = url('storage/' . $company->logo);
        }

        $company->created_at = $company->created_at?->toIso8601String();
    $company->updated_at = $company->updated_at?->toIso8601String();
        return $company;
    });

    return response()->json($companies);
}


    /**
     * Store a newly created company
     */
    public function store(Request $request)
    {
        // Validation
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'hosting' => 'nullable|string|in:Single,Shared',
            'hosting_plan' => 'nullable|string|max:255',
            'hosting_company' => 'nullable|string|max:255',
            'hosting_plan_start' => 'nullable|date',
            'hosting_expiry' => 'nullable|date',
            'domain' => 'nullable|string|max:255',
            'domain_company' => 'nullable|string|max:255',
            'domain_plan_start' => 'nullable|date',
            'domain_expiry' => 'nullable|date',
            'hosting_charge' => 'nullable|numeric',
            'domain_charge' => 'nullable|numeric',
            'maintenance_charge' => 'nullable|numeric',
            'hosting_renew_charge' => 'nullable|numeric',
            'domain_renew_charge' => 'nullable|numeric',
            'status' => 'nullable|string|in:Active,Inactive',
            'p_name' => 'nullable|string|max:255',
            'p_phone' => 'nullable|string|max:20',
            'registration_document' => 'nullable|mimes:pdf,doc,docx|max:2048',
            'pan_document' => 'nullable|mimes:pdf,jpg,png|max:2048',
            'letter' => 'nullable|mimes:pdf,doc,docx|max:2048',
            'logo' => 'nullable|mimes:jpg,jpeg,png,svg|max:1024',
        ]);

        // Auto-calculate status
        $status = $request->filled('status')
                ? $request->status
                : (($request->hosting_expiry && Carbon::parse($request->hosting_expiry)->isPast())
                    ? 'Inactive'
                    : 'Active');


        // Handle file uploads
        $files = ['registration_document', 'pan_document', 'letter', 'logo'];
        foreach ($files as $file) {
            if ($request->hasFile($file)) {
                $request[$file] = $request->file($file)->store($file === 'logo' ? 'logos' : 'documents', 'public');
            }
        }

        $company = Companies::create(array_merge(
            $request->only([
                'name', 'email', 'address', 'phone',
                'hosting', 'hosting_plan', 'hosting_company',
                'hosting_plan_start', 'hosting_expiry',
                'domain', 'domain_company', 'domain_plan_start', 'domain_expiry',
                'hosting_charge', 'domain_charge', 'maintenance_charge',
                'hosting_renew_charge', 'domain_renew_charge',
                'p_name', 'p_phone'
            ]),
            [
                'status' => $status,
                'registration_document' => $request->registration_document ?? null,
                'pan_document' => $request->pan_document ?? null,
                'letter' => $request->letter ?? null,
                'logo' => $request->logo ?? null,
            ]
        ));

        return response()->json($company, 201);
    }

    /**
     * Update an existing company
     */
    public function update(Request $request, $id)
    {
        $company = Companies::findOrFail($id);

        // Validation (same as store)
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'hosting' => 'nullable|string|in:Single,Shared',
            'hosting_plan' => 'nullable|string|max:255',
            'hosting_company' => 'nullable|string|max:255',
            'hosting_plan_start' => 'nullable|date',
            'hosting_expiry' => 'nullable|date',
            'domain' => 'nullable|string|max:255',
            'domain_company' => 'nullable|string|max:255',
            'domain_plan_start' => 'nullable|date',
            'domain_expiry' => 'nullable|date',
            'hosting_charge' => 'nullable|numeric',
            'domain_charge' => 'nullable|numeric',
            'maintenance_charge' => 'nullable|numeric',
            'hosting_renew_charge' => 'nullable|numeric',
            'domain_renew_charge' => 'nullable|numeric',
            'status' => 'nullable|string|in:Active,Inactive',
            'p_name' => 'nullable|string|max:255',
            'p_phone' => 'nullable|string|max:20',
            'registration_document' => 'sometimes|mimes:pdf,doc,docx|max:2048',
            'pan_document' => 'sometimes|mimes:pdf,jpg,png|max:2048',
            'letter' => 'sometimes|mimes:pdf,doc,docx|max:2048',
            'logo' => 'sometimes|mimes:jpg,jpeg,png,svg|max:1024',
        ]);

        // Auto status
        $status = $request->filled('status')
            ? $request->status
            : (($request->hosting_expiry && Carbon::parse($request->hosting_expiry)->isPast())
                ? 'Inactive'
                : 'Active');


        // Handle files
        $files = ['registration_document', 'pan_document', 'letter', 'logo'];
        foreach ($files as $file) {
            if ($request->hasFile($file)) {
                $company->$file = $request->file($file)->store($file === 'logo' ? 'logos' : 'documents', 'public');
            }
        }

        $company->update(array_merge(
            $request->only([
                'name', 'email', 'address', 'phone',
                'hosting', 'hosting_plan', 'hosting_company',
                'hosting_plan_start', 'hosting_expiry',
                'domain', 'domain_company', 'domain_plan_start', 'domain_expiry',
                'hosting_charge', 'domain_charge', 'maintenance_charge',
                'hosting_renew_charge', 'domain_renew_charge',
                'p_name', 'p_phone'
            ]),
            ['status' => $status]
        ));

        return response()->json($company, 200);
    }

    public function destroy($id)
    {
        Companies::destroy($id);
        return response()->json(['message' => 'Company deleted successfully']);
    }

    public function show($id)
    {
        $company = Companies::findOrFail($id);
        return response()->json($company);
    }
}
