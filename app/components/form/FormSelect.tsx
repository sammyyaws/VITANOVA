"use client";

import { useField } from "formik";


interface SelectOption {
  label: string;
  value: string;
}


interface FormSelectProps {
  name: string;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
}


export default function FormSelect({
  name,
  label,
  options,
  placeholder = "Select an option",
  disabled = false,
}: FormSelectProps) {


  const [field, meta] = useField(name);


  return (
    <div className="flex flex-col gap-2">


      <label
        htmlFor={name}
        className="text-sm font-semibold text-gray-900"
      >
        {label}
      </label>


      <select
        {...field}
        id={name}
        disabled={disabled}
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
          cursor-pointer
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
      >

        <option value="">
          {placeholder}
        </option>


        {
          options.map((option)=>(
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))
        }


      </select>


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