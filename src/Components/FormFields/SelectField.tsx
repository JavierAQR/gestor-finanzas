import {
  FieldError,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  watch: UseFormWatch<T>;
  data: string[];
  label?: string;
  disabled?: boolean;
}
const SelectField = <T extends FieldValues>({
  name,
  label,
  register,
  errors,
  watch,
  data,
  disabled,
}: Props<T>) => {
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
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          <label>{label}</label>
          {errors[name] && (
            <span className="error-message">
              {(errors[name] as FieldError).message}
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default SelectField;
