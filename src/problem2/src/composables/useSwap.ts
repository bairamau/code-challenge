import { ref, type Ref } from "vue";

export function useSwap(prices: Ref<Record<string, number>>) {
  const fromAmount = ref<string | undefined>();
  const toAmount = ref<string | undefined>();
  const fromCurrency = ref("ETH");
  const toCurrency = ref("USD");

  const calculateExchangeRate = (from: string, to: string): number => {
    const fromPrice = prices.value[from];
    const toPrice = prices.value[to];
    if (fromPrice && toPrice) {
      return fromPrice / toPrice;
    }
    return 1;
  };

  const updateFromCurrency = (value: string | undefined) => {
    if (!value) return;
    fromCurrency.value = value;
    updateFromAmount(fromAmount.value);
  };

  const updateToCurrency = (value: string | undefined) => {
    if (!value) return;
    toCurrency.value = value;
    updateFromAmount(fromAmount.value);
  };

  const updateFromAmount = (value: string | undefined) => {
    if (!value) {
      fromAmount.value = undefined;
      toAmount.value = undefined;
      return;
    }

    const num = Number(value);
    fromAmount.value = value;
    if (!isNaN(num)) {
      const rate = calculateExchangeRate(fromCurrency.value, toCurrency.value);
      toAmount.value = (num * rate).toString();
    }
  };

  const updateToAmount = (value: string | undefined) => {
    if (!value) {
      fromAmount.value = undefined;
      toAmount.value = undefined;
      return;
    }

    const num = Number(value);
    toAmount.value = value;
    if (!isNaN(num)) {
      const rate = calculateExchangeRate(toCurrency.value, fromCurrency.value);
      fromAmount.value = (num * rate).toString();
    }
  };

  return {
    fromAmount,
    toAmount,
    fromCurrency,
    toCurrency,
    updateFromAmount,
    updateToAmount,
    updateFromCurrency,
    updateToCurrency,
  };
}
