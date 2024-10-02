import { z } from "zod";

const addressSchema = z.object({
  street: z.string({ required_error: "Street address is required" }),
  city: z.string({ required_error: "City is required" }),
  state: z.string({ required_error: "State is required" }),
  pincode: z.number({ required_error: "Pincode is required" }).positive(), // Ensure positive pincode
  country: z.string({ required_error: "Country is required" }),
});

const registerUserSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z.string({ required_error: "Email is required" }).email("Invalid email format"),
  password: z.string({ required_error: "Password is required" }).min(8, "Password must be at least 8 characters long"),
  phone: z.number({ required_error: "Phone number is required" }).positive(), // Ensure positive phone number
  address: z.array(addressSchema),
});

export default registerUserSchema;