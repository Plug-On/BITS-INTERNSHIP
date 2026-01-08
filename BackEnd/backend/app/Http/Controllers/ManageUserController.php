<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class ManageUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users=User::select(["id", "name","email"])->get();
        return response()->json($users);
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
    $user = User::create([
        "name" => $request->name,
        "email" => $request->email,
        "password" => bcrypt($request->password)
    ]);

    return response()->json([
        "name" => $user->name,
        "email" => $user->email,
    ]);
}


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $users =User::find($id);
        return response()->json([ "name"=>$users->name, "email"=>$users->email, "password"=>$users->password]);

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
    $user = User::findOrFail($id);

    $user->name = $request->name;
    $user->email = $request->email;

    // Only update password if provided
    if ($request->filled('password')) {
        $user->password = bcrypt($request->password);
    }

    $user->save();

    return response()->json([
        "name" => $user->name,
        "email" => $user->email,
    ]);
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        User::destroy($id);
        return response()->json(["User Deleted Successfully."]);
    }
}
