<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Country } from '@/types';
import { Link } from '@inertiajs/vue3';
import { route } from 'ziggy-js';
import { toSlug } from '@/lib/utils';
import { computed } from 'vue';

interface CountryCardProps {
    country: Country;
}

const props = defineProps<CountryCardProps>();

// Get the current page and region from URL
const currentPage = computed(() => {
    return parseInt(new URLSearchParams(window.location.search).get('page') || '1');
});

const currentRegion = computed(() => {
    return new URLSearchParams(window.location.search).get('region') || 'all';
});
</script>

<template>
    <Card class="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <CardHeader>
            <CardTitle class="text-center font-bold truncate">{{ props.country.name }}</CardTitle>
        </CardHeader>
        <CardContent class="p-2 flex justify-center items-center">
            <img :src="props.country.flag" :alt="props.country.name" class="h-28 object-cover rounded-md shadow-md" />
        </CardContent>
        <CardFooter class="flex justify-center p-4 pt-2">
            <Button variant="outline" as-child>
            <Link 
                :href="route('countries.show', toSlug(props.country.name))"
                :data="{
                    page: currentPage,
                    region: currentRegion
                }"
            >
                More info
            </Link>
            </Button>
        </CardFooter>
    </Card>
</template>