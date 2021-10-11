import React, { useState } from 'react'
import Error from './Error'
import PropTypes from 'prop-types'

const Formulario = ({ busqueda, guardarBusqueda, guardarConsultar }) => {
  //Creo el State de error para validar el formulario:
  const [error, guardarError] = useState(false)

  //Hago un destructure de ciudad y pais
  const { ciudad, pais } = busqueda

  //Funcion que coloca los elementos en el state:
  const handleChange = e => {
    //Actualizo el state:
    guardarBusqueda({
      //Primero copio lo que tenia antes
      ...busqueda,
      //Luego le paso los nuevos valores
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    //Primero lo valido
    if (ciudad.trim() === '' || pais.trim() === '') {
      guardarError(true)
      return
    }
    guardarError(false)

    //Lo paso al componente principal
    guardarConsultar(true)
  }

  return (
    <form onSubmit={handleSubmit}>
      {error ? <Error mensaje='Todos los campos son obligatorios' /> : null}
      <div className='input-field col s12'>
        <input
          type='text'
          name='ciudad'
          id='ciudad'
          value={ciudad}
          onChange={handleChange}
        />
        <label htmlFor='ciudad'>Ciudad: </label>{' '}
        {/* En "label" no puedo usar "for", por lo que se usa "htmlfor" */}
      </div>

      <div className='input-field col s12'>
        <select name='pais' id='' value={pais} onChange={handleChange}>
          <option value=''>Seleccione un pais: </option>
          <option value='US'>Estados Unidos</option>
          <option value='MX'>México</option>
          <option value='AR'>Argentina</option>
          <option value='CO'>Colombia</option>
          <option value='CR'>Costa Rica</option>
          <option value='ES'>España</option>
          <option value='PE'>Perú</option>
        </select>
        <label htmlFor='pais'>Pais: </label>
      </div>
      <div className='input-field col s12'>
        <input
          type='submit'
          value='Buscar clima'
          className='waves-effect waves-light btn-large btn-block yellow accent-4'
        />
      </div>
    </form>
  )
}

Formulario.propTypes = {
  busqueda: PropTypes.object.isRequired,
  guardarBusqueda: PropTypes.func.isRequired,
  guardarConsultar: PropTypes.func.isRequired
}

export default Formulario
