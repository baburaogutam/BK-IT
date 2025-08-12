import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { postContact, InputType } from "../endpoints/contact_POST.schema";

export const useContactMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, InputType>({
    mutationFn: postContact,
    onSuccess: () => {
      toast.success("Thank you for your message!", {
        description: "We have received your inquiry and will get back to you shortly.",
      });
      // Optionally invalidate queries if there's a list of inquiries displayed somewhere
      // queryClient.invalidateQueries({ queryKey: ['contactInquiries'] });
    },
    onError: (error) => {
      toast.error("Submission Failed", {
        description: error.message || "There was an issue submitting your form. Please try again.",
      });
    },
  });
};