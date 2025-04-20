import { queryParams, type QueryParams } from './../wayfinder'

/**
 * @see \Auth0\Laravel\Controllers\LogoutController::logout
 * @see vendor/auth0/login/src/Controllers/LogoutController.php:29
 * @route /logout
 */
export const logout = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: logout.url(options),
    method: 'get',
})

logout.definition = {
    methods: ['get','head'],
    url: '\/logout',
}

/**
 * @see \Auth0\Laravel\Controllers\LogoutController::logout
 * @see vendor/auth0/login/src/Controllers/LogoutController.php:29
 * @route /logout
 */
logout.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return logout.definition.url + queryParams(options)
}

/**
 * @see \Auth0\Laravel\Controllers\LogoutController::logout
 * @see vendor/auth0/login/src/Controllers/LogoutController.php:29
 * @route /logout
 */
logout.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: logout.url(options),
    method: 'get',
})

/**
 * @see \Auth0\Laravel\Controllers\LogoutController::logout
 * @see vendor/auth0/login/src/Controllers/LogoutController.php:29
 * @route /logout
 */
logout.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: logout.url(options),
    method: 'head',
})

export default logout