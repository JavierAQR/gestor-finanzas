import { useDataContext } from "../../context/TransactionContext";
import SingleTransaction from "../SingleTransaction/SingleTransaction";
import "./styles.css";
import { inputs } from "../../context/reducer";

type Props = {
  handleDelete: (id: string) => void;
  handleUpdate: (datos: inputs, id: string) => void;
};

function DisplayTransactions({ handleDelete, handleUpdate }: Props) {
  const contextData = useDataContext();

  return (
    <>
      <div className="transaction-list">
        <table>
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Monto (S/)</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {contextData.state.map((item) => {
              return (
                <SingleTransaction
                  handleDelete={handleDelete}
                  handleUpdate={handleUpdate}
                  key={item.id}
                  id={item.id}
                  type={item.type}
                  description={item.description}
                  category={item.category}
                  amount={item.amount}
                  date={item.date}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DisplayTransactions;
