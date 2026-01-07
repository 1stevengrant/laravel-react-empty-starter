import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PrdStatusController::__invoke
* @see app/Http/Controllers/PrdStatusController.php:11
* @route '/prd-status'
*/
const PrdStatusController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: PrdStatusController.url(options),
    method: 'get',
})

PrdStatusController.definition = {
    methods: ["get","head"],
    url: '/prd-status',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PrdStatusController::__invoke
* @see app/Http/Controllers/PrdStatusController.php:11
* @route '/prd-status'
*/
PrdStatusController.url = (options?: RouteQueryOptions) => {
    return PrdStatusController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PrdStatusController::__invoke
* @see app/Http/Controllers/PrdStatusController.php:11
* @route '/prd-status'
*/
PrdStatusController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: PrdStatusController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PrdStatusController::__invoke
* @see app/Http/Controllers/PrdStatusController.php:11
* @route '/prd-status'
*/
PrdStatusController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: PrdStatusController.url(options),
    method: 'head',
})

export default PrdStatusController