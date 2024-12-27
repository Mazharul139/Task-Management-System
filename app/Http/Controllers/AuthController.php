<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Register a new user.
     */
    public function register(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users|max:255',
            'password' => 'required|string|confirmed|min:8',
        ]);

        // Create the new user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password), // Hash the password
        ]);
        $token = $user->createToken('task_management_token')->plainTextToken;


        // Return a success response
        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
            'token' => $token,

        ], 201); // HTTP status code 201 = Created
    }

    /**
     * Log in an existing user.
     */
    public function login(Request $request)
    {
        // Validate the login credentials
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        // Attempt to authenticate the user
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid credentials'], 401); // Unauthorized
        }

        // Generate an API token for the user
        
        $user = Auth::user();
        if($user instanceof \App\Models\User){
        $token = $user->createToken('task_management_token')->plainTextToken;

        return response()->json([
            'message' => 'User logged in successfully',
            'user' => $user,
            'token' => $token,
        ]);
    }

    else{
        
        return response()->json([
            'message' => 'Invalid credentials or authentication failed',
        ], 401);
    }
    
    }

    /**
     * Log out the authenticated user.
     */
    public function logout(Request $request)
    {
        // Revoke the user's current token
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'User logged out successfully']);
    }
}
