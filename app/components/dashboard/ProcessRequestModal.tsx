"use client";

import React from "react";
import { Formik, Form } from "formik";
import FormInput from "../form/FormInput";
import FormSelect from "../form/FormSelect";
import { processRequestSchema } from "../../../schemas/processRequestSchema";

interface PendingRequest {
  id: string;
  detail: string;
  origin: string;
}

interface ProcessRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  pendingRequests: PendingRequest[];
  onSubmit: (values: {
    request_id: string;
    blood_bag_barcode: string;
    courier_name: string;
    estimated_time: string;
  }) => void;
}

export default function ProcessRequestModal({ isOpen, onClose, pendingRequests, onSubmit }: ProcessRequestModalProps) {
  if (!isOpen) return null;

  const initialValues = {
    request_id: "",
    blood_bag_barcode: "",
    courier_name: "",
    estimated_time: "",
  };

  // Convert pendingRequests array into Select options format
  const requestOptions = pendingRequests.map((req) => ({
    label: `Req #${req.id} — ${req.detail} for ${req.origin}`,
    value: req.id,
  }));

  const timeOptions = [
    { label: "15 minutes (Emergency Priority)", value: "15_MINS" },
    { label: "30 minutes (Urgent Priority)", value: "30_MINS" },
    { label: "45 minutes", value: "45_MINS" },
    { label: "1 hour (Routine Delivery)", value: "1_HOUR" },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-[999] animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900 tracking-tight font-sans">Process Requisition Request</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-50 cursor-pointer"
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
          validationSchema={processRequestSchema}
          onSubmit={(values, { resetForm }) => {
            onSubmit(values);
            resetForm();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="p-6 flex flex-col gap-5">
              {pendingRequests.length === 0 ? (
                <div className="text-center py-6 flex flex-col items-center gap-2">
                  <svg className="text-gray-300" viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <p className="text-sm font-semibold text-gray-500">No active pending requests to process!</p>
                </div>
              ) : (
                <>
                  <FormSelect
                    name="request_id"
                    label="Select Pending Requisition"
                    options={requestOptions}
                    placeholder="Choose request to fulfill"
                  />

                  <FormInput
                    name="blood_bag_barcode"
                    label="Assigned Blood Bag Barcode"
                    placeholder="e.g. BAG-O-MIN-9921"
                  />

                  <FormInput
                    name="courier_name"
                    label="Courier / Dispatch Rider Name"
                    placeholder="e.g. Samuel Robertson"
                  />

                  <FormSelect
                    name="estimated_time"
                    label="Estimated Delivery Time"
                    options={timeOptions}
                    placeholder="Select delivery time"
                  />
                </>
              )}

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
                {pendingRequests.length > 0 && (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 bg-secondary hover:bg-blue-700 text-white font-bold text-sm rounded-lg transition-colors shadow-sm shadow-blue-100 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Dispatching...</span>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>Dispatch Shipment</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
