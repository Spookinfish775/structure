export const state = () => ({

    units: [
        {
            id: "1",
            name: "Администрация",
            owner: "Макаренко Иван Сергеевич",
            countOfemployees: "76",
            parentUnitId: null
        },
        {
            id: "2",
            name: "IT Отдел",
            owner: "Иванов Сергей Федорович",
            countOfemployees: "92",
            parentUnitId: "1"
        },
        {
            id: "3",
            name: "Отдел маркетинга",
            owner: "Макаренко Иван Сергеевич",
            countOfemployees: "14",
            parentUnitId: null
        },
        {
            id: "4",
            name: "Отдел креатива",
            owner: "Алексеев Владимир Петрович",
            countOfemployees: "38",
            parentUnitId: "3"
        },
    ]

})

export const getters = {
    units(state) {
        return state.units
    },
    findUnitById(state, id) {
        return state.units.find(unit => unit.id === id)
    }
}

export const mutations = {
    pushToUnits(state, unit) {
        state.units.push(unit)
    },
    editUnit(state, unitToChange) {
        state.units = state.units.map(item => item.id === unitToChange.id ? {
            id: unitToChange.id,
            name: unitToChange.name,
            owner: unitToChange.owner,
            countOfemployees: unitToChange.countOfemployees,
            parentUnitId: unitToChange.parentUnitId
        } : item)
    },
    deleteUnit(state, unitToDelete) {
        const unitId = unitToDelete.id
        const indexOfUnit = state.units.findIndex(unit => unit.id === unitId)

        state.units.splice(indexOfUnit, 1)
    }
}

export const actions = {
    addToUnits({ commit }, unit) {
        commit('pushToUnits', unit)
    },
    updateUnit({ commit }, unit) {
        commit('editUnit', unit)
    },
    removeUnit({ commit }, unit) {
        commit('deleteUnit', unit)
    }
}