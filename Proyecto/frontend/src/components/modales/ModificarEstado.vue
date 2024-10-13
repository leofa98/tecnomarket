<script>
import { push } from 'notivue';

export default {
  emits: ['cargarPedidos'],
  props: ['id', 'estadoActual'],
  data() {
    return {
      estado: this.estadoActual,
    };
  },

  methods: {
    modificarEstado() {
      fetch(this.backend + '/pedidos/modificar-estado/' + this.id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.$cookies.get('token'),
        },
        body: JSON.stringify({
          estado: this.estado,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.status);
          }
          this.$emit('cargarPedidos');
          push.info('El estado del pedido ha sido modificado');
          document.getElementById('btn-cerrar-modificar-estado').click();
        })
        .catch((error) => {
          push.info('Error al modificar el estado');
          console.error(error);
        });
    },
  },
};
</script>
<template>
  <div class="modal fade" id="modificarEstadoPedido" tabindex="-1">
    <div class="modal-dialog rounded-0">
      <div class="modal-content">
        <div class="modal-header border-0 d-block">
          <div class="text-end">
            <button
              id="btn-cerrar-modificar-estado"
              type="button"
              data-bs-dismiss="modal"
              class="btn-close"
            ></button>
          </div>
          <h1 class="modal-title fs-5 text-center">Modificar Estado</h1>
        </div>
        <div class="modal-body px-4 px-sm-5">
          <div class="d-flex justify-content-center gap-3">
            <input
              type="radio"
              class="btn-check"
              name="options-outlined"
              id="btn-pendiente"
              value="Pendiente"
              v-model="estado"
              :checked="this.estadoActual == 'Pendiente'"
            />
            <label class="btn btn-outline-warning" for="btn-pendiente"
              >Pendiente</label
            >
            <input
              type="radio"
              class="btn-check"
              name="options-outlined"
              id="btn-enviado"
              value="Enviado"
              v-model="estado"
              :checked="this.estadoActual == 'Enviado'"
            />
            <label class="btn btn-outline-primary" for="btn-enviado"
              >Enviado</label
            >
            <input
              type="radio"
              class="btn-check"
              name="options-outlined"
              id="btn-entregado"
              value="Entregado"
              v-model="estado"
              :checked="this.estadoActual == 'Entregado'"
            />
            <label class="btn btn-outline-success" for="btn-entregado"
              >Entregado</label
            >
          </div>
        </div>
        <div class="modal-footer">
          <div class="row">
            <div class="col">
              <button @click="modificarEstado" class="btn-confirmar">
                Guardar
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
label {
  border-radius: 0px !important;
  height: 2.5em;
  width: 110px;
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
#modificarEstadoPedido {
  color: var(--gris-oscuro);
}
#modificarEstadoPedido .modal-title {
  font-size: 28px !important;
}

#modificarEstadoPedido input {
  border-radius: 0px;
}

#modificarEstadoPedido .modal-content {
  border-radius: 0px !important;
}
</style>
