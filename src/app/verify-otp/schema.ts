import { z } from "zod";

export const useVerifyOTPSchema = () => {
  const VERIFY_OTP_SCHEMA = z.object({
    otp: z
      .string({ error: "OTP Required" })
      .nonempty({ message: "OTP Required" })
      .length(6, "OTP must be 6 digits"),
  });

  return VERIFY_OTP_SCHEMA;
};

export type TVerifyOTPSchema = z.infer<ReturnType<typeof useVerifyOTPSchema>>;
