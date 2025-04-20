<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import type { BreadcrumbItem, Country } from '@/types';
import { Head, Link, router } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { route } from 'ziggy-js';
import { Earth, Users, Map, MapPinHouse } from 'lucide-vue-next';

const props = defineProps<{
    country: Country;
    page: number | string;
    region: string;
}>();

// Use the server-provided region or fallback to the stored one
const currentRegion = ref<string>(props.region || localStorage.getItem('selectedRegion') || 'all');
const currentPage = ref<number>(Number(props.page) || 1);

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Countries',
        href: '/countries' + (currentRegion.value !== 'all' ? `?region=${currentRegion.value}` : '') + 
              (currentPage.value > 1 ? `${currentRegion.value !== 'all' ? '&' : '?'}page=${currentPage.value}` : ''),
    },
    {
        title: props.country.name,
        href: route('countries.show', props.country.code),
    },
];

const processedSvg = ref<string | null>(null);
const processSVG = () => {
    // Create a DOMParser to parse the SVG content
    const parser = new DOMParser();
    const doc = parser.parseFromString(props.country.map, 'image/svg+xml');

    // Get the SVG element
    const svgElement = doc.querySelector('svg');

    if (svgElement) {
        // Add viewBox if it doesn't exist
        if (!svgElement.hasAttribute('viewBox') &&
            svgElement.hasAttribute('width') &&
            svgElement.hasAttribute('height')) {
            const width = svgElement.getAttribute('width');
            const height = svgElement.getAttribute('height');
            svgElement.setAttribute('viewBox', `0 0 ${width} ${height}`);
        } else if (!svgElement.hasAttribute('viewBox')) {
            // Set a default viewBox if none exists
            svgElement.setAttribute('viewBox', '0 0 1000 1000');
        }

        // Set responsive dimensions
        svgElement.setAttribute('fill', 'var(--foreground)');
        svgElement.setAttribute('stroke', 'var(--background)');
        svgElement.setAttribute('width', '100%');
        svgElement.setAttribute('height', '100%');
        svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');

        // Convert back to string
        processedSvg.value = new XMLSerializer().serializeToString(svgElement);
    } else {
        processedSvg.value = props.country.map;
    }
}

onMounted(() => {
    if (props.country.map) {
        processSVG();
    } else {
        processedSvg.value = null;
    }
});

const backToCountries = () => {
    router.visit('/countries', {
        data: { 
            region: currentRegion.value,
            page: currentPage.value
        },
        preserveState: true,
        preserveScroll: true,
        only: ['countries', 'currentRegion', 'pagination']
    });
};
</script>

<template>

    <Head :title="country.name" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <Card>
                <CardHeader>
                    <CardTitle class="text-2xl font-bold">{{ country.name }}</CardTitle>
                </CardHeader>
                <CardContent class="p-4 flex flex-col lg:flex-row gap-8">
                    <div class="flex flex-col md:flex-row gap-8">
                        <div class="flex flex-col items-center">
                            <img :src="country.flag" :alt="country.name + ' flag'"
                                class="h-48 w-auto object-cover rounded-md shadow-md mb-4" />
                        </div>
                        <div class="flex flex-col flex-1 gap-4">
                            <div v-if="country.capital" class="flex items-center gap-2">
                                <Earth class="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                <div>
                                    <span class="font-semibold">Capital:</span>
                                    <span class="ml-2">{{ country.capital }}</span>
                                </div>
                            </div>
                            <div v-if="country.population" class="flex items-center gap-2">
                                <Users class="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                <div>
                                    <span class="font-semibold">Population:</span>
                                    <span class="ml-2">{{ country.population.toLocaleString() }}</span>
                                </div>
                            </div>
                            <div v-if="country.area" class="flex items-center gap-2">
                                <Map class="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                <div>
                                    <span class="font-semibold">Area:</span>
                                    <span class="ml-2">{{ country.area.toLocaleString() }} km²</span>
                                </div>
                            </div>
                            <div v-if="country.region" class="flex items-center gap-2">
                                <MapPinHouse class="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                <div>
                                    <span class="font-semibold">Region:</span>
                                    <span class="ml-2">{{ country.region }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="country.map"
                        class="flex flex-1 justify-center items-center bg-[#292929] h-[300px] lg:h-[220px] w-full rounded-lg">
                        <div v-html="processedSvg" class="h-full w-full" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" class="mt-4" @click="backToCountries">
                        Back to all countries
                    </Button>
                </CardFooter>
            </Card>
        </div>
    </AppLayout>
</template>
