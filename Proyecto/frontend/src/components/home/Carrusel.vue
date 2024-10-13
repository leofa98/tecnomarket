<script></script>
<template>
  <div id="carousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button
        type="button"
        data-bs-target="#carousel"
        data-bs-slide-to="0"
        class="active"
        aria-current="true"
        aria-label="Slide 1"
      ></button>
      <button
        type="button"
        data-bs-target="#carousel"
        data-bs-slide-to="1"
        aria-label="Slide 2"
      ></button>
      <button
        type="button"
        data-bs-target="#carousel"
        data-bs-slide-to="2"
        aria-label="Slide 3"
      ></button>
    </div>
    <div class="carousel-inner position-relative">
      <div class="carousel-item active">
        <div class="overlay"></div>
        <img src="/img/img-carrusel.jpg" class="d-block w-100" alt="..." />
      </div>
      <div class="carousel-item">
        <div class="overlay"></div>
        <img src="/img/tienda-carrusel.jpg" class="d-block w-100" alt="..." />
      </div>
      <div class="carousel-item">
        <div class="overlay"></div>
        <img src="/img/teclado-banner.jpg" class="d-block w-100" alt="..." />
      </div>
      <div
        class="d-flex aligns-items-start align-items-sm-center pt-5 pt-sm-0 justify-content-center rotulo text-center"
      >
        <div>
          <h1>Lorem ipsum dolor sit.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            perspiciatis ex quam inventore! Eveniet, consequuntur.
          </p>
        </div>
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carousel"
      data-bs-slide="prev"
    >
      <span
        class="flecha-carrusel izquierda d-flex justify-content-center align-items-center"
        aria-hidden="true"
      >
        <font-awesome-icon
          :icon="['fass', 'arrow-left']"
          style="color: #ffffff"
        />
      </span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carousel"
      data-bs-slide="next"
    >
      <span
        class="flecha-carrusel derecha d-flex justify-content-center align-items-center"
        aria-hidden="true"
      >
        <font-awesome-icon
          :icon="['fass', 'arrow-right']"
          style="color: #ffffff"
        />
      </span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<style scoped>
.carousel,
.carousel-item,
.carousel-control-next {
  min-height: 320px;
  height: 36vw;
}

.carousel-item img {
  object-fit: cover;
  top: 0;
  left: 0;
  min-height: 320px;
  height: 36vw;
}

.carousel-item .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.carousel-item img {
  z-index: 0;
}

.carousel-control-next-button {
  background: none;
  border-width: 2px 0px 2px 2px;
  border-style: solid;
  border-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0px;
  position: absolute;
  width: 70px;
  height: 70px;
  font-size: 24px;
}
.carousel-indicators button {
  border-radius: 50%;
  width: 11px;
  height: 11px;
}

.carousel-indicators button.active {
  background-color: var(--color-secundario-naranja);
}
.carousel-control-prev {
  z-index: 2;
}

.carousel-control-next {
  z-index: 2;
}
.flecha-carrusel {
  background-color: var(--color-secundario-naranja);
  width: 45px;
  height: 45px;
  border-radius: 50%;
  font-size: 24px;
  z-index: 3;
}

.izquierda {
  margin-left: 20px;
}

.derecha {
  margin-right: 20px;
}
.rotulo {
  position: absolute;
  right: 0;
  color: white;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.rotulo h1 {
  font-size: 70px;
  margin-bottom: 0.3em;
}
.rotulo p {
  font-size: 22px;
}

@media screen and (max-width: 1200px) {
  .rotulo h1 {
    font-size: 60px;
  }

  .rotulo p {
    font-size: 19px;
  }
}
@media screen and (max-width: 992px) {
  .rotulo h1 {
    font-size: 38px;
  }

  .rotulo p {
    font-size: 16px;
  }
}

@media screen and (max-width: 768px) {
  .rotulo h1 {
    font-size: 35px;
    margin-bottom: 0.2em;
  }

  .rotulo p {
    font-size: 13px;
  }
}

@media screen and (max-width: 576px) {
  .rotulo h1 {
    font-size: 35px;
    margin-bottom: 0.2em;
  }

  .rotulo p {
    font-size: 13px;
  }
}

.rotulo div {
  width: 68%;
}
.carousel-control-prev {
  width: 90px;
}

.carousel-control-next {
  width: 90px;
}

@media screen and (max-width: 576px) {
  .flecha-carrusel {
    position: absolute;
    bottom: 20px;
  }
}
</style>
