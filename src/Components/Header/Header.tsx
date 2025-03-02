import SelectMonth from "./SelectMonth";
import "./styles.css";

type Props = {};

function Header({}: Props) {
  return (
    <header>
      <h1>Finanzas Personales</h1>
      <SelectMonth />
    </header>
  );
}

export default Header;
