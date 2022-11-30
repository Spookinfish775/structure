<template>
  <div class="main-content-wrapper">
    <div class="main-content">
      <UnitHeader />
      <div class="units-list">
        <div v-for="item in unitData" :key="item.id" class="unit-wrapper">
          <UnitCard :unit-data="item" @unitUpdated="unitUpdated" />
        </div>
        <UnitCreateCard :key="createKeyRerend" @newUnitAdded="newUnitAdded" />
      </div>
    </div>
  </div>
</template>

<script>
import UnitHeader from '~/components/units/Header.vue'
import UnitCard from '~/components/units/Card.vue'
import UnitCreateCard from '~/components/units/CreateCard.vue'

export default {
  name: 'IndexPage',
  components: {
    UnitHeader,
    UnitCard,
    UnitCreateCard,
  },
  data() {
    return {
      unitData: this.$store.getters.units,
      createKeyRerend: 10,
    }
  },
  methods: {
    newUnitAdded() {
      this.createKeyRerend += 1
    },
    unitUpdated() {
      this.unitData = this.$store.getters.units
    },
  },
}
</script>

<style lang="scss">
.main-content-wrapper {
  width: 100%;
  height: 100vh;
  background-color: $backgroundCardColor;
  display: flex;
  flex-direction: column;
  align-items: center;
  .main-content {
    margin: 100px 0 0 0;
    padding: 20px;
    background-color: $backgroundColor;
    width: 80%;
    height: 80%;
    border-radius: 10px;
    box-shadow: 0px 12px 24px rgba(138, 138, 138, 0.35);
    overflow-y: scroll;
    position: relative;
    .units-list {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      width: 700px;
    }
  }
}
</style>
