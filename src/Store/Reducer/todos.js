import * as actionType from "../Action/actionType"
const initialState = []
let countId = 1


const addTodo = (state, payload) => {
    return [
        ...state,
          {
            id: countId++,
            list: payload.list,
            Activites: payload.Activites,
          },
    ]
}

const deleteItem = (state, payload) => {
    const updateArray = state.filter((item) => item.id !== payload)
    return [...updateArray]
}   

const updateTodos = (state, payload) => {
  const obj = {
    Id: payload.Id,
    list: payload.values.list,
    Activites: payload.values.Activites
  }
  const Index = state.findIndex((item) => {
    return item.id === obj.Id
  })
  console.log(Index)
  let newArray = [...state]
  newArray[Index] = obj
  return newArray
}

const todos = (state = initialState, action) => {
    const {payload} = action
    switch (action.type) {
      case actionType.ADD_TODOS:
        // console.log(action.payload)
        return addTodo(state, payload)
      case actionType.DELETE_TODOS:
            return deleteItem(state, payload)
        case actionType.UPDATE_TODOS:
            return updateTodos(state, payload)
      default:
        return state;
    }
}

export default todos