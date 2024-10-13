<script>
import { push } from 'notivue';
export default {
  emits: ['actualizarProductos'],
  data() {
    return {
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
    async anhadirProducto() {
      try {
        const imagenBase64 = await this.toBase64(this.imagen);
        const response = await fetch(this.backend + '/producto/crear', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$cookies.get('token'),
          },
          body: JSON.stringify({
            stock: this.stock,
            precio: this.precio,
            idCategoria: this.categoria,
            descuento: this.descuento,
            imagen: imagenBase64,
            nombre: this.nomProducto,
            descripcion: this.descripcion,
          }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        push.success('El producto ha sido añadido con éxito');
        this.$emit('actualizarProductos');
        document.getElementById('btn-cerrar-anhadir-producto').click();
        this.reiniciar();
      } catch (error) {
        push.error('Error al añadir el producto');
        console.error(error);
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
  <div class="modal fade" id="anhadirProductoModal" tabindex="-1">
    <form @submit.prevent="anhadirProducto">
      <div class="modal-dialog modal-xl rounded-0">
        <div class="modal-content">
          <div class="modal-header border-0 d-block">
            <div class="text-end">
              <button
                id="btn-cerrar-anhadir-producto"
                type="button"
                @click="reiniciar"
                data-bs-dismiss="modal"
                class="btn-close"
              ></button>
            </div>
            <h1 class="modal-title fs-5 text-center">Añadir Producto</h1>
          </div>
          <div class="modal-body px-4 px-sm-5">
            <div class="row">
              <div class="col-lg-6">
                <div class="mb-3">
                  <label for="nombre-producto-anhadir" class="form-label"
                    >Nombre del producto:</label
                  >
                  <input
                    v-model="nomProducto"
                    required
                    type="text"
                    class="form-control form-control"
                    id="nombre-producto-anhadir"
                  />
                </div>
                <div class="mb-3">
                  <label for="categoria-producto-anhadir" class="form-label"
                    >Categoría:</label
                  >
                  <select
                    required
                    v-model="categoria"
                    class="form-select"
                    name="categoria-producto"
                    id="categoria-producto-anhadir"
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
                  <label for="descripcion-producto-anhadir" class="form-label"
                    >Descripción:</label
                  >
                  <textarea
                    required
                    v-model="descripcion"
                    class="form-control"
                    rows="4"
                    name="descripcion-producto"
                    id="descripcion-producto-anhadir"
                  >
                  </textarea>
                </div>

                <div class="mb-3 row">
                  <div class="col">
                    <label for="stock-anhadir" class="form-label d-block"
                      >Stock:</label
                    >
                    <input
                      v-model.number="stock"
                      required
                      min="1"
                      type="number"
                      class="form-control w-75 d-inline-block"
                      id="stock-anhadir"
                    />

                    <span class="w-25"> u.</span>
                  </div>
                  <div class="col">
                    <label for="precio-anhadir" class="form-label d-block"
                      >Precio:</label
                    >
                    <input
                      v-model.number="precio"
                      required
                      min="1"
                      step="0.01"
                      type="number"
                      class="form-control w-75 d-inline-block"
                      id="precio-anhadir"
                    />
                    <span class="w-25"> €</span>
                  </div>
                  <div class="col">
                    <label for="descuento-anhadir" class="form-label d-block"
                      >Descuento:</label
                    >
                    <input
                      v-model.number="descuento"
                      required
                      min="0"
                      max="100"
                      type="number"
                      class="form-control w-75 d-inline-block"
                      id="descuento-anhadir"
                    />
                    <span class="w-25"> %</span>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="mb-3">
                  <label for="imagen-producto-anhadir" class="form-label"
                    >Imagen:</label
                  >
                  <input
                    @change="imagenProducto"
                    required
                    type="file"
                    id="imagen-producto-anhadir"
                    ref="imgproducto"
                    class="form-control"
                    accept="image/png, image/gif, image/jpeg, image/jpg"
                  />
                  <div v-if="imagen" class="text-center img-prov mt-4">
                    <img
                      class="object-fit-contain w-100 h-100"
                      v-if="urlImagenTemporal"
                      :src="urlImagenTemporal"
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
                    <button type="submit" class="btn-anhadir mb-2 mt-2">
                      Añadir
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
.btn-anhadir {
  background: var(--degradado-naranja);
  border: 0;
  height: 2.7em;
  width: 100%;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: filter 0.2s ease;
}

.btn-anhadir:hover {
  filter: brightness(110%);
}

#anhadirProductoModal .modal-title {
  font-size: 28px !important;
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
#anhadirProductoModal input,
#anhadirProductoModal select {
  border-radius: 0px;
}

#anhadirProductoModal .modal-content {
  border-radius: 0px !important;
}
.img-prov {
  height: 250px;
}
</style>
