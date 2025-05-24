import { create } from 'zustand';

// Define your currency options
export const CURRENCIES = {
    USD: { symbol: '$', name: 'US Dollar' },
    EUR: { symbol: '€', name: 'Euro' },
    GBP: { symbol: '£', name: 'British Pound' },
    LKR: { symbol: 'Rs', name: 'Sri Lankan Rupee' },
    INR: { symbol: '₹', name: 'Indian Rupee' },
};

export const useCurrencyStore = create((set, get) => ({
    // Default currency
    currency: 'USD',

    // Initial exchange rates (fallback if API fails)
    exchangeRates: {
        USD: 1,
        EUR: 0.93,
        GBP: 0.79,
        LKR: 299.47,
        INR: 83.37,
    },

    // Loading and error states
    isLoading: false,
    error: null,
    lastUpdated: null, // Add timestamp of last update

    // Action to change currency
    setCurrency: (currency) => set({ currency }),

    // Convert price between currencies
    convertPrice: (price, toCurrency) => {
        const { currency: fromCurrency, exchangeRates } = get();
        const targetCurrency = toCurrency || fromCurrency;

        if (fromCurrency === 'USD') {
            return price * exchangeRates[targetCurrency];
        } else if (targetCurrency === 'USD') {
            return price / exchangeRates[fromCurrency];
        } else {
            const usdAmount = price / exchangeRates[fromCurrency];
            return usdAmount * exchangeRates[targetCurrency];
        }
    },

    // Format price with currency symbol
    formatPrice: (price, CurrencytoConvert) => {

        const toCurrency = localStorage.getItem('currency') || CurrencytoConvert || get().currency;
        const { currency, convertPrice } = get();
        const targetCurrency = toCurrency || currency;
        const convertedPrice = toCurrency ? convertPrice(price, toCurrency) : price;

        if (targetCurrency === 'LKR') {
            return `${CURRENCIES[targetCurrency].symbol} ${Math.round(convertedPrice).toLocaleString()}`;
        }

        return `${CURRENCIES[targetCurrency].symbol} ${convertedPrice.toFixed(2)}`;
    },

    // Fetch live exchange rates (with daily caching)
    fetchExchangeRates: async () => {
        const { lastUpdated } = get();
        const now = new Date().getTime();

        // Only fetch if rates are older than 24 hours
        if (lastUpdated && (now - lastUpdated < 24 * 60 * 60 * 1000)) {
            return;
        }

        set({ isLoading: true, error: null });

        try {
            // First try to get from localStorage
            const cachedRates = localStorage.getItem('exchangeRates');
            const cachedTimestamp = localStorage.getItem('exchangeRatesTimestamp');

            if (cachedRates && cachedTimestamp && (now - parseInt(cachedTimestamp) < 24 * 60 * 60 * 1000)) {
                set({
                    exchangeRates: JSON.parse(cachedRates),
                    lastUpdated: parseInt(cachedTimestamp),
                    isLoading: false
                });
                return;
            }

            // If no valid cache, fetch from API
            const response = await fetch('https://v6.exchangerate-api.com/v6/42a62c391dd095f8ef819646/latest/USD');

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();

            if (data.result === 'error') {
                throw new Error(data['error-type'] || 'Unknown API error');
            }

            if (data.conversion_rates) {
                const supportedRates = Object.keys(CURRENCIES).reduce((acc, code) => {
                    if (data.conversion_rates[code]) {
                        acc[code] = data.conversion_rates[code];
                    }
                    return acc;
                }, {});

                const newRates = {
                    ...get().exchangeRates,
                    ...supportedRates
                };

                // Save to localStorage
                localStorage.setItem('exchangeRates', JSON.stringify(newRates));
                localStorage.setItem('exchangeRatesTimestamp', now.toString());

                set({
                    exchangeRates: newRates,
                    lastUpdated: now,
                    isLoading: false
                });
            }
        } catch (error) {
            console.error('Failed to fetch exchange rates:', error);
            set({
                error: error instanceof Error ? error.message : 'Failed to fetch rates',
                isLoading: false
            });
        }
    },

    // Initialize store (load from cache if available)
    initialize: () => {
        const cachedRates = localStorage.getItem('exchangeRates');
        const cachedTimestamp = localStorage.getItem('exchangeRatesTimestamp');

        if (cachedRates && cachedTimestamp) {
            set({
                exchangeRates: JSON.parse(cachedRates),
                lastUpdated: parseInt(cachedTimestamp)
            });
        }

        // Trigger rate update if needed
        get().fetchExchangeRates();
    }
}));