<template>
  <v-dialog v-model="dialog" persistent width="540px">
    <template #activator="{ on, attrs }">
      <div
        class="unit-create-card"
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
      >
        <v-img max-width="18px" src="/images/add.svg" />
      </div>
    </template>
    <v-card>
      <v-card-title> Новое подразделение </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="name"
            outlined
            placeholder="Название подразделения"
            :rules="inputRules"
            required
          />
          <v-text-field
            v-model="owner"
            outlined
            placeholder="Руководитель подразделения"
            :rules="inputRules"
            required
          />
          <v-text-field
            v-model="countOfemployees"
            outlined
            placeholder="Количество работников"
            :rules="inputRules"
            required
            type="number"
          />
          <v-select
            v-model="parentUnitId"
            outlined
            :items="units"
            placeholder="Руководящее подразделение"
            item-text="name"
            item-value="id"
          ></v-select>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          width="50%"
          height="56px"
          color="#F15929"
          dark
          depressed
          @click="saveUnit"
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
</template>

<script>
export default {
  name: 'UnitCreateCard',

  data() {
    return {
      valid: true,
      dialog: false,
      name: null,
      owner: null,
      countOfemployees: null,
      parentUnitId: null,
      inputRules: [(v) => !!v || 'Поле обязательно к заполнению'],
    }
  },
  computed: {
    units() {
      return this.$store.getters.units
    },
  },
  methods: {
    saveUnit() {
      const result = this.$refs.form.validate()
      if (result) {
        const newUnit = {
          name: this.name,
          owner: this.owner,
          countOfemployees: this.countOfemployees,
          parentUnitId: this.parentUnitId,
          id: this.$store.getters.units.length + 1,
        }

        this.$store.dispatch('addToUnits', newUnit)
        this.dialog = false
        this.$emit('newUnitAdded')
        // this.name = null
        // this.owner = null
        // this.countOfemployees = null
        // this.parentUnitId = null
      }
    },
  },
}
</script>

<style lang="scss">
.unit-create-card {
  width: 326px;
  height: 184px;
  margin: 14px 10px;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  background-color: $lightOrangeColor;
  box-shadow: 0px 12px 24px rgba(138, 138, 138, 0.15);
  transition: 0.4s;
  &:hover {
    background-color: #ffe6bf;
    transform: scale(1.02);
  }
  &:active {
    transform: scale(1.01);
  }
}
</style>