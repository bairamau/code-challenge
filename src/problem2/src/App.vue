<script setup lang="ts">
import { ref } from "vue";
import AppInput from "./components/AppInput.vue";
import AppButton from "./components/AppButton.vue";
import CurrencySelect from "./components/CurrencySelect.vue";
import IconLoader from "./components/IconLoader.vue";
import { useSwap } from "./composables/useSwap";

interface PriceDTO {
  currency: string;
  date: string;
  price: number;
}

const prices = ref<Record<string, number>>({});
const isLoading = ref(true);

const fetchPrices = async () => {
  const url = "https://interview.switcheo.com/prices.json";
  const response = await fetch(url);
  if (response.ok) {
    const data: PriceDTO[] = await response.json();
    prices.value = data.reduce(
      (acc, item) => {
        acc[item.currency] = item.price;
        return acc;
      },
      {} as Record<string, number>,
    );
  }
  isLoading.value = false;
};

fetchPrices();

const {
  fromAmount,
  toAmount,
  fromCurrency,
  toCurrency,
  updateFromAmount,
  updateToAmount,
  updateFromCurrency,
  updateToCurrency,
} = useSwap(prices);

const isSubmitting = ref(false);
const submissionError = ref<string | null>(null);

const handleSubmit = async () => {
  submissionError.value = null;

  const fromNum = Number(fromAmount.value);
  const toNum = Number(toAmount.value);

  if (isNaN(fromNum) || isNaN(toNum)) {
    submissionError.value = "Please enter valid amounts";
    return;
  }

  if (fromNum <= 0 || toNum <= 0) {
    submissionError.value = "Amounts must be greater than zero";
    return;
  }

  isSubmitting.value = true;
  await new Promise((resolve) => setTimeout(resolve, 2000));
  isSubmitting.value = false;
  updateFromAmount(undefined);
};
</script>

<template>
  <main class="main">
    <div class="form-wrapper">
      <IconLoader v-if="isSubmitting" class="loader" />
      <h1 class="text-heading-l title">Swap</h1>
      <form class="form" @submit.prevent="handleSubmit">
        <div class="input-group">
          <CurrencySelect
            :currencies="prices"
            :modelValue="fromCurrency"
            @update:modelValue="updateFromCurrency"
          />
          <AppInput
            id="amount-send"
            name="amount-send"
            type="text"
            label="Amount to send"
            required
            :modelValue="fromAmount"
            @update:modelValue="updateFromAmount"
          />
        </div>
        <div class="input-group">
          <CurrencySelect
            :currencies="prices"
            :modelValue="toCurrency"
            @update:modelValue="updateToCurrency"
          />
          <AppInput
            id="amount-receive"
            name="amount-receive"
            type="text"
            label="Amount to receive"
            required
            :modelValue="toAmount"
            @update:modelValue="updateToAmount"
          />
        </div>
        <p class="error">{{ submissionError }}</p>
        <AppButton type="submit" class="submit" :disabled="isSubmitting"
          >Confirm swap</AppButton
        >
      </form>
    </div>
  </main>
</template>

<style scoped>
.main {
  display: grid;
  align-items: center;
  min-height: 100vh;
}

.form-wrapper {
  position: relative;
  display: grid;
  justify-items: center;
  width: 100%;
  max-width: 640px;
  margin: auto;
  padding: 40px;
  border-radius: var(--radius-l);

  border: 1px solid transparent;
  background-image:
    linear-gradient(to top left, rgb(6 5 10 / 0.9), rgb(6 5 10 / 0.95)),
    linear-gradient(to top left, var(--dark), var(--brand-primary));

  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;

  &::after {
    z-index: -1;
    content: "";
    position: absolute;
    inset: 0;
    height: 150px;
    margin: auto;
    filter: blur(150px);
    background-color: var(--brand-primary);
  }
}

.form {
  display: grid;
  gap: 20px;
  margin-bottom: 30px;
  justify-self: stretch;
}

.submit {
  margin-top: 30px;
  width: 228px;
  justify-self: center;
}

.title {
  font-family: var(--font-heading);
  font-weight: 800;
  color: var(--brand-primary);
  margin-bottom: 40px;
}

.input-group {
  display: flex;
  gap: 10px;
  align-items: center;
}

.loader {
  position: absolute;
  width: 40px;
  height: 40px;
  top: 40px;
  right: 40px;
}

.error {
  color: var(--brand-primary);
  text-align: center;
  font-size: 1rem;
  font-weight: 800;
  min-height: 1.5rem;
  visibility: hidden;
}

.error:not(:empty) {
  visibility: visible;
}
</style>
