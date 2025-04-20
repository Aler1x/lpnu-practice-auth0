import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\CountryController::show
 * @see app/Http/Controllers/CountryController.php:62
 * @route /countries/{code}
 */
export const show = (args: { code: string | number } | [code: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '\/countries\/{code}',
}

/**
 * @see \App\Http\Controllers\CountryController::show
 * @see app/Http/Controllers/CountryController.php:62
 * @route /countries/{code}
 */
show.url = (args: { code: string | number } | [code: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { code: args }
    }

    if (Array.isArray(args)) {
        args = {
            code: args[0],
        }
    }

    const parsedArgs = {
        code: args.code,
    }

    return show.definition.url
            .replace('{code}', parsedArgs.code.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CountryController::show
 * @see app/Http/Controllers/CountryController.php:62
 * @route /countries/{code}
 */
show.get = (args: { code: string | number } | [code: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\CountryController::show
 * @see app/Http/Controllers/CountryController.php:62
 * @route /countries/{code}
 */
show.head = (args: { code: string | number } | [code: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

export default show