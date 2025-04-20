import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\CountryController::show
 * @see app/Http/Controllers/CountryController.php:64
 * @route /countries/{name}
 */
export const show = (args: { name: string | number } | [name: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '\/countries\/{name}',
}

/**
 * @see \App\Http\Controllers\CountryController::show
 * @see app/Http/Controllers/CountryController.php:64
 * @route /countries/{name}
 */
show.url = (args: { name: string | number } | [name: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { name: args }
    }

    if (Array.isArray(args)) {
        args = {
            name: args[0],
        }
    }

    const parsedArgs = {
        name: args.name,
    }

    return show.definition.url
            .replace('{name}', parsedArgs.name.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CountryController::show
 * @see app/Http/Controllers/CountryController.php:64
 * @route /countries/{name}
 */
show.get = (args: { name: string | number } | [name: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\CountryController::show
 * @see app/Http/Controllers/CountryController.php:64
 * @route /countries/{name}
 */
show.head = (args: { name: string | number } | [name: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

export default show