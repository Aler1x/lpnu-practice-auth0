import { queryParams, type QueryParams } from './../wayfinder'

/**
 * @see \Auth0\Laravel\Controllers\CallbackController::callback
 * @see vendor/auth0/login/src/Controllers/CallbackController.php:33
 * @route /auth0/callback
 */
export const callback = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: callback.url(options),
    method: 'get',
})

callback.definition = {
    methods: ['get','head'],
    url: '\/auth0\/callback',
}

/**
 * @see \Auth0\Laravel\Controllers\CallbackController::callback
 * @see vendor/auth0/login/src/Controllers/CallbackController.php:33
 * @route /auth0/callback
 */
callback.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return callback.definition.url + queryParams(options)
}

/**
 * @see \Auth0\Laravel\Controllers\CallbackController::callback
 * @see vendor/auth0/login/src/Controllers/CallbackController.php:33
 * @route /auth0/callback
 */
callback.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: callback.url(options),
    method: 'get',
})

/**
 * @see \Auth0\Laravel\Controllers\CallbackController::callback
 * @see vendor/auth0/login/src/Controllers/CallbackController.php:33
 * @route /auth0/callback
 */
callback.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: callback.url(options),
    method: 'head',
})

export default callback