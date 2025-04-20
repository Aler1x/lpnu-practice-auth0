<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import type { BreadcrumbItem, Country } from '@/types';
import { Head, router } from '@inertiajs/vue3';
import { ref, computed, onMounted } from 'vue';
import CountryCard from '@/components/CountryCard.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
    Pagination, 
    PaginationContent, 
    PaginationItem, 
    PaginationNext, 
    PaginationPrevious,
    PaginationEllipsis,
} from '@/components/ui/pagination';
import { Globe, ChevronDown } from 'lucide-vue-next';

interface CountriesPageProps {
    countries: Country[];
    regions: Record<string, string>;
    currentRegion: string;
    pagination: {
        total: number;
        perPage: number;
        currentPage: number;
        lastPage: number;
    };
}

const props = defineProps<CountriesPageProps>();

onMounted(() => {
    localStorage.setItem('selectedRegion', props.currentRegion);
});

const currentRegionName = computed(() => {
    return props.regions[props.currentRegion] || 'All Regions';
});

const handleRegionSelect = (region: string) => {
    localStorage.setItem('selectedRegion', region);

    router.get('/countries', { region, page: 1 }, {
        preserveState: true,
        preserveScroll: true,
        only: ['countries', 'currentRegion', 'pagination']
    });
};

const goToPage = (page: number) => {
    if (page < 1 || page > props.pagination.lastPage) return;
    
    router.get('/countries', 
        { region: props.currentRegion, page }, 
        {
            preserveState: true,
            preserveScroll: true,
            only: ['countries', 'pagination']
        }
    );
};

// Function to generate pagination items
const getPaginationItems = computed(() => {
    const { currentPage, lastPage } = props.pagination;
    const items: (number | null)[] = [];
    const siblingsCount = 3; // Show 3 pages on each side
    
    // Calculate start and end of pagination range
    // This ensures we show up to 3 pages before and after current page
    const start = Math.max(2, currentPage - siblingsCount);
    const end = Math.min(lastPage - 1, currentPage + siblingsCount);
    
    // For small number of pages, just show all pages without ellipsis
    if (lastPage <= siblingsCount * 2 + 3) {
        for (let i = 1; i <= lastPage; i++) {
            items.push(i);
        }
        return items;
    }
    
    // Always show first page
    items.push(1);
    
    // Show dots if needed (when current page is more than siblings+2 away from start)
    if (currentPage > siblingsCount + 2) {
        items.push(null);
    } else {
        // If we're close to the start, just show those pages without ellipsis
        for (let i = 2; i < start; i++) {
            items.push(i);
        }
    }
    
    // Add all pages in the calculated range
    for (let i = start; i <= end; i++) {
        items.push(i);
    }
    
    // Show dots if needed (when current page is more than siblings+2 away from end)
    if (currentPage < lastPage - (siblingsCount + 1)) {
        items.push(null);
    } else {
        // If we're close to the end, just show those pages without ellipsis
        for (let i = end + 1; i < lastPage; i++) {
            items.push(i);
        }
    }
    
    // Always show last page if there's more than one page
    if (lastPage > 1) {
        items.push(lastPage);
    }
    
    return items;
});

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Countries',
        href: '/countries',
    },
];
</script>

<template>
    <Head title="Countries" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div class="flex justify-between items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            {{ currentRegionName }}
                            <ChevronDown class="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem 
                            v-for="(regionName, regionKey) in props.regions" 
                            :key="regionKey"
                            @click="handleRegionSelect(regionKey)"
                            :class="{ 'bg-accent': props.currentRegion === regionKey }"
                        >
                            {{ regionName }}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div v-if="props.pagination.total > 0" class="text-sm text-muted-foreground">
                    Showing {{ props.countries.length }} of {{ props.pagination.total }} countries
                </div>
            </div>
            
            <!-- Countries Grid -->
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <CountryCard v-for="country in props.countries" :key="country.name" :country="country" />
            </div>
            
            <!-- Pagination -->
            <div v-if="props.pagination.lastPage > 1" class="flex justify-center mt-4">
                <nav class="mx-auto flex w-full justify-center" aria-label="Pagination">
                    <ul class="flex flex-wrap items-center gap-1.5 text-sm sm:gap-2.5">
                        <!-- Previous Page -->
                        <li v-if="props.pagination.currentPage > 1">
                            <button 
                                class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                                @click="goToPage(props.pagination.currentPage - 1)"
                            >
                                Previous
                            </button>
                        </li>
                        
                        <!-- Page Numbers -->
                        <template v-for="(item, index) in getPaginationItems" :key="index">
                            <li v-if="item !== null">
                                <button 
                                    :class="[
                                        'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border h-9 w-9',
                                        item === props.pagination.currentPage 
                                            ? 'border-input bg-accent text-accent-foreground' 
                                            : 'border-input bg-background hover:bg-accent hover:text-accent-foreground'
                                    ]"
                                    @click="goToPage(item)"
                                >
                                    {{ item }}
                                </button>
                            </li>
                            <li v-else>
                                <span class="flex h-9 w-9 items-center justify-center">...</span>
                            </li>
                        </template>
                        
                        <!-- Next Page -->
                        <li v-if="props.pagination.currentPage < props.pagination.lastPage">
                            <button 
                                class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                                @click="goToPage(props.pagination.currentPage + 1)"
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            
            <!-- Empty State -->
            <div v-if="props.countries.length === 0" class="flex flex-col items-center justify-center py-12">
                <Globe class="h-16 w-16 text-gray-400 mb-4" />
                <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">No countries found</h3>
                <p class="text-gray-500 dark:text-gray-400">Try selecting a different region</p>
            </div>
        </div>
    </AppLayout>
</template>
