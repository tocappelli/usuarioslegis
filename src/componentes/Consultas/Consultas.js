import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Table, TableContainer,TableHead,TableCell,TableBody,TableRow} from '@material-ui/core'
import Input from '@mui/material/Input';
import './Consultas.css'
import { Ring } from '@uiball/loaders'





const Consultas = () => {

// const [data,setData]= useState([]);
 const [search,setSearch]= useState("");
 const [ users, setUsers ] = useState([])
 const [loading,setLoading] = useState(true)
 
 const URL= 'https://jsonplaceholder.typicode.com/users'
/*
 const peticionesGet =async ()=>{
  await axios.get(apiURL)
  .then(response=>{
    setData(response.data)
  })
 }
 useEffect(async()=>{
await peticionesGet();
 },[])
 useEffect(async()=>{
 searcher();
   },[])
   */
 
 

 //metodo de busqueda
const searcher =(e)=>{
  setSearch(e.target.value)
  console.log(e.target.value)
}

//metodo de filtrado

const results = !search ? users : users.filter((dato)=> dato.name.toLowerCase().includes(search.toLocaleLowerCase()))





  
   useEffect( ()=> {

    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
    }, 3000);
      const showData = async () => {
      const response = await fetch(URL)
      const data = await response.json()
      //console.log(data)
      setUsers(data)
    } 

    showData()
    
  },[])

  //loading
if(loading){
  return <div className="d-flex justify-content-center ">
  <Ring 
   size={50}
   lineWeight={4}
   speed={3} 
   color="#8665e0" 
  />
  </div>
  }





  return (
    <div>
      <div>
      <input value={search} onChange={searcher} type="text" placeholder='search' className='form-control searchContainer' />
      </div>
      <TableContainer className='mt-5 dataContainer '>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><h1>Nombre</h1></TableCell>
              <TableCell><h1>Descripcion</h1></TableCell>
              <TableCell><h1>Descripcion</h1></TableCell>
              <TableCell><h1>Descripcion</h1></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map(consola=>(
              <TableRow key={consola.id}>
                <TableCell>{consola.name}</TableCell>
                <TableCell>{consola.email}</TableCell>
                <TableCell>{consola.email}</TableCell>
                <TableCell>{consola.email}</TableCell>
              </TableRow>
            ) )}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
  )
}

export default Consultas