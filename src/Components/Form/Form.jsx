import React, {useState, useEffect} from 'react'
import { useForm } from "react-hook-form";
import axios from '../../../node_modules/axios/dist/axios.js'
import Table from '../Table/Table.jsx'

const Form = () => {
    const [data, setData] = useState([]) 
    const [update, setId] = useState({})

    useEffect(() => {
      const getData = () => {
            axios.get("http://localhost:3000/list").then((respone) => {
                // console.log(respone.data)
                setData(respone.data)
            }).catch((errors) => {
              // console.log(errors)
            });
        }
      getData()
    }, [])

     const { handleSubmit, register, setValue, errors } = useForm();
  const onSubmit = (values, e) => {
    // console.log(update)
    if (update) {
        const getUpdate = () => {
          axios.put(`http://localhost:3000/list/${update}`, values).then((respone) => {
            console.log('berhasil update')
          });
        }
    }else {
      axios
        .post("http://localhost:3000/list", values)
        .then((respone) => {
          // console.log('data masuk', respone.data)
          setData([...data, respone.data]);
        })
        .catch((errors) => {
          // console.log('post error')
        });
    }
       e.target.reset(); 
  }
       
    ;
    
  const onRemove = (id) => {
        axios.delete(`http://localhost:3000/list/${id}`).then((respone) => {
            const newData = data.filter((item) => {
                if (item.id === id) return false
                return true
            })
            setData(newData)
        }).catch((error) => {
            console.log(error)
        });
    }

  const onUpdate = (id) => {

    // console.log(id)
  
    axios.get(`http://localhost:3000/list/${id}`).then((respone) => {
      // console.log(respone.data)
      setId(respone.data.id)
      setValue("list", respone.data.list);
      setValue("Activites", respone.data.Activites);

    })
} 
    

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
              Submit
            </button>
          </form>
        </div>
        <br />
        <Table todo={data} key={data.id} remove={onRemove} update={onUpdate} />
      </div>
    );

}

export default Form

