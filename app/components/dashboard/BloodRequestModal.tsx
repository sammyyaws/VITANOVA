"use client";

import React from "react";
import { Formik, Form } from "formik";
import FormInput from "../form/FormInput";
import FormSelect from "../form/FormSelect";
import { bloodRequestSchema } from "../../../schemas/bloodRequestSchema";

interface BloodRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: {
    blood_group_needed: string;
    quantity_units: number;
    urgency_level: string;
    required_by_time: string;
  }) => void;
}

export default function BloodRequestModal({ isOpen, onClose, onSubmit }: BloodRequestModalProps) {
  if (!isOpen) return null;

  const initialValues = {
    blood_group_needed: "",
    quantity_units: 1,
    urgency_level: "ROUTINE",
    required_by_time: "",
  };

  const bloodGroupOptions = [
    { label: "A+", value: "A+" },
    { label: "A-", value: "A-" },
    { label: "B+", value: "B+" },
    { label: "B-", value: "B-" },
    { label: "AB+", value: "AB+" },
    { label: "AB-", value: "AB-" },
    { label: "O+", value: "O+" },
    { label: "O-", value: "O-" },
  ];

  const urgencyOptions = [
    { label: "Routine", value: "ROUTINE" },
    { label: "Emergency", value: "EMERGENCY" },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-[999] animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900 tracking-tight">Blood Requisition Form</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-50"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <Formik
          initialValues={initialValues}
          validationSchema={bloodRequestSchema}
          onSubmit={(values, { resetForm }) => {
            onSubmit(values);
            resetForm();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="p-6 flex flex-col gap-5">
              <FormSelect
                name="blood_group_needed"
                label="Blood Group Needed"
                options={bloodGroupOptions}
                placeholder="Select blood group"
              />

              <FormInput
                name="quantity_units"
                label="Quantity (Units Needed)"
                type="number"
                placeholder="e.g. 2"
              />

              <FormSelect
                name="urgency_level"
                label="Urgency Level"
                options={urgencyOptions}
                placeholder="Select urgency level"
              />

              <FormInput
                name="required_by_time"
                label="Required By (Deadline)"
                type="datetime-local"
              />

              {/* Action buttons */}
              <div className="flex items-center gap-3 justify-end mt-4 border-t border-gray-50 pt-5">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={onClose}
                  className="px-5 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-sm rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 bg-primary hover:bg-red-700 text-white font-bold text-sm rounded-lg transition-colors shadow-sm shadow-red-100 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Submit Request</span>
                    </>
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
