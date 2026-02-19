<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;

class TodoController extends Controller
{
    // List all todos
    public function index()
    {
        return response()->json(Todo::orderBy('id', 'desc')->get());
    }

    // Store new todo
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:low,medium,high',
            'status' => 'required|in:pending,in_progress,completed',
            'due_date' => 'nullable|date',
        ]);

        $todo = Todo::create($request->all());

        return response()->json($todo, 201);
    }

    // Show single todo
    public function show(Todo $todo)
    {
        return response()->json($todo);
    }

    // Update todo
    public function update(Request $request, Todo $todo)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'nullable|in:high,medium,low',
            'status' => 'nullable|in:pending,in_progress,completed',
            'due_date' => 'nullable|date',
        ]);

        $todo->update($request->all());

        return response()->json($todo);
    }

    // Delete todo
    public function destroy(Todo $todo)
    {
        $todo->delete();
        return response()->json(['message' => 'Todo deleted successfully']);
    }
}
