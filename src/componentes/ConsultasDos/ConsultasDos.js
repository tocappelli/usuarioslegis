import React, {useEffect, useState} from 'react';
//import './App.css';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';

import {useFormik} from 'formik'
import * as Yup from 'yup'
import "../Formulario/Formulario.css"

const baseUrl='https://jsonplaceholder.typicode.com/users'

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute', 
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  }
}));

function ConsultasDos() {
const styles= useStyles();
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]=useState(false);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);

  const [consolaSeleccionada, setConsolaSeleccionada]=useState({
    nombre: '',
    empresa:'',
    lanzamiento: '',
    unidades_vendidas: ''
  })

  const handleChange=e=>{
    const {name, value}=e.target;
    setConsolaSeleccionada(prevState=>({
      ...prevState,
      [name]: value
    }))
    console.log(consolaSeleccionada);
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    })
  }

  const peticionPost=async()=>{
    await axios.post(baseUrl, consolaSeleccionada)
    .then(response=>{
      setData(data.concat(response.data))
      abrirCerrarModalInsertar()
    })
  }

  const peticionPut=async()=>{
    await axios.put(baseUrl+consolaSeleccionada.id, consolaSeleccionada)
    .then(response=>{
      var dataNueva=data;
      dataNueva.map(consola=>{
        if(consolaSeleccionada.id===consola.id){
          consola.nombre=consolaSeleccionada.nombre;
          consola.lanzamiento=consolaSeleccionada.lanzamiento;
          consola.empresa=consolaSeleccionada.empresa;
          consola.unidades_vendidas=consolaSeleccionada.unidades_vendidas;
        }
      })
      setData(dataNueva);
      abrirCerrarModalEditar();
    })
  }

  const peticionDelete=async()=>{
    await axios.delete(baseUrl+consolaSeleccionada.id)
    .then(response=>{
      setData(data.filter(consola=>consola.id!==consolaSeleccionada.id));
      abrirCerrarModalEliminar();
    })
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const seleccionarConsola=(consola, caso)=>{
    setConsolaSeleccionada(consola);
    (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
  }

  useEffect(async()=>{
    await peticionGet();
  },[])


   // Nuevo formulario modal

   const formik = useFormik({
    initialValues: {name: "", surname: "", email: ""},
    
    
    validationSchema: Yup.object({
     name: Yup.string()
     .required ("Campo requerido"),
     surname: Yup.string()
     .required ("Campo requerido"),
     email: Yup.string()
     .required ("Campo Email obligatorio")
     .email('El formato del Email es incorrecto')
 
 
    })})



  const bodyInsertar=(
    <form className='formulario' onSubmit={formik.handleSubmit}>
      <div>
        <label>Nombre</label>
        <input 
        type="text" 
        name='name' 
        id='name'
        placeholder='Nombre'
        onChange={formik.handleChange}
        onBlur= {formik.handleBlur}
        value= {formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className='text-danger'>{formik.errors.name}</div>
        ): null}
      </div>
      <div>
        <label>Apellido</label>
        <input
        type="text" 
        name='surname' 
        id='surname'
        placeholder='Apellido' 
        onChange={formik.handleChange}
        onBlur= {formik.handleBlur}
        value= {formik.values.surname}
        />
         {formik.touched.surname && formik.errors.surname ? (
          <div className='text-danger'>{formik.errors.surname}</div>
        ): null}
       
      </div>
      
      <div>
        <label>Correo Personal</label>
        <input
         
        type="text" 
        name='email' 
        id='email'
        placeholder='correo@correo.com' 
        onChange={formik.handleChange}
        onBlur= {formik.handleBlur}
        value= {formik.values.email}
        />
         {formik.touched.email && formik.errors.email ? (
          <div className='text-danger'>{formik.errors.email}</div>
        ): null}
      </div>
      
        
        <Button color="primary" onClick={()=>peticionPost()}>Insertar</Button>
        <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
      
       </form>
       
  )

  const bodyEditar=(
    <div className={styles.modal}>
      <h3>Editar Consola</h3>
      <TextField name="nombre" className={styles.inputMaterial} label="Nombre" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.nombre}/>
      <br />
      <TextField name="empresa" className={styles.inputMaterial} label="Empresa" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.empresa}/>
      <br />
      <TextField name="lanzamiento" className={styles.inputMaterial} label="Lanzamiento" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.lanzamiento}/>
      <br />
      <TextField name="unidades_vendidas" className={styles.inputMaterial} label="Unidades Vendidas" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.unidades_vendidas}/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEliminar=(
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar la consola <b>{consolaSeleccionada && consolaSeleccionada.nombre}</b> ? </p>
      <div align="right">
        <Button color="secondary" onClick={()=>peticionDelete()} >Sí</Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>

      </div>

    </div>
  )


  return (
    <div className="App">
      <br />
    <Button onClick={()=>abrirCerrarModalInsertar()}>Insertar</Button>
      <br /><br />
     <TableContainer>
       <Table>
         <TableHead>
           <TableRow>
             <TableCell>Nombre</TableCell>
             <TableCell>Empresa</TableCell>
             <TableCell>Año de Lanzamiento</TableCell>
             <TableCell>Unidades Vendidas (millones)</TableCell>
             <TableCell>Acciones</TableCell>
           </TableRow>
         </TableHead>

         <TableBody>
           {data.map(consola=>(
             <TableRow key={consola.id}>
               <TableCell>{consola.name}</TableCell>
               <TableCell>{consola.name}</TableCell>
               <TableCell>{consola.email}</TableCell>
               <TableCell>{consola.email}</TableCell>
               <TableCell>
                 <Edit className={styles.iconos} onClick={()=>seleccionarConsola(consola, 'Editar')}/>
                 &nbsp;&nbsp;&nbsp;
                 <Delete  className={styles.iconos} onClick={()=>seleccionarConsola(consola, 'Eliminar')}/>
                 </TableCell>
             </TableRow>
           ))}
         </TableBody>
       </Table>
     </TableContainer>
     
     <Modal
     open={modalInsertar}
     onClose={abrirCerrarModalInsertar}>
        {bodyInsertar}
     </Modal>

     <Modal
     open={modalEditar}
     onClose={abrirCerrarModalEditar}>
        {bodyEditar}
     </Modal>

     <Modal
     open={modalEliminar}
     onClose={abrirCerrarModalEliminar}>
        {bodyEliminar}
     </Modal>
    </div>
  );
}

export default ConsultasDos;