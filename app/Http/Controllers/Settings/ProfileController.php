<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use App\Services\Auth0Service;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    protected $auth0Service;

    public function __construct(Auth0Service $auth0Service)
    {
        $this->auth0Service = $auth0Service;
    }

    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('settings/Profile', [
            'mustVerifyEmail' => false,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        
        // Get authenticated user from Auth0
        $user = Auth::user();
        $auth0UserId = $user ? ($user->sub ?? null) : null;
        
        if ($auth0UserId) {
            $auth0Data = [
                'name' => $validated['name'],
                'email' => $validated['email'],
            ];
            
            $this->auth0Service->updateUserProfile($auth0UserId, $auth0Data);
            
            // Log success
            logger()->info('Auth0 user profile updated', [
                'user_id' => $auth0UserId,
                'name' => $validated['name'],
                'email' => $validated['email']
            ]);
        } else {
            logger()->error('Auth0 user ID (sub) not found', ['user' => $user]);
        }

        return to_route('profile.edit');
    }

    /**
     * Delete the user's profile.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required'],
        ]);

        // Get authenticated user from Auth0
        $user = Auth::user();
        $auth0UserId = $user ? ($user->sub ?? null) : null;

        // Delete Auth0 user if ID exists
        if ($auth0UserId) {
            $this->auth0Service->deleteUser($auth0UserId);
            logger()->info('Auth0 user deleted', ['user_id' => $auth0UserId]);
        } else {
            logger()->error('Auth0 user ID (sub) not found during deletion', ['user' => $user]);
        }

        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
