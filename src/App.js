import { useState, useEffect } from "react";
import '../src/style/list.css'
import api from '../src/service/index';
import TablePrice from "./component/table/table";
import Header from "./component/header/header";


function App() {

  const [table, setTable] = useState([]);
  const [list, setList] = useState([])
  const [checkedState, setCheckedState] = useState([]);
  const [total, setTotal] = useState(0);
  const [exibirProdutos, setExibirProdutos] = useState(false);
 
// Funcao que controla o checkbox para ver quando o usuario clicar no checkbbox
  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    
    setCheckedState(updatedCheckedState);

    // Funcao que faz a soma dos valores 
    const totalPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          return parseFloat(sum) + parseFloat(list[index].valor);
        }
        return sum;
      },
      0
    );

    setTotal(totalPrice);
  };

  // funcao que consome api 
  useEffect(() => {
    api
      .get("/list")
      .then((response) => {
        setList(response.data);
        setTable(response.data);
        setCheckedState(new Array(response.data.length).fill(false));
        setExibirProdutos(true);
        

      })
      .catch((err) => {
        console.error("ocorreu um erro" + err);
      });
  }, []);

  return (

    <div className="App">
     
      <Header/>
      <h2 className="title">Tabela de Produtos</h2>

      <ul className="product-list">
        {
          exibirProdutos === true &&

          list.map(({ descricao, valor }, index) => {   
            return (
              <div key={index}>
                <div className="card">
                  <div className="left-section">
                    <input
                      type="checkbox"
                      id={`custom-checkbox-${index}`}
                      name='name'
                      value='value'
                      checked={checkedState[index]}
                      onChange={() => handleOnChange(index)}
                    />
                    <label className='label' htmlFor={index}>{descricao}</label>
                  </div>
                  <div className="value-section">Preço:{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)}</div>
                </div>
                </div>

            );
          })
        }
      </ul>
      <TablePrice data={table} />
      <div>
        <div className="list-valor">
          <div className="right-section">Total:
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}
          </div>
        </div>
      </div>
      <div className="list-item">
          <div className="right-section">Produtos: </div>
        </div>
    </div>
  );
}

export default App;