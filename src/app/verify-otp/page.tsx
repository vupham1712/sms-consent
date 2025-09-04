import React from "react";
import { VerifyOTPForm } from "./form";

const Page = async () => {
  return (
    <div className="flex min-h-screen items-center justify-center  p-4 bg-gradient-to-b from-[#061326] to-[#08568E]">
      <div className="mx-auto max-w-xl p-10 pb-20 w-full rounded-2xl bg-white dark:bg-gray-800  shadow-lg">
        <h3 className="text-primary text-2xl text-center font-semibold uppercase lg:text-3xl">
          Verify OTP
        </h3>
        <p className="text-primary mt-2 text-center text-sm lg:text-base">
          Please enter the OTP sent to your phone number
        </p>
        <div className="mt-4">
          <VerifyOTPForm />
        </div>
      </div>
    </div>
  );
};

export default Page;
