import { Fragment, useState, useEffect } from 'react';
import Pregunta from './components/Pregunta';
import Formulario from './components/Formulario';
import Listado from './components/Listado';
import { ControlPresupuesto } from './components/ControlPresupuesto';

function App() {

  //Definir un state
  const [presupuesto, guardarPresupuesto] = useState(0);
  const [restante, guardarRestante] = useState(0);
  const [mostrarpregunta, actualizarPregunta] = useState(true);
  const [gastos, guardarGastos] = useState([]);
  const [gasto, guardarGasto] = useState({});
  const [crearGasto, guardarCrearGasto] = useState(false)

  // UseEffect que actualiza el restante

  useEffect(() => {
    if(crearGasto){

      // Agrega el nuevo presupuesto
      guardarGastos([
        ...gastos,
        gasto
      ]);

      // Resta del presupuesto actual
      const presupuestoRestante = restante - gasto.cantidad;
      guardarRestante(presupuestoRestante);

      //Resetear a false
      guardarCrearGasto(false)
    }

  }, [gasto, crearGasto, gastos, restante])

  

  return (
    <Fragment>
      <div className="container">
        <header>
        <h1>Gasto semanal</h1>
        <div className="contenido-principal contenido">
          {mostrarpregunta ?
           (
             <Pregunta
             guardarPresupuesto={guardarPresupuesto}
             guardarRestante={guardarRestante}
             actualizarPregunta={actualizarPregunta}
             ></Pregunta>
          ) : 
          (
            <div className="row">
            <div className="one-half column">
              <Formulario
              guardarGasto={guardarGasto}
              guardarCrearGasto={guardarCrearGasto}
              ></Formulario>
            </div>
            <div className="one-half column">
              <Listado
              gastos={gastos}
              ></Listado>
              <ControlPresupuesto
              presupuesto={presupuesto}
              restante={restante}
              ></ControlPresupuesto>
            </div>
          </div>
          )
          }                
        </div>
        </header>    
      </div>
    </Fragment>
  );
}

export default App;
