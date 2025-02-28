import { ChangeEvent } from "react";

interface Props {
  monthSelected: string;
  handleMonth: (e: ChangeEvent<HTMLSelectElement>) => void;
  keysHistoryTransactions: string[];
}

const MonthSelectLayout = ({
  handleMonth,
  monthSelected,
  keysHistoryTransactions,
}: Props) => {
  return (
    <>
      <h4>Fecha</h4>
      <select name="monthSelected" onChange={handleMonth} value={monthSelected}>
        {keysHistoryTransactions.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </select>
    </>
  );
};

export default MonthSelectLayout;
