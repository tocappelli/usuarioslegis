import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Table, TableContainer,TableHead,TableCell,TableBody,TableRow} from '@material-ui/core'

const Consultas = () => {

 const [data,setData]= useState([]);
 
 const apiURL= 'https://jsonplaceholder.typicode.com/todos/'

 const peticionesGet =async ()=>{
  await axios.get(apiURL)
  .then(response=>{
    setData(response.data)
  })
 }
 useEffect(async()=>{
await peticionesGet();
 },[])


  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripcion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(consola=>(
              <TableRow>
                <TableCell>{consola.userId}</TableCell>
                <TableCell>{consola.title}</TableCell>
              </TableRow>
            ) )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Consultas