import React, {useState, useEffect} from 'react'
import { useForm } from "react-hook-form";
import { connect } from 'react-redux'
import {AddTodos, DeleteTodos, UpdateTodos} from '../../Store/Action/todos'
// import axios from '../../../node_modules/axios/dist/axios.js'
import Table from '../Table/Table.jsx'

const Form = (props) => {
  const { todos, addTodo, deleteTodo, updateTodos } = props
  // console.log(todos)
    const [data, setData] = useState([]) 
    const [Id, setId] = useState(null)

  useEffect(() => {
      setData(todos)
      // const getData = () => {
      //       axios.get("http://localhost:3000/list").then((respone) => {
      //           // console.log(respone.data)
      //           setData(respone.data)
      //       }).catch((errors) => {
      //         // console.log(errors)
      //       });
      //   }
      // getData()
    }, [todos, Id])

     const { handleSubmit, register, setValue, errors } = useForm();
  const onSubmit = (values, e) => {

    if (Id !== null) {
      const obj = {
        Id,
        values
      }
      updateTodos(obj)
      console.log('update')
      setId(null)
    }
    else {
      addTodo(values)
      console.log('create')
    }
      e.target.reset();
    }

    ;
    
  const onRemove = (id) => {
    deleteTodo(id)
    // console.log(id)
        // axios.delete(`http://localhost:3000/list/${id}`).then((respone) => {
        //     const newData = data.filter((item) => {
        //         if (item.id === id) return false
        //         return true
        //     })
        //     setData(newData)
        // }).catch((error) => {
        //     console.log(error)
        // });
    }

  const onUpdate = (id) => {
    setId(id)
    const findItem = data.find((item) => item.id === id)
    if (findItem) {
      setValue('list', findItem.list, {
        shouldValidate: true,
        shouldDirty: true,
      })
      setValue("Activites", findItem.Activites, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }; 
  
    

    return (
      <div className="container">
        <div className="form-group">
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="list">Day:</label>
            <input
              type="text"
              name="list"
              className="form-control"
              placeholder="Day"
              ref={register({
                required: "Required",
              })}
            />
            {errors.list && errors.list.message}
            <br />
            <label htmlFor="Activites">Activites:</label>
            <input
              type="text"
              name="Activites"
              className="form-control"
              placeholder="Activites"
              ref={register({
                required: "Required",
              })}
            />
            {errors.list && errors.list.message}
            <br />
            <button type="submit" className="btn btn-success">
              {Id ? "update" : "Create"}
            </button>
          </form>
        </div>
        <br />
        <Table todo={data} key={data.id} remove={onRemove} update={onUpdate} />
      </div>
    );

}

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (value) => dispatch(AddTodos(value)),
    deleteTodo: (id) => dispatch(DeleteTodos(id)),
    updateTodos: (values) => dispatch(UpdateTodos(values))
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)

