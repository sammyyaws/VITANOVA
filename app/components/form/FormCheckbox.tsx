"use client";

import { useField } from "formik";


interface FormCheckboxProps {
  name: string;
  label: string;
  disabled?: boolean;
}


export default function FormCheckbox({
  name,
  label,
  disabled = false,
}: FormCheckboxProps) {


  const [field, meta] = useField({
    name,
    type: "checkbox",
  });


  return (
    <div className="flex flex-col gap-2">


      <div className="flex items-start gap-3">

        <input
          {...field}
          id={name}
          type="checkbox"
          disabled={disabled}
          className="
            w-4
            h-4
            rounded
            border-gray-200
            text-primary
            focus:ring-primary
            cursor-pointer
            mt-1
          "
        />


        <label
          htmlFor={name}
          className="
            text-xs
            md:text-sm
            leading-relaxed
            text-gray-500
            cursor-pointer
            select-none
          "
        >
          {label}
        </label>


      </div>


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