<script setup lang="ts"></script>

<template>
  <button class="btn text-heading-s">
    <slot />
  </button>
</template>

<style scoped>
@property --a {
  syntax: "<color>";
  inherits: false;
  initial-value: rgb(255 56 68);
}

@property --b {
  syntax: "<color>";
  inherits: false;
  initial-value: rgb(153 34 41);
}

.btn {
  display: inline-flex;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  vertical-align: middle;

  font-family: var(--font-heading);
  font-size: 1.125rem;
  font-weight: 800;
  line-height: normal;

  --a: var(--brand-primary);
  --b: var(--brand-primary-darker);
  background-image: linear-gradient(99deg, var(--a) 1.64%, var(--b));
  transition:
    --a 0.3s ease-out,
    --b 0.3s ease-out;

  border-radius: 5px;
  color: var(--white);
  text-decoration: none;

  &:hover {
    --a: var(--brand-primary-dark);
    --b: var(--brand-primary-dark);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
