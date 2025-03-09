interface Props {
  monto: number;
  titulo: string;
}

const ReusableBalance = ({ monto, titulo }: Props) => {
  return (
    <div className="total">
      <h4>{titulo}</h4>
      <span>S/ {monto}</span>
    </div>
  );
};

export default ReusableBalance;
