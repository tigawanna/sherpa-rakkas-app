import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface TheTextAreaProps<T>
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  field_key: keyof T;
  field_name: string;
  description_classname?: string;
  error_message?: string;
  container_classname?: string;
  label_classname?: string;
  output_classname?: string;
  editing?: boolean;
  description?: string;
}

export function TheTextAreaInput<T>({
  field_key,
  field_name,
  editing = true,
  ...props
}: TheTextAreaProps<T>) {
  const [error_message, setError] = useState(
    props.error_message && props.error_message.length > 0
      ? props.error_message
      : undefined
  );
  const default_textarea_tw = error_message
    ? " textarea textarea-bordered textarea-sm w-full border-error border-2"
    : "textarea textarea-bordered textarea-sm w-full border border-accent";
  return (
    <div
      key={field_key as string}
      className={twMerge(
        "flex w-full flex-col justify-center",
        props.container_classname
      )}
    >
      <label
        htmlFor={field_key as string}
        className={twMerge(
          "px-2 font-serif text-sm font-bold",
          props.label_classname
        )}
      >
        {field_name as string}
      </label>
      {editing ? (
        <div className="flex w-full flex-col ">
          <textarea
            onKeyDown={(e) => {
              setError(undefined);
            }}
            {...props}
            id={field_key as string}
            name={field_key as string}
            title={props.placeholder}
            className={twMerge(default_textarea_tw, props.className)}
          />
          {props.description && (
            <p
              className={twMerge("text-xs italic", props.description_classname)}
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
    </div>
  );
}
