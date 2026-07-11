import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

type BaseProps = {
  label: string;
  name: string;
  error?: string;
  helper?: string;
};

type ContactFieldProps = BaseProps & InputHTMLAttributes<HTMLInputElement> & {
  kind?: "input";
};

type ContactTextareaProps = BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement> & {
  kind: "textarea";
};

type ContactSelectProps = BaseProps & SelectHTMLAttributes<HTMLSelectElement> & {
  kind: "select";
  options: string[];
};

export function ContactField(props: ContactFieldProps | ContactTextareaProps | ContactSelectProps) {
  const id = props.id ?? props.name;
  const describedBy = props.error ? `${id}-error` : props.helper ? `${id}-helper` : undefined;
  const fieldClass = "mt-2 min-h-12 w-full border border-white/10 bg-[#050708]/60 px-4 py-3 text-sm text-[#F4F7F8] outline-none transition placeholder:text-[#A8B2BA]/60 focus:border-[#35F06A]/70 focus:ring-2 focus:ring-[#35F06A]/20";

  const meta = (
    <>
      {props.helper && !props.error ? <span id={`${id}-helper`} className="mt-2 block text-xs leading-5 text-[#A8B2BA]">{props.helper}</span> : null}
      {props.error ? <span id={`${id}-error`} role="alert" className="mt-2 block text-xs font-semibold leading-5 text-[#C8F8D2]">{props.error}</span> : null}
    </>
  );

  if (props.kind === "textarea") {
    const { label, error, helper, kind, className, ...textareaProps } = props;
    void helper;
    void kind;

    return (
      <label className="block text-sm font-semibold text-[#D8DEE2]" htmlFor={id}>
        {label}
        <textarea {...textareaProps} id={id} aria-invalid={Boolean(error)} aria-describedby={describedBy} className={`${fieldClass} min-h-36 resize-y leading-7 ${className ?? ""}`} />
        {meta}
      </label>
    );
  }

  if (props.kind === "select") {
    const { label, error, helper, kind, options, className, ...selectProps } = props;
    void helper;
    void kind;

    return (
      <label className="block text-sm font-semibold text-[#D8DEE2]" htmlFor={id}>
        {label}
        <select {...selectProps} id={id} aria-invalid={Boolean(error)} aria-describedby={describedBy} className={`${fieldClass} ${className ?? ""}`}>
          <option value="">Selecione uma opção</option>
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {meta}
      </label>
    );
  }

  const { label, error, helper, kind, className, ...inputProps } = props;
  void helper;
  void kind;

  return (
    <label className="block text-sm font-semibold text-[#D8DEE2]" htmlFor={id}>
      {label}
      <input {...inputProps} id={id} aria-invalid={Boolean(error)} aria-describedby={describedBy} className={`${fieldClass} ${className ?? ""}`} />
      {meta}
    </label>
  );
}
