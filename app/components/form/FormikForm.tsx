"use client";

import {
  Formik,
  Form,
  FormikHelpers,
  FormikValues,
} from "formik";
import { ReactNode } from "react";
import { FormikProps } from "formik";
import * as Yup from "yup";

interface FormikFormProps<T extends FormikValues> {
  initialValues: T;
  validationSchema?: Yup.AnyObjectSchema;
  onSubmit: (
    values: T,
    helpers: FormikHelpers<T>
  ) => void | Promise<void>;
  children: ReactNode | ((props: FormikProps<T>) => ReactNode);
}

export default function FormikForm<T extends FormikValues>({
  initialValues,
  validationSchema,
  onSubmit,
  children,
}: FormikFormProps<T>) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formikProps) => (
        <Form>
          {typeof children === "function" ? children(formikProps) : children}
        </Form>
      )}
    </Formik>
  );
}