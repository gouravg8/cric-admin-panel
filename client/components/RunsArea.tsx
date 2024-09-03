"use client";
import React from "react";
import { Textarea } from "@/components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const FormSchema = z.object({
  bio: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    }),
});

function RunsArea() {
  // * TODO: ADD ZOD
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    //     toast({
    //       title: "You submitted the following values:",
    //       description: (
    //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //           <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //         </pre>
    //       ),
    //     });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-10/12 space-y-6 items-center  "
      >
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Runs to add</FormLabel> */}
              <FormControl>
                <Textarea
                  rows={8}
                  placeholder="All runs will be added here to the runs area"
                  className="resize-none "
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="float-right w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default RunsArea;
