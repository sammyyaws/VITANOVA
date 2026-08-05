import * as Yup from "yup";

export const donorProfileSchema = Yup.object({
  blood_group: Yup.string()
    .oneOf(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], "Select a valid blood group")
    .required("Blood group is required"),

  date_of_birth: Yup.string()
    .required("Date of birth is required")
    .test("is-past", "Date of birth must be in the past", (val) => {
      if (!val) return false;
      return new Date(val) < new Date();
    }),

  gender: Yup.string()
    .oneOf(["Male", "Female", "Other"], "Select a valid gender")
    .required("Gender is required"),

  last_donation_date: Yup.string().nullable().optional(),

  availability_status: Yup.string()
    .oneOf(["ACTIVE", "INACTIVE", "UNAVAILABLE"])
    .required("Availability status is required"),

  location: Yup.object({
    region: Yup.string().required("Region is required"),
    city: Yup.string().required("City is required"),
    address_text: Yup.string().required("Address is required"),
    district: Yup.string().optional().default(""),
    gps_code: Yup.string().optional().default(""),
    latitude: Yup.number().nullable().optional(),
    longitude: Yup.number().nullable().optional(),
  }),
});

export const donorProfileInitialValues = {
  blood_group: "",
  date_of_birth: "",
  gender: "",
  last_donation_date: "",
  availability_status: "ACTIVE",
  location: {
    region: "",
    city: "",
    address_text: "",
    district: "",
    gps_code: "",
    latitude: null,
    longitude: null,
  },
};
