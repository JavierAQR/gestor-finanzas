import {
  FieldError,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import "./FormFieldStyless.css";

interface Props<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  inputType: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  watch: UseFormWatch<T>;
}

const InputField = <T extends FieldValues>({
  name,
  label,
  inputType,
  register,
  errors,
  watch,
}: Props<T>) => {
  return (
    <div
      className={`input-field ${
        watch(name) || watch(name) === 0 ? "filled" : ""
      }`}
    >
      {inputType === "number" ? (
        <input type="number" {...register(name, { valueAsNumber: true })} />
      ) : (
        <input type={inputType} {...register(name)} />
      )}

      <label>{label}</label>
      {errors[name] && (
        <span className="error-message">
          {(errors[name] as FieldError).message}
        </span>
      )}
    </div>
  );
};

export default InputField;
