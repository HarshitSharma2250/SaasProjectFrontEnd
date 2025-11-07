import { formData } from "@/types/registerForm";
type makeoptional = Partial<formData>;

export function FormTags({
  formik,
  type = "text",
  placeholder,
  name,
  value,
  options = [],
  className,
  ...rest
}: makeoptional): JSX.Element {

  const fieldName = name ?? "";
  const fieldValue = formik ? formik.values[fieldName] : value;
  const error = formik?.touched?.[fieldName] && formik?.errors?.[fieldName];


  switch (type) {
    case "textarea":
      return (
        <div className="flex flex-col">
          <textarea
            name={fieldName}
            placeholder={placeholder}
            value={fieldValue}
            onChange={formik ? formik.handleChange : undefined}
            onBlur={formik ? formik.handleBlur : undefined}
            className={`${className} ${error ? "border-red-500" : ""}`}
            {...rest}
          />
          {error && (
            <span className="text-red-500 text-sm mt-1">{String(error)}</span>
          )}
        </div>
      );

    case "password":
      return (
        <div className="flex flex-col">
          <input
            type="password"
            name={fieldName}
            placeholder={placeholder}
            value={fieldValue}
            onChange={formik ? formik.handleChange : undefined}
            onBlur={formik ? formik.handleBlur : undefined}
            className={`${className} ${error ? "border-red-500" : ""}`}
            {...rest}
          />
          {error && (
            <span className="text-red-500 text-sm mt-1">{String(error)}</span>
          )}
        </div>
      );

    case "select":
      return (
        <div className="flex flex-col">
          <select
            name={fieldName}
            value={fieldValue}
            onChange={formik ? formik.handleChange : undefined}
            onBlur={formik ? formik.handleBlur : undefined}
            className={`${className} ${error ? "border-red-500" : ""}`}
            {...rest}
          >
            <option value="" disabled>Select option</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {error && (
            <span className="text-red-500 text-sm mt-1">{String(error)}</span>
          )}
        </div>
      );

    default:
      return (
        <div className="flex flex-col">
          <input
            type="text"
            name={fieldName}
            placeholder={placeholder}
            value={fieldValue}
            onChange={formik ? formik.handleChange : undefined}
            onBlur={formik ? formik.handleBlur : undefined}
            className={`${className} ${error ? "border-red-500" : ""}`}
            {...rest}
          />
          {error && (
            <span className="text-red-500 text-sm mt-1">{String(error)}</span>
          )}
        </div>
      );
  }
}
