<script>
export default {
  data() {
    return {
      toggle: true,
    };
  },
  emits: ['cambiarComponente'],
  methods: {
    mostrarDatos() {
      this.toggle = true;
      this.$emit('cambiarComponente', 'DatosUsuario');
    },

    mostrarPedidos() {
      this.toggle = false;
      this.$emit('cambiarComponente', 'PedidosUsuario');
    },
  },
};
</script>

<template>
  <div class="perfil-botones">
    <button :class="{ activo: toggle }" @click="mostrarDatos">
      <font-awesome-icon icon="fa-solid fa-user" /><span
        >Información Personal</span
      >
    </button>
    <button :class="{ activo: !toggle }" @click="mostrarPedidos">
      <font-awesome-icon icon="fa-solid fa-box" /><span>Pedidos</span>
    </button>
  </div>
</template>

<style scoped>
.activo * {
  color: var(--gris-oscuro);
}

.perfil-botones {
  display: flex;
  flex-direction: column;
  row-gap: 1em;
}

.perfil-botones button {
  text-align: left;
  font-size: 25px;
  background: none;
  border: none;
  transition: color 0.2s ease;
  color: var(--gris);
}

.perfil-botones button:hover {
  color: var(--gris-oscuro);
}

.perfil-botones button:active {
  color: var(--color-secundario-naranja);
}

.perfil-botones span {
  margin-left: 1em;
  font-size: 20px;
}
.perfil-botones font-awesome-icon {
  font-size: 30px;
}
</style>
