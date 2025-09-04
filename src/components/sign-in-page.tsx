"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { PhoneInput } from "./ui/phone-input";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  phone: z
    .string()
    .transform((val) => val.replace(/\D/g, ""))
    .refine((val) => val.length === 11, {
      message: "Phone invalid",
    }),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms",
  }),
  privacy: z.boolean().refine((val) => val === true, {
    message: "You must accept the privacy policy",
  }),
  marketing: z.boolean(),
});

export default function SmsOptInPage({ storeName = "GoRight Store" }) {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone: "",
      terms: false,
      privacy: false,
      marketing: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      const response = await new Promise<{
        ok: boolean;
        json: () => Promise<any>;
      }>((resolve) => {
        setTimeout(() => {
          resolve({
            ok: true,
            json: async () => ({ message: "OTP sent successfully" }),
          });
        }, 1000);
      });

      if (!response.ok) {
        throw new Error("Failed to send OTP");
      }

      router.push(`/verify-otp`);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center  p-4 bg-gradient-to-b from-[#061326] to-[#08568E]">
      <div className="w-full max-w-2xl rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          {storeName}
        </h1>
        <p className="mt-1 text-center text-gray-600 dark:text-gray-300">
          GoRight will send an SMS to verify your phone number.
        </p>
        <div className="mt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="mb-10">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <PhoneInput
                          mask={"+{1} (000) 000-0000"}
                          {...field}
                          placeholder={"Enter your phone number"}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-row items-center gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        I consent to receive SMS communications for the purposes
                        of booking and managing appointments. I understand that
                        message and data rates may apply. I understand that I
                        can opt out of SMS communications by replying with the
                        word ‘STOP’.
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="marketing"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-row items-center gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        I consent to receive SMS communications for the purposes
                        of receiving marketing messages and other promotional
                        communications. I understand that message and data rates
                        may apply. I understand that I can opt out of SMS
                        communications by replying with the word ‘STOP’.
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="privacy"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-row items-center gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        I agree to the{" "}
                        <a
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-500 hover:underline"
                          href={"https://goright.ai/policy/"}
                        >
                          privacy policy
                        </a>
                        .
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />

              <Button
                disabled={
                  !form.formState.isValid || form.formState.isSubmitting
                }
                className="w-full mt-6"
                size="lg"
                type="submit"
              >
                {form.formState.isSubmitting && (
                  <Loader2Icon className="animate-spin" />
                )}
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
