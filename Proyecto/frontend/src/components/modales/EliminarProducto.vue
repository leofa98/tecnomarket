<script>
import { push } from "notivue";

export default {
  emits: ["cargarProductos"],
  props: ["nomProducto", "id"],

  methods: {
    eliminarProducto() {
      fetch(`${this.backend}/producto/eliminar/${this.id}`, {
        method: "DELETE",
        headers: {
          Authorization: this.$cookies.get("token"),
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.status);
          }
          push.success("Producto eliminado correctamente");
          this.$emit("cargarProductos");
        })
        .catch((error) => {
          console.error(error);
          push.error("Error al eliminar el producto");
        });
      document.getElementById("btn-cerrar-eliminar-producto").click();
    },
  },
};
</script>
<template>
  <div class="modal fade" id="eliminarProductoModal" tabindex="-1">
    <div class="modal-dialog rounded-0">
      <div class="modal-content">
        <div class="modal-header border-0 d-block">
          <div class="text-end">
            <button
              id="btn-cerrar-eliminar-producto"
              type="button"
              data-bs-dismiss="modal"
              class="btn-close"
            ></button>
          </div>
          <h1 class="modal-title fs-5 text-center">Eliminar Producto</h1>
        </div>
        <div class="modal-body px-4 px-sm-5">
          <p class="text-center">
            ¿Seguro que deseas eliminar el producto "{{ nomProducto }}" ?
          </p>
        </div>
        <div class="modal-footer">
          <div class="row">
            <div class="col">
              <button @click="eliminarProducto" class="btn-confirmar">
                Sí
              </button>
            </div>
            <div class="col">
              <button data-bs-dismiss="modal" class="btn-cancelar">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.btn-confirmar {
  background: var(--degradado-naranja);
  border: 0;
  height: 2.5em;
  color: white;
  font-weight: bold;
  font-size: 18px;
  width: 100px;
  transition: all 0.2s ease;
}

.btn-confirmar:hover {
  filter: brightness(110%);
}

.btn-cancelar {
  border: 0;
  width: 100px;
  height: 2.5em;
  color: #333;
  font-weight: bold;
  font-size: 18px;
  transition: background 0.2s ease;
}
.modal-footer {
  justify-content: center !important;
  column-gap: 3em;
}
.btn-cancelar:hover {
  background-color: lightgray;
}
#eliminarProductoModal {
  color: var(--gris-oscuro);
}
#eliminarProductoModal .modal-title {
  font-size: 28px !important;
}

#eliminarProductoModal input {
  border-radius: 0px;
}

#eliminarProductoModal .modal-content {
  border-radius: 0px !important;
}
</style>
