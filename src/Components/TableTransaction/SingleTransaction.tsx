import { Transaction } from "../../context/reducer";
import "./SingleStyles.css";

type Props = {
  handleDelete: (id: string) => void;
  handleUpdate: (item: Transaction) => void;
  item: Transaction;
};

function SingleTransaction({ handleDelete, handleUpdate, item }: Props) {
  const typeTransaction =
    item.type === "income" ? (
      <span className="type ingreso"> + {item.amount}</span>
    ) : (
      <span className="type egreso"> - {item.amount}</span>
    );

  return (
    <tr>
      <td>{item.description}</td>
      <td className="hide-on-mobile">{item.category}</td>
      <td>{typeTransaction}</td>
      <td>{item.date}</td>
      <td className="acciones">
        <button onClick={() => handleUpdate(item)}>
          <i className="fa-solid fa-pen"></i>
        </button>
        <button onClick={() => handleDelete(item.id)}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  );
}

export default SingleTransaction;
