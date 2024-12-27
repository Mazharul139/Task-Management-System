<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class TaskController extends Controller
{
    use AuthorizesRequests;
    public function index(Request $request)
{
    return Task::where('user_id', $request->user()->id)
        ->when($request->status, fn($query) => $query->where('status', $request->status))
        ->orderBy('due_date')
        ->get();
}

public function store(Request $request)
{
    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'status' => 'in:Pending,In Progress,Completed',
        'due_date' => 'required|date',
    ]);

    return Task::create(array_merge($validated, ['user_id' => $request->user()->id]));
}

public function show(Task $task)
{
    $this->authorize('view', $task);

    return $task;
}

public function update(Request $request, Task $task)
{
    $this->authorize('update', $task);

    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'status' => 'in:Pending,In Progress,Completed',
        'due_date' => 'required|date',
    ]);

    $task->update($validated);

    return $task;
}

public function destroy(Task $task)
{
    $this->authorize('delete', $task);

    $task->delete();

    return response()->noContent();
}

}
