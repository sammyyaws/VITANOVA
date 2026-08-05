"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { donorProfileSchema, donorProfileInitialValues } from "../../../../schemas/donorProfileSchema";
import donorService from "../../../../services/donorService";
import Toast from "../../../components/ui/Toast";

export default function CreateDonorProfile() {
  const router = useRouter();
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      // Clean up empty optional fields
      const payload = {
        ...values,
        last_donation_date: values.last_donation_date || null,
        location: {
          ...values.location,
          gps_code: values.location.gps_code || "",
          district: values.location.district || "",
          latitude: values.location.latitude || null,
          longitude: values.location.longitude || null,
        },
      };

      await donorService.createProfile(payload);
      setToast({ msg: "Profile created successfully! Taking you to your dashboard…", type: "success" });
      setTimeout(() => router.push("/donor"), 1500);
    } catch (error: any) {
      const msg =
        error?.response?.data?.detail ||
        Object.values(error?.response?.data || {})[0] ||
        "Failed to create profile. Please check your details.";
      setToast({ msg: String(msg), type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all bg-white";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";
  const errorClass = "text-xs text-red-500 mt-1";

  return (
    <>
      {toast && (
        <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />
      )}

      <div className="min-h-screen bg-gradient-to-br from-red-50/40 via-white to-pink-50/20 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-50 mb-4">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="currentColor" />
              </svg>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
              Complete Your Donor Profile
            </h1>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Help hospitals find you quickly. Fill in your details below to start saving lives.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
            <Formik
              initialValues={donorProfileInitialValues}
              validationSchema={donorProfileSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">

                  {/* Personal Info Section */}
                  <div>
                    <h2 className="text-base font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                      Personal Information
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                      {/* Blood Group */}
                      <div>
                        <label className={labelClass}>Blood Group *</label>
                        <Field as="select" name="blood_group" className={inputClass}>
                          <option value="">Select blood group</option>
                          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                            <option key={bg} value={bg}>{bg}</option>
                          ))}
                        </Field>
                        <ErrorMessage name="blood_group" component="p" className={errorClass} />
                      </div>

                      {/* Gender */}
                      <div>
                        <label className={labelClass}>Gender *</label>
                        <Field as="select" name="gender" className={inputClass}>
                          <option value="">Select gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </Field>
                        <ErrorMessage name="gender" component="p" className={errorClass} />
                      </div>

                      {/* Date of Birth */}
                      <div>
                        <label className={labelClass}>Date of Birth *</label>
                        <Field type="date" name="date_of_birth" className={inputClass} />
                        <ErrorMessage name="date_of_birth" component="p" className={errorClass} />
                      </div>

                      {/* Last Donation Date */}
                      <div>
                        <label className={labelClass}>Last Donation Date <span className="text-gray-400 font-normal">(optional)</span></label>
                        <Field type="date" name="last_donation_date" className={inputClass} />
                        <ErrorMessage name="last_donation_date" component="p" className={errorClass} />
                      </div>

                      {/* Availability Status */}
                      <div className="sm:col-span-2">
                        <label className={labelClass}>Availability Status *</label>
                        <Field as="select" name="availability_status" className={inputClass}>
                          <option value="ACTIVE">Active – I am available to donate</option>
                          <option value="INACTIVE">Inactive – Temporarily unavailable</option>
                          <option value="UNAVAILABLE">Unavailable – Not available at this time</option>
                        </Field>
                        <ErrorMessage name="availability_status" component="p" className={errorClass} />
                      </div>

                    </div>
                  </div>

                  {/* Location Section */}
                  <div>
                    <h2 className="text-base font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                      Location
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                      <div>
                        <label className={labelClass}>Region *</label>
                        <Field type="text" name="location.region" placeholder="e.g. Greater Accra" className={inputClass} />
                        <ErrorMessage name="location.region" component="p" className={errorClass} />
                      </div>

                      <div>
                        <label className={labelClass}>City *</label>
                        <Field type="text" name="location.city" placeholder="e.g. Accra" className={inputClass} />
                        <ErrorMessage name="location.city" component="p" className={errorClass} />
                      </div>

                      <div className="sm:col-span-2">
                        <label className={labelClass}>Address *</label>
                        <Field type="text" name="location.address_text" placeholder="e.g. 12 Liberation Road" className={inputClass} />
                        <ErrorMessage name="location.address_text" component="p" className={errorClass} />
                      </div>

                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white py-3 rounded-xl text-sm font-bold hover:bg-red-700 transition-all duration-200 shadow-md shadow-red-100 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
                  >
                    {isSubmitting ? "Saving…" : "Save Profile & Continue"}
                  </button>

                </Form>
              )}
            </Formik>
          </div>

        </div>
      </div>
    </>
  );
}
