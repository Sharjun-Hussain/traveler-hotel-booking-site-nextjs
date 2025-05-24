'use client';

import { useEffect } from 'react';
import { useCurrencyStore } from '@/stores/useCurrencyStore';

export function CurrencyInitializer() {
    const { initialize, isLoading, error } = useCurrencyStore();

    useEffect(() => {
        initialize();
    }, [initialize]);

    if (isLoading) return <div>Loading currency rates...</div>;
    if (error) return <div className="text-red-500">Currency rate error: {error}</div>;

    return null;
}