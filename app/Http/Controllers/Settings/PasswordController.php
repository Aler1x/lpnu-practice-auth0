<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Services\Auth0Service;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class PasswordController extends Controller
{
    protected $auth0Service;

    public function __construct(Auth0Service $auth0Service)
    {
        $this->auth0Service = $auth0Service;
    }
    
    /**
     * Show the user's password settings page.
     */
    public function edit(): Response
    {
        return Inertia::render('settings/Password');
    }

    /**
     * Update the user's password.
     */
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'current_password' => ['required'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        // Get authenticated user from Auth0
        $user = Auth::user();
        $auth0UserId = $user ? ($user->sub ?? null) : null;
        
        // Update password in Auth0
        if ($auth0UserId) {
            $result = $this->auth0Service->updateUserPassword($auth0UserId, $validated['password']);
            
            if ($result) {
                logger()->info('Auth0 user password updated', ['user_id' => $auth0UserId]);
            } else {
                logger()->error('Failed to update Auth0 user password', ['user_id' => $auth0UserId]);
            }
        } else {
            logger()->error('Auth0 user ID (sub) not found for password update', ['user' => $user]);
        }

        return back();
    }
}
