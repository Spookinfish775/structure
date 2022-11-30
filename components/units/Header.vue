<template>
  <div class="unit-header-links">
    <div v-for="(item, index) in linksData" :key="index" class="link-wrapper">
      <v-btn depressed :dark="item.dark" :color="item.color">
        {{ item.name }}
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UnitHeader',
  data() {
    return {
      linksData: [
        {
          name: 'Сотрудники',
          color: '#EEF2FA',
          dark: false,
          link: '/',
        },
        {
          name: 'Подразделения',
          color: '#F15929',
          dark: true,
          link: '/',
        },
        {
          name: 'Дочерние организации',
          color: '#EEF2FA',
          dark: false,
          link: '/',
        },
      ],
    }
  },
}
</script>

<style lang="scss">
.unit-header-links {
  display: flex;
  height: 60px;
  width: 100%;
  position: sticky;
  top: 0;
  background-color: $backgroundColor;
  z-index: 99;
  .link-wrapper {
    margin: 10px 4px;
  }
}
</style>