import { queryParams, type QueryParams } from './../wayfinder'

/**
 * @see \App\Http\Controllers\CountryController::countries
 * @see app/Http/Controllers/CountryController.php:28
 * @route /countries
 */
export const countries = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: countries.url(options),
    method: 'get',
})

countries.definition = {
    methods: ['get','head'],
    url: '\/countries',
}

/**
 * @see \App\Http\Controllers\CountryController::countries
 * @see app/Http/Controllers/CountryController.php:28
 * @route /countries
 */
countries.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return countries.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CountryController::countries
 * @see app/Http/Controllers/CountryController.php:28
 * @route /countries
 */
countries.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: countries.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\CountryController::countries
 * @see app/Http/Controllers/CountryController.php:28
 * @route /countries
 */
countries.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: countries.url(options),
    method: 'head',
})

export default countries