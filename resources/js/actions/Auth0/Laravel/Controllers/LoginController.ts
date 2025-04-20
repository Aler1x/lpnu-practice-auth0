import { queryParams, type QueryParams } from './../../../../wayfinder'

/**
 * @see \Auth0\Laravel\Controllers\LoginController::LoginController
 * @see vendor/auth0/login/src/Controllers/LoginController.php:30
 * @route /login
 */
const LoginController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: LoginController.url(options),
    method: 'get',
})

LoginController.definition = {
    methods: ['get','head'],
    url: '\/login',
}

/**
 * @see \Auth0\Laravel\Controllers\LoginController::LoginController
 * @see vendor/auth0/login/src/Controllers/LoginController.php:30
 * @route /login
 */
LoginController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return LoginController.definition.url + queryParams(options)
}

/**
 * @see \Auth0\Laravel\Controllers\LoginController::LoginController
 * @see vendor/auth0/login/src/Controllers/LoginController.php:30
 * @route /login
 */
LoginController.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: LoginController.url(options),
    method: 'get',
})

/**
 * @see \Auth0\Laravel\Controllers\LoginController::LoginController
 * @see vendor/auth0/login/src/Controllers/LoginController.php:30
 * @route /login
 */
LoginController.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: LoginController.url(options),
    method: 'head',
})

export default LoginController