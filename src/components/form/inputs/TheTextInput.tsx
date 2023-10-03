import { twMerge } from "tailwind-merge"
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import { useState } from "react";

interface TheTextInputProps<T>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  field_name: string
  field_key: keyof T;
  error_message?: string;
  container_classname?: string;
  label_classname?: string
  description_classname?: string
  output_classname?: string
  editing?: boolean
  description?: string;
}

export function TheTextInput<T,>({field_name,field_key,editing=true,...props}:TheTextInputProps<T>){

const [error_message, setError] = useState((props.error_message && props.error_message.length > 0)? props.error_message : undefined)
const default_input_tw = error_message
  ? " input input-bordered input-sm w-full border-error border-2"
  : "input input-bordered input-sm w-full border-accent";
return (
  <div
    key={field_key as string}
    className={twMerge(
      "flex w-full flex-col justify-center gap-1.5",
      props.container_classname
    )}
  >
    <Label
      htmlFor={field_key as string}
      className={twMerge("text  font-serif font-bold", props.label_classname)}
    >
      {field_name as string}
    </Label>
    {editing ? (
      <div className="flex w-full flex-col  ">
        <Input
          {...props}
          onChange={(e) => {
            setError(undefined);
          }}
          id={field_key as string}
          name={field_key as string}
          title={props.placeholder}
          className={twMerge(default_input_tw, props.className)}
        />
        {props.description && editing && (
          <p
            className={twMerge(
              "text-xs italic text-info",
              props.description_classname
            )}
          >
            {props.description}
          </p>
        )}
      </div>
    ) : (
      <div
        className={twMerge(
          "w-full border-b px-2 py-1 text-sm",
          props.output_classname
        )}
      >
        {props.value}
      </div>
    )}
    {error_message && (
      <span className="text-xs italic text-error">{error_message}</span>
    )}
  </div>
);
}
