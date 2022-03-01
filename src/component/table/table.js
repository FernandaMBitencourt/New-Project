import React  from "react";
import '../../style/table.css';
import { Table } from 'react-bootstrap'


// Funcao que renderiz as linhas da tabela
const Row = ({ line }) => {
    return (
        <tr>
            <td>{line.descricao}</td>
            <td className="right-section">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(line.valor)}</td>                   
        </tr>
    );
};


function TablePrice({ data }) {

    return (

        <Table id='table'>
            <thead>
                <tr>
                    <th>Produtos</th>
                    <th>Preços</th>

                </tr>
            </thead>
            <tbody>
                {
                    data.map((line => <Row key={toString()} line={line} />)

                )}
            </tbody>
            
        </Table>
    );
}
export default TablePrice;