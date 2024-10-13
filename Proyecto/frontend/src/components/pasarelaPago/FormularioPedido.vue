<script>
export default {
  props: ['nombre', 'apellidos', 'direccion', 'tlf'],
  emits: [
    'update:nombre',
    'update:apellidos',
    'update:direccion',
    'update:tlf',
  ],
};
</script>
<template>
  <div class="col-lg-6 pe-lg-5">
    <form>
      <div class="mb-3">
        <label class="form-label" for="nombre">Nombre:</label>
        <input
          required
          :value="nombre"
          @input="$emit('update:nombre', $event.target.value)"
          type="text"
          class="form-control"
          id="nombre"
        />
      </div>

      <div class="mb-3">
        <label class="form-label" for="apellidos">Apellidos:</label>
        <input
          type="text"
          class="form-control"
          id="apellidos"
          :value="apellidos"
          @input="$emit('update:apellidos', $event.target.value)"
        />
      </div>
      <div class="mb-3">
        <label class="form-label" for="direccion">Dirección:</label>
        <input
          type="text"
          class="form-control"
          id="direccion"
          :value="direccion"
          @input="$emit('update:direccion', $event.target.value)"
        />
      </div>
      <div class="mb-3">
        <label class="form-label" for="telefono">Teléfono:</label>
        <input
          type="tel"
          class="form-control"
          id="telefono"
          :value="tlf"
          @input="$emit('update:tlf', $event.target.value)"
        />
      </div>
    </form>
  </div>
</template>

<style scoped></style>
