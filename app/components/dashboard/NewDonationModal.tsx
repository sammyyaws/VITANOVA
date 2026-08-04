"use client";

import React from "react";
import { Formik, Form } from "formik";
import FormInput from "../form/FormInput";
import FormSelect from "../form/FormSelect";
import { newDonationSchema } from "../../../schemas/newDonationSchema";

export interface DonationFormValues {
  donor_name: string;
  blood_type: string;
  volume_ml: number;
  facility: string;
  datetime: string;
  status: string;
}

interface NewDonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: DonationFormValues) => void;
}

export default function NewDonationModal({
  isOpen,
  onClose,
  onSubmit,
}: NewDonationModalProps) {
  if (!isOpen) return null;

  const nowString = new Date().toISOString().slice(0, 16);

  const initialValues: DonationFormValues = {
    donor_name: "",
    blood_type: "",
    volume_ml: 450,
    facility: "Xavier Med Centre",
    datetime: nowString,
    status: "Processed",
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

  const facilityOptions = [
    { label: "Xavier Med Centre", value: "Xavier Med Centre" },
    { label: "Mobile Unit Alpha", value: "Mobile Unit Alpha" },
    { label: "KNUST Red Cross Clinic", value: "KNUST Red Cross Clinic" },
    { label: "Central Blood Bank", value: "Central Blood Bank" },
  ];

  const statusOptions = [
    { label: "Processed", value: "Processed" },
    { label: "Testing", value: "Testing" },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-[999] animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-sky-50 text-[#0066CC] flex items-center justify-center">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 tracking-tight">Record New Donation</h3>
          </div>
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
          validationSchema={newDonationSchema}
          onSubmit={(values, { resetForm }) => {
            onSubmit(values);
            resetForm();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="p-6 flex flex-col gap-4">
              <FormInput
                name="donor_name"
                label="Donor Full Name"
                placeholder="e.g. John Doe"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormSelect
                  name="blood_type"
                  label="Blood Type"
                  options={bloodGroupOptions}
                  placeholder="Select type"
                />

                <FormInput
                  name="volume_ml"
                  label="Volume (ML)"
                  type="number"
                  placeholder="e.g. 450"
                />
              </div>

              <FormSelect
                name="facility"
                label="Collection Facility / Location"
                options={facilityOptions}
                placeholder="Select facility"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  name="datetime"
                  label="Collection Date & Time"
                  type="datetime-local"
                />

                <FormSelect
                  name="status"
                  label="Initial Status"
                  options={statusOptions}
                  placeholder="Select status"
                />
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 justify-end mt-4 border-t border-gray-100 pt-5">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={onClose}
                  className="px-5 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs rounded-xl transition-colors cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 bg-[#0066CC] hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Saving...</span>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Record Donation</span>
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
