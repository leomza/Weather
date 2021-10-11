import React from 'react'
import PropTypes from 'prop-types'

const Clima = ({ resultado }) => {
  //Extraigo los valores de resultado
  const { name, main } = resultado

  //En caso de que no haya nombre no muestre nada
  if (!name) {
    return null
  }

  //La temperatura la devuelve en grados Kelvin, por lo que debo convertirla a grados Celcius
  const kelvin = 273.15

  return (
    <div className='card-panel white col s12'>
      <div className='black-text'>
        <h2>El clima de {name} es: </h2>
        <p className='temperatura'>
          {parseFloat(main.temp - kelvin).toFixed(2)}
          <span> &#x2103;</span>
        </p>
        <p>
          {' '}
          Temperatura Máxima:
          {parseFloat(main.temp_max - kelvin).toFixed(2)}
          <span> &#x2103;</span>
        </p>
        <p>
          {' '}
          Temperatura Mínima:
          {parseFloat(main.temp_min - kelvin).toFixed(2)}
          <span> &#x2103;</span>
        </p>
      </div>
    </div>
  )
}

Clima.propTypes = {
  resultado: PropTypes.object.isRequired
}

export default Clima
