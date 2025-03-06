import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { TformSchema } from "../../schemas/transactionSchema";

export interface selectData {
  name: string;
  value: string;
}

interface Props {
  name: keyof TformSchema;
  register: UseFormRegister<TformSchema>;
  errors: FieldErrors<TformSchema>;
  watch: UseFormWatch<TformSchema>;
  data: selectData[];
  label?: string;
  disabled?: boolean;
}
const SelectField = ({
  name,
  label,
  register,
  errors,
  watch,
  data,
  disabled,
}: Props) => {
  return (
    <div className={`input-field ${watch(name) ? "filled" : ""}`}>
      {disabled ? (
        <>
          <select disabled></select>
          <label>{label}</label>
        </>
      ) : (
        <>
          <select {...register(name)}>
            <option disabled></option>
            {data.map((item, index) => (
              <option key={index} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
          <label>{label}</label>
          {errors[name] && (
            <span className="error-message">{errors[name].message}</span>
          )}
        </>
      )}
    </div>
  );
};

export default SelectField;
