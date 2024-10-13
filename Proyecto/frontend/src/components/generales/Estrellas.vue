<script>
export default {
  props: ['numResenhas', 'mediaValoraciones', 'valoracion'],
};
</script>
<template>
  <div class="d-flex align-items-center">
    <div class="ratings">
      <font-awesome-icon
        icon="fa-solid fa-star"
        :class="{
          'rating-color':
            Math.round(mediaValoraciones) >= 1 || Math.round(valoracion) >= 1,
        }"
      />
      <font-awesome-icon
        icon="fa-solid fa-star"
        :class="{
          'rating-color':
            Math.round(mediaValoraciones) >= 2 || Math.round(valoracion) >= 2,
        }"
      />
      <font-awesome-icon
        icon="fa-solid fa-star"
        :class="{
          'rating-color':
            Math.round(mediaValoraciones) >= 3 || Math.round(valoracion) >= 3,
        }"
      />
      <font-awesome-icon
        icon="fa-solid fa-star"
        :class="{
          'rating-color':
            Math.round(mediaValoraciones) >= 4 || Math.round(valoracion) >= 4,
        }"
      />
      <font-awesome-icon
        icon="fa-solid fa-star"
        :class="{
          'rating-color':
            Math.round(mediaValoraciones) >= 5 || Math.round(valoracion) >= 5,
        }"
      />
    </div>
    <span v-if="numResenhas">({{ numResenhas }})</span>
    <span v-if="valoracion">{{ valoracion }}</span>
  </div>
</template>

<style scoped>
.ratings {
  margin-right: 10px;
}

.ratings > * {
  color: #cecece;
  font-size: 16px;
}

.rating-color {
  color: #fbc634 !important;
}

.review-count {
  font-weight: 400;
  margin-bottom: 2px;
  font-size: 24px !important;
}

.small-ratings > * {
  color: #cecece;
}

.review-stat {
  font-weight: 300;
  font-size: 18px;
  margin-bottom: 2px;
}
</style>
