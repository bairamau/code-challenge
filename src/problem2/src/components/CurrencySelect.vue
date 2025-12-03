<script setup lang="ts">
interface Props {
  currencies: Record<string, number>;
}

defineProps<Props>();
const model = defineModel<string>({ required: true });

const getTokenIcon = (currency: string) => {
  return `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currency}.svg`;
};
</script>

<template>
  <div class="currency-selector">
    <img :src="getTokenIcon(model || '')" :alt="model" class="token-icon" />
    <select v-model="model" class="currency-select">
      <option v-for="(_price, curr) in currencies" :key="curr" :value="curr">
        {{ curr }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.currency-selector {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 0 20px;
  height: 62px;
  border-radius: var(--radius-m);
  border: 1px solid transparent;
  background-image:
    linear-gradient(91deg, var(--dark) -10%, rgb(27 26 47) 90%),
    linear-gradient(
      to right,
      rgb(from var(--dark) r g b / 0.3),
      rgb(from var(--brand-primary) r g b / 0.3)
    ),
    linear-gradient(91deg, var(--dark) -10%, rgb(27 26 47) 90%);
  background-origin: padding-box, border-box, border-box;
  background-clip: padding-box, border-box, border-box;
}

.currency-select {
  min-width: 140px;
  padding: 0 15px;
  border-radius: var(--radius-m);
  border: none;
  background-color: transparent;
  color: var(--white);
  font-family: var(--font-heading);
  font-size: 1.125rem;
  font-weight: 800;
  cursor: pointer;
}

.currency-select:focus {
  outline: none;
}

.currency-select option {
  background-color: var(--dark);
  color: var(--white);
}

.token-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
</style>
