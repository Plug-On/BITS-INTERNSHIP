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
        $users=User::select(["id", "name","email","role"])->get();
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
        "password" => bcrypt($request->password),
        "role" => $request->role ?? 'customer'
    ]);

    return response()->json([
        "id" =>$user->id,
        "name" => $user->name,
        "email" => $user->email,
        "role" => $user->role
    ]);
}


    /**
     * Display the specified resource.
     */
        public function show(string $id)
{
    $user = User::select('id','name','email','role')->findOrFail($id);

    return response()->json($user);
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
    $user->role = $request->role ?? $user->role;

    if ($request->filled('role')) {
        $user->role = $request->role;
    }

    if ($request->filled('password')) {
        $user->password = bcrypt($request->password);
    }

    $user->save();

    return response()->json([
        "id" => $user->id,
        "name" => $user->name,
        "email" => $user->email,
        "role" => $user->role
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
