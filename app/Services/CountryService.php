<?php

namespace App\Services;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;

class CountryService extends FetchService
{
    const API_URL = 'https://restcountries.com/v3.1';

    private function getMapURL(string $code): string
    {
        $code = strtolower($code);
        // use admin1 because all map for Ukraine is corrupted and simplemaps.com must be fixed
        return 'https://simplemaps.com/static/svg/country/' . $code . '/admin1/' . $code . '.svg';
    }

    /**
     * Fetch all countries
     * 
     * @param array $queryParams Additional query parameters
     * @return Collection
     */
    public function fetch(array $queryParams = []): Collection
    {
        try {
            $response = Http::get(self::API_URL . '/all', $queryParams);
            if ($response->successful()) {
                return collect($response->json())->map(function ($country) {
                    return [
                        'name' => $country['name']['common'] ?? 'Unknown',
                        'flag' => $country['flags']['png'] ?? null,
                        'capital' => $country['capital'][0] ?? null,
                        'population' => $country['population'] ?? null,
                        'area' => $country['area'] ?? null,
                        'region' => $country['region'] ?? null,
                    ];
                });
            }
        } catch (\Exception $e) {
            logger()->error('Error fetching countries: ' . $e->getMessage());
            return collect([]);
        }
        return collect([]);
    }

    /**
     * Fetch a country by name
     * 
     * @param string $name The country name to search for
     * @param array $queryParams Additional query parameters
     * @return Collection
     */
    public function fetchByName(string $name, array $queryParams = []): Collection
    {
        $nameEndpoint = self::API_URL . '/name/' . $name;
        
        try {
            $response = Http::get($nameEndpoint, $queryParams);
            if ($response->successful()) {
                return collect($response->json())->map(function ($country) {
                    return [
                        'name' => $country['name']['common'] ?? 'Unknown',
                        'flag' => $country['flags']['png'] ?? null,
                        'capital' => $country['capital'][0] ?? null,
                        'population' => $country['population'] ?? null,
                        'area' => $country['area'] ?? null,
                        'region' => $country['region'] ?? null,
                        'map_url' => $this->getMapURL($country['cca2']) ?? null,
                    ];
                });
            }
        } catch (\Exception $e) {
            logger()->error('Error fetching country by name: ' . $e->getMessage());
            return collect([]);
        }
        return collect([]);
    }
    
    /**
     * Fetch countries by region
     * 
     * @param string $region The region to filter by
     * @param array $queryParams Additional query parameters
     * @return Collection
     */
    public function fetchByRegion(string $region, array $queryParams = []): Collection
    {
        if (empty($region) || $region === 'all') {
            return $this->fetch($queryParams);
        }
        
        $regionEndpoint = self::API_URL . '/region/' . $region;
        
        try {
            $response = Http::get($regionEndpoint, $queryParams);
            if ($response->successful()) {
                return collect($response->json())->map(function ($country) {
                    return [
                        'name' => $country['name']['common'] ?? 'Unknown',
                        'flag' => $country['flags']['png'] ?? null,
                        'capital' => $country['capital'][0] ?? null,
                        'population' => $country['population'] ?? null,
                        'area' => $country['area'] ?? null,
                        'region' => $country['region'] ?? null,
                    ];
                });
            }
        } catch (\Exception $e) {
            logger()->error('Error fetching countries by region: ' . $e->getMessage());
            return collect([]);
        }
        return collect([]);
    }
    
    /**
     * Get available regions
     * 
     * @return array
     */
    public function getRegions(): array
    {
        return [
            'all' => 'All Regions',
            'africa' => 'Africa',
            'americas' => 'Americas',
            'asia' => 'Asia',
            'europe' => 'Europe',
            'oceania' => 'Oceania'
        ];
    }
}
