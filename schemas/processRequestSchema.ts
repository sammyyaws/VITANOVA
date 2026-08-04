import * as Yup from "yup";

export const processRequestSchema = Yup.object().shape({
  request_id: Yup.string()
    .required("You must select an active requisition request to process"),
    
  blood_bag_barcode: Yup.string()
    .min(5, "Barcode should be at least 5 characters")
    .max(30, "Barcode should not exceed 30 characters")
    .matches(/^[A-Z0-9-]+$/, "Barcode can only contain capital letters, numbers, and hyphens")
    .required("Blood Bag Barcode/ID is required to verify inventory deduction"),
    
  courier_name: Yup.string()
    .min(2, "Courier name is too short")
    .max(50, "Courier name is too long")
    .required("Courier name / Dispatch rider is required"),
    
  estimated_time: Yup.string()
    .required("Estimated delivery time is required"),
});
