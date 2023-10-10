import { jobApplicationApi, TJobApplicationInputType } from "@/routes/api/helpers/prisma/job-application";
import { handleMutationResponse } from "@/utils/async";
import { UseMutationResult } from "rakkasjs";
import { toast } from "react-toastify";

interface ISubmitJobApplication{
updating?: boolean;
editing: boolean;
update_mutation: UseMutationResult<Awaited<ReturnType<typeof jobApplicationApi.addNew>>,TJobApplicationInputType>
create_mutation: UseMutationResult<Awaited<ReturnType<typeof jobApplicationApi.updateOne>>,TJobApplicationInputType>;
input: any
}
export function handleJobApplicationSubmit({create_mutation,editing,update_mutation,updating,input}:ISubmitJobApplication){
    return function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        e.stopPropagation();

        if (editing) {
            if (updating) {
                update_mutation
                    .mutateAsync(input)
                    .then((res) => {
                        handleMutationResponse({
                            res,
                            successMessage(res) {
                                return 'Application updated successfully';
                            },
                        });
             
                    })
                    .catch((error) =>
                        toast(error.message, { type: 'error', autoClose: false }),
                    );
            } else {
                create_mutation
                    .mutateAsync(input)
                    .then((res) => {
                        handleMutationResponse({
                            res,
                            successMessage(res) {
                                return 'Application updated successfully';
                            },
                        });
                    
                    })
                    .catch((error) =>
                        toast(error.message, { type: 'error', autoClose: false }),
                    );
            }
        }
    }

}


