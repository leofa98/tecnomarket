<script>
export default {
  props: ['active'],
  emits: ['toggleSidebar'],
  data() {
    return {};
  },
};
</script>

<template lang="">
  <button
    class="hamburger hamburger--vortex p-0"
    :class="{ 'is-active': active }"
    type="button"
    @click="$emit('toggleSidebar')"
  >
    <span class="hamburger-box">
      <span class="hamburger-inner"></span>
    </span>
  </button>
</template>

<style>
.hamburger.is-active .hamburger-inner,
.hamburger.is-active .hamburger-inner::before,
.hamburger.is-active .hamburger-inner::after,
.hamburger .hamburger-inner,
.hamburger .hamburger-inner::before,
.hamburger .hamburger-inner::after {
  background-color: #ffffff;
  width: 30px;
  height: 3px;
  margin: 0;
}

.is-active {
  opacity: 1 !important;
}

.hamburger {
  opacity: 0.8;
}

.hamburger {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: var(--color-secundario-naranja);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 300;
}

.hamburger:hover {
}

.hamburger-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
