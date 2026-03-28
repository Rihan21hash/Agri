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
    "mt-1.5 w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:outline-none focus:ring-2";

  const borderState = error
    ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
    : "border-earth-200 focus:border-accent-600 focus:ring-accent-500/25";

  return (
    <label htmlFor={id} className={`block text-sm font-medium text-earth-800 ${className}`}>
      {label}
      {required ? <span className="text-red-500"> *</span> : null}
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
        <p id={`${id}-hint`} className="mt-1 text-xs text-earth-500">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className="mt-1 text-xs font-medium text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </label>
  );
}

export default FormInput;
