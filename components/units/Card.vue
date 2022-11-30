<template>
  <div class="unit-card">
    <div class="unit-card-header">
      <h3 class="unit-card-name">{{ unitData.name }}</h3>
      <v-dialog v-model="dialog" persistent width="540px">
        <template #activator="{ on, attrs }">
          <v-btn
            depressed
            min-width="24px"
            min-height="24px"
            max-height="24px"
            max-width="24px"
            small
            color="#FFF0D9"
            v-bind="attrs"
            v-on="on"
          >
            <v-img max-width="16px" src="/images/edit-button-icon.svg" />
          </v-btn>
        </template>
        <v-card>
          <v-card-title> Изменение подразделения </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="unitDataToChange.name"
                outlined
                placeholder="Название подразделения"
                :rules="inputRules"
                required
              />
              <v-text-field
                v-model="unitDataToChange.owner"
                outlined
                placeholder="Руководитель подразделения"
                :rules="inputRules"
                required
              />
              <v-text-field
                v-model="unitDataToChange.countOfemployees"
                outlined
                placeholder="Количество работников"
                :rules="inputRules"
                required
                type="number"
              />
              <v-select
                v-model="unitDataToChange.parentUnitId"
                outlined
                :items="units"
                placeholder="Руководящее подразделение"
                item-text="name"
                item-value="id"
              ></v-select>
            </v-form>
            <v-btn
              width="100%"
              height="46px"
              color="#ff0000"
              dark
              depressed
              @click="deleteUnit"
            >
              Удалить
            </v-btn>
          </v-card-text>
          <v-card-actions>
            <v-btn
              width="50%"
              height="56px"
              color="#F15929"
              dark
              depressed
              @click="updateUnit"
            >
              Сохранить
            </v-btn>
            <v-btn
              width="50%"
              height="56px"
              color="#FFF0D9"
              depressed
              @click="dialog = false"
            >
              Отменить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div :key="keyForRerend" class="unit-card-body">
      <div class="body-item">
        <p class="item-title">Руководитель</p>
        <p class="item-value">{{ unitData.owner }}</p>
      </div>
      <div class="body-item">
        <p class="item-title">Количество работников</p>
        <p class="item-value">{{ unitData.countOfemployees }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UnitCard',

  props: {
    unitData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      unitDataToChange: {
        id: this.unitData.id,
        name: this.unitData.name,
        owner: this.unitData.owner,
        countOfemployees: this.unitData.countOfemployees,
        parentUnitId: this.unitData.parentUnitId,
      },
      dialog: false,
      valid: true,
      inputRules: [(v) => !!v || 'Поле обязательно к заполнению'],
      keyForRerend: 0,
    }
  },
  computed: {
    units() {
      return this.$store.getters.units.filter(
        (unit) => unit.id !== this.unitData.id
      )
    },
  },
  methods: {
    updateUnit() {
      this.$store.dispatch('updateUnit', this.unitDataToChange)
      this.dialog = false
      this.$emit('unitUpdated')
    },
    deleteUnit() {
      this.$store.dispatch('removeUnit', this.unitDataToChange)
      this.dialog = false
    },
  },
}
</script>

<style lang="scss">
.unit-card {
  width: 326px;
  height: 184px;
  margin: 14px 10px;
  padding: 16px;
  border-radius: 24px;
  background-color: $backgroundCardColor;
  box-shadow: 0px 12px 24px rgba(138, 138, 138, 0.15);
  transition: 0.4s;
  color: $almostBlackColor;
  font-size: 16px !important;
  &:hover {
    background-color: $grayColor;
    transform: scale(1.02);
  }
  .unit-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .unit-card-name {
      font-size: 16px;
      font-weight: 500;
    }
  }
  .unit-card-body {
    display: flex;
    flex-direction: column;
    .body-item {
      margin-top: 20px;
      .item-title {
        margin: 0;
        color: $lightGrayColor;
        font-size: 12px;
        line-height: 16px;
      }
      .item-value {
        margin: 8px 0 0 0;
        color: $almostBlackColor;
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
}
</style>