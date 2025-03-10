interface Props {
  monto: number;
  titulo: string;
  className?: string;
}

const ReusableBalance = ({ monto, titulo, className }: Props) => {
  return (
    <div className={`total ${className ? className : ""}`}>
      <h4>{titulo}</h4>
      <span>S/ {monto}</span>
    </div>
  );
};

export default ReusableBalance;
