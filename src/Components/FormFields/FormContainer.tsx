import { BaseSyntheticEvent, ReactNode } from "react";

interface Props {
  children: ReactNode;
  isEdit?: boolean;
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
}

const FormContainer = ({ children, isEdit, onSubmit }: Props) => {
  return (
    <form onSubmit={onSubmit}>
      {children}
      <button type="submit" className="boton-formulario">
        {!isEdit ? "AGREGAR" : "ACTUALIZAR"}
      </button>
    </form>
  );
};

export default FormContainer;
