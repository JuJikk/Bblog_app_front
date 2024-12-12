import React from "react";
import { useForm } from "react-hook-form";
import { Input, Textarea, Button } from "@nextui-org/react";
import { PenSquare } from "lucide-react";
import { parsedToken } from "../../../../shared/lib/parse-token";

interface PostFormProps {
  onSubmit: (data: { title: string; content: string }) => void;
}

export const PostForm: React.FC<PostFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { title: "", content: "" },
  });
  const userData = parsedToken();

  const submitHandler = (data: { title: string; content: string }) => {
    const payload = { ...data, userId: userData?.userId };

    onSubmit(payload);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      <Input
        {...register("title")}
        label="Title"
        placeholder="Enter post title"
        variant="bordered"
      />
      <Textarea
        {...register("content")}
        label="Content"
        placeholder="Write your post content here"
        variant="bordered"
        minRows={4}
      />
      <Button
        type="submit"
        color="primary"
        endContent={<PenSquare size={18} />}
      >
        Submit Post
      </Button>
    </form>
  );
};
