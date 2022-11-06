import React, {useState} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import "./Formulario.css"


const Formulario = () => {
  const [formularioEnviado, setFormularioEnviado] = useState (false)

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


   }),


   onSubmit: values => {
    setFormularioEnviado(true)
    setTimeout(()=> setFormularioEnviado(false), 3000 )
    console.log (values); 
    
   }

   
})


  return (
    
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
      
        <input className='bg-primary' type="submit" value="Enviar" />
        {formularioEnviado && <p className='exito'>Formulario enviado con exito!</p>}
      
       </form>
       
       
  )
}

export default Formulario
