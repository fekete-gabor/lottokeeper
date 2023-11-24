export const CustomInput = ({
  label,
  type,
  value,
  name,
  placeholder,
  handleChange,
  className,
}) => {
  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        name={name}
        id={name}
        value={value && value}
        placeholder={placeholder}
        onChange={handleChange}
        className={className}
      />
    </>
  );
};
