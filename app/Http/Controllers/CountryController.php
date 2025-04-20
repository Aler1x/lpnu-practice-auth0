<?php

namespace App\Http\Controllers;

use App\Services\CountryService;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use Inertia\{
    Inertia,
    Response
};

class CountryController extends Controller
{
    const CACHE_KEY = 'countries';
    const CACHE_TTL = 60 * 60 * 24; // 24 hours
    const MAP_CACHE_TTL = 1440; // 24 hours for maps
    const PER_PAGE = 24; // Number of countries per page

    protected CountryService $countryService;

    public function __construct(CountryService $countryService)
    {
        $this->countryService = $countryService;
    }

    public function index(Request $request): Response
    {
        $region = $request->query('region', 'all');
        $page = (int) $request->query('page', 1);
        
        $countries = Cache::remember(
            self::CACHE_KEY . '.region.' . $region,
            self::CACHE_TTL,
            function () use ($region) {
                return $this->countryService->fetchByRegion($region);
            }
        );

        // Implement manual pagination
        $total = $countries->count();
        $totalPages = ceil($total / self::PER_PAGE);
        $currentPage = max(1, min($page, $totalPages));
        $offset = ($currentPage - 1) * self::PER_PAGE;
        
        $paginatedCountries = $countries->slice($offset, self::PER_PAGE)->values();

        return Inertia::render('countries/index', [
            'countries' => $paginatedCountries,
            'regions' => $this->countryService->getRegions(),
            'currentRegion' => $region,
            'pagination' => [
                'total' => $total,
                'perPage' => self::PER_PAGE,
                'currentPage' => $currentPage,
                'lastPage' => $totalPages,
            ],
        ]);
    }

    public function show(string $code, Request $request): Response
    {
        $page = $request->query('page', 1);
        $region = $request->query('region', 'all');

        logger()->info('Showing country by code: ' . $code . ' Cache key: ' . self::CACHE_KEY . '.code.' . $code);

        $country = Cache::remember(
            // Use the code to cache the country
            self::CACHE_KEY . '.code.' . $code,
            self::CACHE_TTL,
            function () use ($code) {
                return $this->countryService->fetchByCode($code)->first();
            }
        );

        if (!$country) {
            abort(404, 'Country not found');
        }

        // Prefetch and cache map data if available
        if (isset($country['map_url'])) {
            $mapUrl = $country['map_url'];
            $mapData = $this->fetchMapData($mapUrl);
            $country['map'] = $mapData;
        }

        return Inertia::render('countries/show', [
            'country' => $country,
            'page' => $page,
            'region' => $region
        ]);
    }

    /**
     * Fetch map data from external source
     * 
     * @param string $url The URL of the map to fetch
     * @return string|null The SVG data or null if not found
     */
    protected function fetchMapData(string $url): ?string
    {
        $cacheKey = self::CACHE_KEY . '.map.' . md5($url);
        
        return Cache::remember($cacheKey, self::MAP_CACHE_TTL, function () use ($url) {
            try {
                $response = Http::get($url);
                
                if ($response->successful()) {
                    // Get the SVG content
                    $svgContent = $response->body();
                    
                    // Basic validation to ensure we're getting an SVG
                    if (strpos($svgContent, '<svg') === false) {
                        logger()->error('Invalid SVG content received', ['url' => $url]);
                        return null;
                    }
                    
                    return $svgContent;
                }
                
                logger()->error('Failed to fetch map data', [
                    'url' => $url,
                    'status' => $response->status()
                ]);
                
                return null;
            } catch (\Exception $e) {
                logger()->error('Exception while fetching map data', [
                    'url' => $url,
                    'message' => $e->getMessage()
                ]);
                
                return null;
            }
        });
    }
}
