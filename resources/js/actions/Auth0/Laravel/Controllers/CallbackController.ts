import { queryParams, type QueryParams } from './../../../../wayfinder'

/**
 * @see \Auth0\Laravel\Controllers\CallbackController::CallbackController
 * @see vendor/auth0/login/src/Controllers/CallbackController.php:33
 * @route /auth0/callback
 */
const CallbackController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: CallbackController.url(options),
    method: 'get',
})

CallbackController.definition = {
    methods: ['get','head'],
    url: '\/auth0\/callback',
}

/**
 * @see \Auth0\Laravel\Controllers\CallbackController::CallbackController
 * @see vendor/auth0/login/src/Controllers/CallbackController.php:33
 * @route /auth0/callback
 */
CallbackController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return CallbackController.definition.url + queryParams(options)
}

/**
 * @see \Auth0\Laravel\Controllers\CallbackController::CallbackController
 * @see vendor/auth0/login/src/Controllers/CallbackController.php:33
 * @route /auth0/callback
 */
CallbackController.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: CallbackController.url(options),
    method: 'get',
})

/**
 * @see \Auth0\Laravel\Controllers\CallbackController::CallbackController
 * @see vendor/auth0/login/src/Controllers/CallbackController.php:33
 * @route /auth0/callback
 */
CallbackController.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: CallbackController.url(options),
    method: 'head',
})

export default CallbackController