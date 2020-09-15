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
  // console.log(payload)
  const Index = state.findIndex((list) => {
    console.log(list.id)
    return list.id === payload-1
  })
  console.log(payload-1)
        let newArray = [...state]
  newArray[Index] = state
  return[newArray]

  // const newArray = state.filter((item) => {
  //   if (state.id = payload.id) {
  //     const index = state.findIndex((item) => {
  //       return item.id === payload.id
  //     })
  //     let newList = [...state]
  //     newList[index] = state
  //     return newList
  //   }

  // })
  // console.log(index)
  
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