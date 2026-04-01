function FormInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  hint,
  className = "",
  inputClassName = "",
  required,
  ...rest
}) {
  const baseInput =
    "mt-2 w-full rounded-2xl border bg-white px-5 py-4 text-base font-medium text-soil-dark-900 shadow-sm transition-all duration-200 placeholder:text-soil-dark-400 focus:outline-none focus:ring-2";

  const borderState = error
    ? "border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50/30"
    : "border-soil-dark-200 focus:border-agri-green-500 focus:ring-agri-green-500/20";

  return (
    <label htmlFor={id} className={`block text-sm font-bold text-soil-dark-800 ${className}`}>
      {label}
      {required ? <span className="text-red-500 ml-1">*</span> : null}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className={`${baseInput} ${borderState} ${inputClassName}`}
        aria-invalid={Boolean(error)}
        aria-describedby={hint ? `${id}-hint` : undefined}
        {...rest}
      />
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-2 text-xs font-medium text-soil-dark-500">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className="mt-2 text-sm font-bold text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </label>
  );
}

export default FormInput;
