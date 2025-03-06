import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { TformSchema } from "../../schemas/transactionSchema";

interface Props {
  name: keyof TformSchema;
  label?: string;
  inputType: string;
  register: UseFormRegister<TformSchema>;
  errors: FieldErrors<TformSchema>;
  watch: UseFormWatch<TformSchema>;
}

const InputField = ({
  name,
  label,
  inputType,
  register,
  errors,
  watch,
}: Props) => {
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
        <span className="error-message">{errors[name].message}</span>
      )}
    </div>
  );
};

export default InputField;
