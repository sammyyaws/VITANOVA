import * as Yup from "yup";

export const newDonationSchema = Yup.object().shape({
  donor_name: Yup.string()
    .trim()
    .min(2, "Donor name must be at least 2 characters")
    .required("Donor name is required"),

  blood_type: Yup.string()
    .oneOf(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], "Select a valid blood type")
    .required("Blood type is required"),

  volume_ml: Yup.number()
    .integer("Volume must be a whole number in ML")
    .positive("Volume must be greater than zero")
    .min(100, "Minimum donation volume is 100 ML")
    .max(1000, "Maximum donation volume is 1000 ML")
    .required("Volume in ML is required"),

  facility: Yup.string()
    .trim()
    .required("Facility / location is required"),

  datetime: Yup.string()
    .required("Collection date & time is required"),

  status: Yup.string()
    .oneOf(["Processed", "Testing"], "Select a valid status")
    .required("Initial status is required"),
});
