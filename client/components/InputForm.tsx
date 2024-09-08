import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";


const FormSchema = z.object({
  matchId: z.string().min(1, {
    message: "Match Id is required",
  }),
});

export function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      matchId: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const matchId = localStorage.setItem("matchId", data.matchId);
    console.log(data);
    window.location.reload();
  }

  useEffect(() => {
    const matchId = localStorage.getItem("matchId");
    if (matchId) {
      redirect("/");
    }
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="matchId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Match Id</FormLabel>
              <FormControl>
                <Input placeholder="66d7123f3b5af1c5d8bc339" {...field} />
              </FormControl>
              <FormDescription>
                Add match id to continue, <br />
                i.e: 66d7123f3b5af1c5d8bc4643
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Join</Button>
      </form>
    </Form>
  );
}
