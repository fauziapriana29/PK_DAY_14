import * as actionType from './actionType'

export const AddTodos = (values) => {
    return {
        type: actionType.ADD_TODOS,
        payload: values,
    }
}

export const DeleteTodos = (id) => {
    return {
        type: actionType.DELETE_TODOS,
        payload: id
    }
}

export const UpdateTodos = (values) => {
    return {
        type: actionType.UPDATE_TODOS,
        payload: values
    }
}