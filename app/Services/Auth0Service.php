<?php

namespace App\Services;

use Auth0\Laravel\Facade\Auth0;

class Auth0Service
{
    /**
     * Update user profile in Auth0
     */
    public function updateUserProfile(string $userId, array $data)
    {

        try {
            if (strpos($userId, 'auth0|') === false) {
                $userId = 'auth0|' . $userId;
            }
            Auth0::management()->users()->update(urlencode($userId), $data);

            return true;
        } catch (\Exception $e) {
            logger()->error('Exception when updating Auth0 user profile', [
                'error' => $e->getMessage(),
                'userId' => $userId,
                'trace' => $e->getTraceAsString(),
            ]);
            return false;
        }
    }

    /**
     * Update user password in Auth0
     */
    public function updateUserPassword(string $userId, string $password)
    {
        try {
            if (strpos($userId, 'auth0|') === false) {
                $userId = 'auth0|' . $userId;
            }
            Auth0::management()->users()->update(urlencode($userId), [
                'password' => $password,
            ]);

            return true;
        } catch (\Exception $e) {
            logger()->error('Exception when updating Auth0 user password', [
                'error' => $e->getMessage(),
                'userId' => $userId,
                'trace' => $e->getTraceAsString(),
            ]);
            return false;
        }
    }

    /**
     * Delete a user in Auth0
     */
    public function deleteUser(string $userId)
    {
        try {
            if (strpos($userId, 'auth0|') === false) {
                $userId = 'auth0|' . $userId;
            }

            Auth0::management()->users()->delete(urlencode($userId));

            return true;
        } catch (\Exception $e) {
            logger()->error('Exception when deleting Auth0 user', [
                'error' => $e->getMessage(),
                'userId' => $userId,
                'trace' => $e->getTraceAsString(),
            ]);
            return false;
        }
    }
}
