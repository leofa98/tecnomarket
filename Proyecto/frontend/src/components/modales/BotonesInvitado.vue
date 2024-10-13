<script>
export default {};
</script>
<template>
  <div class="d-lg-flex column-gap-3 justify-content-center d-none">
    <button
      class="btn-acceder"
      data-bs-toggle="modal"
      data-bs-target="#iniciarSesionModal"
    >
      <font-awesome-icon
        :icon="['fas', 'arrow-right-to-bracket']"
        style="color: #ffffff"
      />
      Acceder
    </button>
    <button
      class="btn-registrarse"
      data-bs-toggle="modal"
      data-bs-target="#registrarseModal"
    >
      <font-awesome-icon :icon="['fas', 'user']" style="color: #ffffff" />
      Registrarse
    </button>
  </div>
</template>

<style scoped>
.btn-acceder,
.btn-registrarse {
  width: 123px;
  height: 38px;
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  font-size: 16px;
  background-color: black;
  transition: all 0.2s ease;
}

.btn-acceder {
  background: var(--degradado-naranja);
}

.btn-acceder:hover {
  filter: brightness(110%);
}

.btn-registrarse:hover {
  background-color: rgb(51, 48, 48);
}
</style>
