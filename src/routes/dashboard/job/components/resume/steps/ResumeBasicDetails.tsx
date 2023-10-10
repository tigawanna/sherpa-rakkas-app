import { TheCountryFields } from "@/components/form/TheCountryFields";
import { TheTextAreaInput } from "@/components/form/inputs/TheTextArea";
import { TheTextInput } from "@/components/form/inputs/TheTextInput";
import { ResumeFields } from "./ResumeMutiStepForm";
import { useEffect } from "react";
import { useQueryClient } from "rakkasjs";
import { TheStringListInput } from "@/components/form/inputs/StringListInput";

interface BasicDetailsProps {
  user_id: string;
  input: ResumeFields;
  setInput: React.Dispatch<React.SetStateAction<ResumeFields>>;
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

type ResumeProfile = Pick<ResumeFields,"name"|"email"|"phone"|"github_username"|"summary"|"website"|"skills">

export function ResumeBasicDetails({input,setInput,handleChange}:BasicDetailsProps){
const qc = useQueryClient()
const user = qc.getQueryData("user") as LuciaUser
    useEffect(() => {
      if (user) {
      setInput((prev) => {
          return {
            ...prev,
            name: user?.name ?? "",
            email: user?.email ?? "",
            phone: user?.phone ?? "",
            github_username: user?.github_username ?? "",
            summary: user?.about_me ?? "",
            skills: user?.skills ?? "",
            country: user?.country ?? "",
            city: user?.city ?? "",
          };
        });
      }
    },[user])



return (
  <div className="flex h-full  w-fullflex-col items-center justify-center">
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <div className="flex w-full flex-col items-center gap-2 md:flex-row">
        <TheTextInput<ResumeProfile>
          field_key={"name"}
          field_name="Name"
          onChange={handleChange}
          value={input.name}
        />
        <TheTextInput<ResumeProfile>
          field_key={"email"}
          field_name="Email"
          type="email"
          onChange={handleChange}
          value={input.email}
        />
      </div>
      <TheCountryFields
        editing={true}
        country={{
          city: input.city,
          country: input.country,
          phone: input.phone,
        }}
        setInput={(value) =>
          setInput((prev) => {
            return {
              ...prev,
              country: value.country,
              phone: value.phone,
              city: value.city,
            };
          })
        }
      />
      <div className="flex w-full flex-col items-center gap-2 md:flex-row">
        <TheTextInput<ResumeProfile>
          container_classname="md:w-fit md:min-w-[20%]"
          field_key={"phone"}
          field_name="Phone"
          type="tel"
          onChange={handleChange}
          value={input.phone}
        />
        <TheTextInput<ResumeProfile>
          container_classname="md:w-fit md:min-w-[40%]"
          field_key={"website"}
          field_name="Website"
          type="url"
          onChange={handleChange}
          value={input.website}
        />
        <TheTextInput<ResumeProfile>
          container_classname="md:w-fit md:min-w-[30%]"
          field_key={"github_username"}
          field_name="Github Username"
          onChange={handleChange}
          value={input.github_username}
        />
      </div>
      <TheTextAreaInput<ResumeProfile>
        field_key={"summary"}
        field_name="Summary"
        onChange={handleChange}
        value={input.summary}
      />
      <TheStringListInput
        editing={true}
        field_key="skills"
        field_name="Skills"
        input={input}
        setInput={setInput}

      />
    </div>
  </div>
);
}
