import { queryParams, type QueryParams } from './../../../../wayfinder'

/**
 * @see \Auth0\Laravel\Controllers\LogoutController::LogoutController
 * @see vendor/auth0/login/src/Controllers/LogoutController.php:29
 * @route /logout
 */
const LogoutController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: LogoutController.url(options),
    method: 'get',
})

LogoutController.definition = {
    methods: ['get','head'],
    url: '\/logout',
}

/**
 * @see \Auth0\Laravel\Controllers\LogoutController::LogoutController
 * @see vendor/auth0/login/src/Controllers/LogoutController.php:29
 * @route /logout
 */
LogoutController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return LogoutController.definition.url + queryParams(options)
}

/**
 * @see \Auth0\Laravel\Controllers\LogoutController::LogoutController
 * @see vendor/auth0/login/src/Controllers/LogoutController.php:29
 * @route /logout
 */
LogoutController.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: LogoutController.url(options),
    method: 'get',
})

/**
 * @see \Auth0\Laravel\Controllers\LogoutController::LogoutController
 * @see vendor/auth0/login/src/Controllers/LogoutController.php:29
 * @route /logout
 */
LogoutController.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: LogoutController.url(options),
    method: 'head',
})

export default LogoutController