"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useVerifyOTPSchema, TVerifyOTPSchema } from "./schema";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";

const VerifyOTPForm = () => {
  const verifyOTPSchema = useVerifyOTPSchema();

  const form = useForm<TVerifyOTPSchema>({
    resolver: zodResolver(verifyOTPSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (values: TVerifyOTPSchema) => {
    try {
      const response = await new Promise<{
        ok: boolean;
        json: () => Promise<any>;
      }>((resolve) => {
        setTimeout(() => {
          resolve({
            ok: true,
            json: async () => ({ message: "OTP verify successfully" }),
          });
        }, 1000);
      });

      if (!response.ok) {
        throw new Error("Failed to send OTP");
      }

      const data = await response.json();

      toast.success(data.message);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center justify-center">
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-y-4">
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            size="lg"
            className="w-full px-4 uppercase"
          >
            {form.formState.isSubmitting && (
              <Loader2Icon className="animate-spin" />
            )}
            Submit
          </Button>
        </div>
        <Link
          className="text-primary text-center flex justify-center text-sm font-medium underline"
          href="/"
        >
          Back to home
        </Link>
      </form>
    </Form>
  );
};

export { VerifyOTPForm };
