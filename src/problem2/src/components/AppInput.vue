<script setup lang="ts">
interface Props {
  id: string;
  label: string;
  type?: string;
  name?: string;
  required?: boolean;
  autocomplete?: string;
}

defineProps<Props>();
const model = defineModel();
</script>

<template>
  <div class="input-wrapper">
    <input
      placeholder=" "
      class="input"
      :id="id"
      :name="name"
      :type="type"
      :required="required"
      :autocomplete="autocomplete"
      v-model="model"
    />
    <label class="label" :for="id">
      {{ label }}
    </label>
  </div>
</template>

<style scoped>
.input-wrapper {
  width: 100%;
  position: relative;

  &::after {
    pointer-events: none;
    content: "";
    position: absolute;
    right: -150px;
    top: -15px;
    width: 248px;
    height: 71px;
    background-color: transparent;
    filter: blur(148px);
    clip-path: inset(15px 150px -6px -800px);
    transition: background-color var(--transition);
  }

  &:focus-within,
  &:hover {
    &::after {
      background-color: var(--brand-primary);
    }
  }
}

.input {
  position: relative;
  width: 100%;
  height: 62px;
  color: var(--white);
  font-size: 1.125rem;
  font-family: Gilroy;
  line-height: 1.2;
  padding: 0 20px;

  border-radius: var(--radius-m);
  border: 1px solid transparent;
  background-image:
    linear-gradient(91deg, var(--dark) -20%, rgb(27 26 47) 90%),
    linear-gradient(
      to right,
      rgb(from var(--dark) r g b / 0.3),
      rgb(from var(--brand-primary) r g b / 0.3)
    ),
    linear-gradient(91deg, var(--dark) -20%, rgb(27 26 47) 90%);

  background-origin: padding-box, border-box, border-box;
  background-clip: padding-box, border-box, border-box;

  &:focus {
    outline: none;
  }

  &:focus + .label,
  &:not(:placeholder-shown) + .label {
    transform: translate(20px, calc(-62px - 0.5rem));
    color: var(--brand-primary);
    font-size: 0.75rem;
  }
}

.label {
  overflow: visible;
  cursor: text;
  position: absolute;
  display: block;
  font-weight: 800;
  font-size: 1.125rem;
  font-family: var(--font-heading);
  transform: translate(20px, calc(-31px - 0.8rem));
  transition:
    transform var(--transition),
    color var(--transition),
    font-size var(--transition);
}
</style>
