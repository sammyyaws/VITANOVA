"use client";

import { useField } from "formik";


interface FormDateInputProps {
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
}


export default function FormDateInput({
  name,
  label,
  placeholder,
  disabled = false,
}: FormDateInputProps) {


  const [field, meta] = useField(name);


  return (
    <div className="flex flex-col gap-2">


      <label
        htmlFor={name}
        className="text-sm font-semibold text-gray-900"
      >
        {label}
      </label>


      <input
        {...field}
        id={name}
        type="date"
        disabled={disabled}
        placeholder={placeholder}
        className={`
          w-full
          bg-gray-50
          border
          rounded-lg
          py-3
          px-4
          text-sm
          text-gray-900
          outline-none
          transition-all
          duration-200

          ${
            meta.touched && meta.error
              ? "border-red-500 focus:ring-red-100"
              : "border-gray-100 focus:border-primary focus:ring-red-600/5"
          }

          focus:bg-white
          focus:ring-4
        `}
      />


      {
        meta.touched && meta.error && (
          <p className="text-red-500 text-xs">
            {meta.error}
          </p>
        )
      }


    </div>
  );
}