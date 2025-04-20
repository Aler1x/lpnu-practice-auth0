import { queryParams, type QueryParams } from './../wayfinder'

/**
 * @see \Auth0\Laravel\Controllers\LoginController::login
 * @see vendor/auth0/login/src/Controllers/LoginController.php:30
 * @route /login
 */
export const login = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: login.url(options),
    method: 'get',
})

login.definition = {
    methods: ['get','head'],
    url: '\/login',
}

/**
 * @see \Auth0\Laravel\Controllers\LoginController::login
 * @see vendor/auth0/login/src/Controllers/LoginController.php:30
 * @route /login
 */
login.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return login.definition.url + queryParams(options)
}

/**
 * @see \Auth0\Laravel\Controllers\LoginController::login
 * @see vendor/auth0/login/src/Controllers/LoginController.php:30
 * @route /login
 */
login.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: login.url(options),
    method: 'get',
})

/**
 * @see \Auth0\Laravel\Controllers\LoginController::login
 * @see vendor/auth0/login/src/Controllers/LoginController.php:30
 * @route /login
 */
login.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: login.url(options),
    method: 'head',
})

export default login