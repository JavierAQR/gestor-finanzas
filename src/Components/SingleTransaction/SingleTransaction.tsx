import { inputs, TransactionType } from "../../context/reducer";
import "./styles.css";

type Props = {
  description: string;
  date: string;
  amount: number;
  category: string;
  id: string;
  type: TransactionType;
  handleDelete: (id: string) => void;
  handleUpdate: (datos: inputs, id: string) => void;
};

function SingleTransaction({
  id,
  description,
  date,
  amount,
  category,
  handleDelete,
  handleUpdate,
  type,
}: Props) {
  const typeTransaction =
    type === "income" ? (
      <span className="type ingreso"> + {amount}</span>
    ) : (
      <span className="type egreso"> - {amount}</span>
    );

  return (
    <tr>
      <td>{description}</td>
      <td>{category}</td>
      <td>{typeTransaction}</td>
      <td>{date}</td>
      <td className="acciones">
        <button
          onClick={() =>
            handleUpdate(
              {
                amount: amount,
                category: category,
                date: date,
                description: description,
                type: type,
              },
              id
            )
          }
        >
          <i className="fa-solid fa-pen"></i>
        </button>
        <button onClick={() => handleDelete(id)}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  );
}

export default SingleTransaction;
