<script>
import { push } from 'notivue';
export default {
  props: ['producto'],
  emits: ['cargarProductos'],
  data() {
    return {
      id: 1,
      categorias: [],
      stock: 1,
      precio: 1.0,
      categoria: '',
      descripcion: '',
      descuento: 0,
      imagen: '',
      nomProducto: '',
    };
  },
  watch: {
    producto() {
      this.id = this.producto.id;
      this.stock = this.producto.stock;
      this.precio = this.producto.precio;
      this.categoria = this.producto.categoria.id;
      this.descripcion = this.producto.descripcion;
      this.descuento = this.producto.descuento;
      this.nomProducto = this.producto.nombre;
    },
  },

  methods: {
    cargarCategorias() {
      fetch(this.backend + '/categorias')
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error:${response.status}`);
          }
          return response;
        })
        .then((response) => response.json())
        .then((data) => {
          this.categorias = data;
        })
        .catch((error) => {
          console.error(`Error al obtener los datos: ${error}`);
        });
    },
    async editarProducto() {
      try {
        const imagen = this.imagen
          ? await this.toBase64(this.imagen)
          : this.producto.imagen;

        const response = await fetch(
          this.backend + '/producto/modificar/' + this.id,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.$cookies.get('token'),
            },
            body: JSON.stringify({
              stock: this.stock,
              precio: this.precio,
              idCategoria: this.categoria,
              descuento: this.descuento,
              imagen: imagen,
              nombre: this.nomProducto,
              descripcion: this.descripcion,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        push.success('Los cambios se han guardado con éxito');
        this.$emit('cargarProductos');
        document.getElementById('btn-cerrar-editar-producto').click();
        this.reiniciar();
      } catch (error) {
        push.error('Error al editar el producto');
        this.reiniciar();
      }
    },
    imagenProducto() {
      this.imagen = this.$refs.imgproducto.files[0];
    },

    reiniciar() {
      this.stock = 1;
      this.precio = 1.0;
      this.categoria = '';
      this.descuento = 0;
      this.imagen = '';
      this.nomProducto = '';
      this.descripcion = '';
    },
    toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (e) {
          resolve(e.target.result);
        };
        reader.onerror = function (error) {
          reject(error);
        };
        reader.readAsDataURL(file);
      });
    },
  },

  mounted() {
    this.cargarCategorias();
  },

  computed: {
    urlImagenTemporal() {
      return this.imagen ? URL.createObjectURL(this.imagen) : '';
    },
  },
};
</script>
<template>
  <div class="modal fade" id="editarProductoModal" tabindex="-1">
    <form @submit.prevent="editarProducto">
      <div class="modal-dialog modal-xl rounded-0">
        <div class="modal-content">
          <div class="modal-header border-0 d-block">
            <div class="text-end">
              <button
                id="btn-cerrar-editar-producto"
                type="button"
                @click="reiniciar"
                data-bs-dismiss="modal"
                class="btn-close"
              ></button>
            </div>
            <h1 class="modal-title fs-5 text-center">Editar Producto</h1>
          </div>
          <div class="modal-body px-4 px-sm-5">
            <div class="row">
              <div class="col-lg-6">
                <div class="mb-3">
                  <label for="nombre-producto-editar" class="form-label"
                    >Nombre del producto:</label
                  >
                  <input
                    v-model="nomProducto"
                    required
                    type="text"
                    class="form-control form-control"
                    id="nombre-producto-editar"
                  />
                </div>
                <div class="mb-3">
                  <label for="categoria-producto-editar" class="form-label"
                    >Categoría:</label
                  >
                  <select
                    required
                    v-model="categoria"
                    class="form-select"
                    name="categoria-producto"
                    id="categoria-producto-editar"
                  >
                    <option value="" selected disabled>
                      --Selecciona una categoria--
                    </option>
                    <option
                      v-for="categoria in categorias"
                      :key="categoria.id"
                      :value="categoria.id"
                    >
                      {{
                        categoria.descripcion.charAt(0).toUpperCase() +
                        categoria.descripcion.slice(1)
                      }}
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="descripcion-producto-editar" class="form-label"
                    >Descripción:</label
                  >
                  <textarea
                    rows="4"
                    required
                    v-model="descripcion"
                    class="form-control"
                    name="descripcion-producto"
                    id="descripcion-producto-editar"
                  >
                  </textarea>
                </div>

                <div class="mb-3 row">
                  <div class="col">
                    <label for="stock-editar" class="form-label d-block"
                      >Stock:</label
                    >
                    <input
                      v-model.number="stock"
                      required
                      min="1"
                      type="number"
                      class="form-control w-75 d-inline-block"
                      id="stock-editar"
                    />

                    <span class="w-25"> u.</span>
                  </div>
                  <div class="col">
                    <label for="precio-editar" class="form-label d-block"
                      >Precio:</label
                    >
                    <input
                      v-model.number="precio"
                      required
                      min="1"
                      step="0.01"
                      type="number"
                      class="form-control w-75 d-inline-block"
                      id="precio-editar"
                    />
                    <span class="w-25"> €</span>
                  </div>
                  <div class="col">
                    <label for="descuento-editar" class="form-label d-block"
                      >Descuento:</label
                    >
                    <input
                      v-model.number="descuento"
                      required
                      min="0"
                      max="100"
                      type="number"
                      class="form-control w-75 d-inline-block"
                      id="descuento-editar"
                    />
                    <span class="w-25"> %</span>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="mb-3">
                  <label for="imagen-producto-editar" class="form-label"
                    >Imagen:</label
                  >
                  <input
                    @change="imagenProducto"
                    type="file"
                    id="imagen-producto-editar"
                    ref="imgproducto"
                    class="form-control"
                    accept="image/png, image/gif, image/jpeg, image/jpg"
                  />
                  <div class="text-center img-prov mt-4">
                    <img
                      class="object-fit-contain w-100 h-100"
                      :src="
                        urlImagenTemporal ? urlImagenTemporal : producto?.imagen
                      "
                      alt="img-prov"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="row w-100">
              <div class="col-lg-6 offset-lg-6">
                <div class="row">
                  <div class="col">
                    <button type="submit" class="btn-editar mb-2 mt-2">
                      Guardar
                    </button>
                  </div>
                  <div class="col">
                    <button
                      type="button"
                      data-bs-dismiss="modal"
                      class="btn-cancelar mb-2 mt-2"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<style scoped>
.btn-editar {
  background: var(--degradado-naranja);
  border: 0;
  height: 2.7em;
  color: white;
  width: 100%;
  font-weight: bold;
  font-size: 18px;
  transition: filter 0.2s ease;
}

.btn-editar:hover {
  filter: brightness(110%);
}
.btn-cancelar {
  border: 0;
  width: 100%;
  height: 2.7em;
  color: #333;
  font-weight: bold;
  font-size: 18px;
  transition: background 0.2s ease;
}
.btn-cancelar:hover {
  background-color: lightgray;
}
#editarProductoModal .modal-title {
  font-size: 28px !important;
}

#editarProductoModal input,
#editarProductoModal select {
  border-radius: 0px;
}

#editarProductoModal .modal-content {
  border-radius: 0px !important;
}
.img-prov {
  height: 300px;
}
</style>
