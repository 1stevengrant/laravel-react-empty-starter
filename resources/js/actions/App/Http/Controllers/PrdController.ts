import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PrdController::__invoke
* @see app/Http/Controllers/PrdController.php:11
* @route '/prd'
*/
const PrdController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: PrdController.url(options),
    method: 'get',
})

PrdController.definition = {
    methods: ["get","head"],
    url: '/prd',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PrdController::__invoke
* @see app/Http/Controllers/PrdController.php:11
* @route '/prd'
*/
PrdController.url = (options?: RouteQueryOptions) => {
    return PrdController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PrdController::__invoke
* @see app/Http/Controllers/PrdController.php:11
* @route '/prd'
*/
PrdController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: PrdController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PrdController::__invoke
* @see app/Http/Controllers/PrdController.php:11
* @route '/prd'
*/
PrdController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: PrdController.url(options),
    method: 'head',
})

export default PrdController