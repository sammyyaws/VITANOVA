import * as Yup from "yup";

export const bloodRequestSchema = Yup.object().shape({
  blood_group_needed: Yup.string()
    .oneOf(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], "Invalid blood group selection")
    .required("Blood group selection is required"),
    
  quantity_units: Yup.number()
    .integer("Quantity must be a whole number")
    .positive("Quantity must be greater than zero")
    .min(1, "Must request at least 1 unit")
    .max(50, "Maximum limit per request is 50 units")
    .required("Quantity is required"),
    
  urgency_level: Yup.string()
    .oneOf(["ROUTINE", "EMERGENCY"], "Invalid urgency selection")
    .required("Urgency level is required"),
    
  required_by_time: Yup.date()
    .min(new Date(), "The deadline must be in the future")
    .required("Required deadline time is required"),
});
