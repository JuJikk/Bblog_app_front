import React from "react";
import { useForm } from "react-hook-form";

interface CommentFormProps {
  onAddComment: (text: string) => void;
}

interface FormData {
  text: string;
}

export const CommentForm: React.FC<CommentFormProps> = ({ onAddComment }) => {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const submitHandler = (data: FormData) => {
    onAddComment(data.text);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="mt-4 flex space-x-2"
    >
      <input
        {...register("text", { required: true })}
        type="text"
        placeholder="Add a comment..."
        className="flex-grow p-2 border rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Add
      </button>
    </form>
  );
};
