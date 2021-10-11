import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {

  //Aca creo el State principal (y puedo usar esas variables tanto en el formulario como para consultar la API del clima)
  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: ''
  })

  const [consultar, guardarConsultar] = useState(false)
  //Aca se guardara el resultado al consultar la API (inicia como un objeto vacio)
  const [resultado, guardarResultado] = useState({})
  //Creo el siguiente State para que en caso de que no encuentre una ciudad me muestre un mensaje de "no encontrada"
  const [error, guardarError] = useState(false)

  //Extraigo la informacion de la busqueda (destructuring)
  const { ciudad, pais } = busqueda;

  //Utilizo useEffect para detectar los cambios que le paso como dependencia (cuando "consultar" cambie de false a true o viceversa => useEffect ejecutará su funcion)
  //Lo de consultar lo uso para no estar llamando a useEffect cada vez que toque una letra...si no que la consulta esta más controlada
  useEffect(() => {
    const consultarAPI = async () => {
      //Si "consultar" esta como "true" ejecutar el codigo:
      if (consultar) {
        const appId = 'c22b501fe0964dd51a2d2a24f7b98046';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        //Obtenido el resultado, seteo la variable resultado pasandole el nuevo resultado
        guardarResultado(resultado);
        //Regreso el estado de la consulta a false para realizar nuevamente otras consultas
        guardarConsultar(false);

        // Detecta si hubo resultados correctos en la consulta
        if (resultado.cod === "404") {
          guardarError(true);
        } else {
          guardarError(false);
        }
      }

    }
    consultarAPI();
    //La linea comentada siguiente es para que no se muestre el error en consola respecto a las dependencias:
    // eslint-disable-next-line
  }, [consultar]);

  //Aca cargaré condicionalmente un componente: (se conoce como CARGA CONDICIONAL DE COMPONENTES)
  let componente;
  if (error) {
    componente = <Error mensaje="No hay resultados" /> 
  } else {
    componente = <Clima resultado={resultado} />
  }

  return (
    <Fragment>
      <Header titulo="Clima React App" />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario busqueda={busqueda} guardarBusqueda={guardarBusqueda} guardarConsultar={guardarConsultar} />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
