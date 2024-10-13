<script>
export default {
  props: ['idProducto'],
  data() {
    return {
      producto: '',
    };
  },

  mounted() {
    fetch(this.backend + '/producto/' + this.idProducto)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        this.producto = data;
      })
      .catch((error) => {
        console.error(`Error al obtener los datos: ${error}`);
      });
  },
};
</script>
<template>
  <div
    class="img-producto-detalle p-4 d-flex justify-content-center align-items-center"
  >
    <div v-if="producto.descuento !== 0" class="descuento">
      <span>-{{ producto.descuento }}%</span>
    </div>
    <div
      class="producto-imagen-detalle"
      :style="{
        'background-image': 'url(' + producto.imagen + ')',
      }"
    ></div>
  </div>
</template>

<style scoped>
.img-producto-detalle {
  background-color: white;
  height: 100%;
  position: relative;
  overflow: hidden;
  box-shadow: var(--sombra-cajas);
}
.descuento {
  background: var(--degradado-naranja);
  height: 100px;
  left: -50px;
  position: absolute;
  top: -50px;
  width: 100px;
  -webkit-transform: rotate(-45deg);
}

.descuento span {
  color: #f5f5f5;
  font-size: 17px;
  font-weight: bold;
  left: 26px;
  top: 70px;
  position: absolute;
  width: 80px;
}
.producto-imagen-detalle {
  height: 100%;
  width: 100%;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}

@media screen and (max-width: 767px) {
  .producto-imagen-detalle {
    height: 200px;
  }
}
</style>
