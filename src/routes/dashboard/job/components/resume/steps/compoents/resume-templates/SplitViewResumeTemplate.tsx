import { ResumeFields } from "../../ResumeMutiStepForm";


interface SplitViewResumeTemplateProps {
  resume_fields: ResumeFields;
}

export function SplitViewResumeTemplate({resume_fields}:SplitViewResumeTemplateProps){
  function getMonthAndYear(date: Date) {
    return date.toLocaleDateString();
  }
return (
    <div className="w-full h-full flex p-5 gap-1">
        {/* left portion */}
      <div className="w-fit p-1 mx-auto flex flex-col gap-3 text-sm border-r">
        {/* basic deatils */}
        <section className="flex flex-col items-start justify-between gap-1">
          <h2 className="text-2xl font-bold">{resume_fields.name}</h2>

          <div className="flex flex-col gap-1">
            <h5 className="flex">City : {resume_fields.city}</h5>
            <h5 className="flex">Country : {resume_fields.country}</h5>
          </div>
          <div className="flex  flex-col gap-1">
            <h5 className="flex">Phone : {resume_fields.phone}</h5>
            <h5 className="flex">Emaill : {resume_fields.email}</h5>
          </div>
          <div className="flex flex-col gap-1 ">
            <a
              href={`https://www.linkedin.com/in/${resume_fields.linkedin_username}/`}
              className="underline"
            >
              LinkedIn: {resume_fields.linkedin_username}
            </a>
            <a
              href={`https:/github.com/${resume_fields.github_username}/`}
              className="underline"
            >
              Github: {resume_fields.github_username}{' '}
            </a>
          </div>
        </section>

        {/* skills section */}
        <section className="flex flex-col w-full">
          <h3 className="font-bold">Skills</h3>
          <ul className="w-full flex flex-col list-disc gap-1 ">
            {resume_fields.skills.split(',').map((skill) => (
              <li className="flex-grow" key={skill}>
                {skill}
              </li>
            ))}
          </ul>
        </section>

      </div>
      {/* right portion */}
      <div className="w-full mx-auto flex flex-col gap-3 text-sm p-5">
        {/* experience div */}
        {resume_fields?.experience.length > 0 && (
          <div className="flex flex-col">
            <h3 className="font-bold">Experience</h3>
            <ul className="flex flex-col gap-1 list-disc">
              {resume_fields?.experience?.map((exp) => (
                <li
                  className=""
                  key={exp.id}
                >{`${exp.company} , ${exp.position}  (${getMonthAndYear(exp.from)} - ${getMonthAndYear(exp.to)})`}</li>
              ))}
            </ul>
          </div>
        )}

        {/* education div */}
        {resume_fields.education.length > 0 && (
          <div className="flex flex-col">
            <h3 className="font-bold">Education</h3>
            <ul className="list-disc">
              {resume_fields.education.map((edu) => {
                return (
                  <li key={edu.id}>{`${edu.qualification} in ${edu.field}, ${
                    edu.school
                  }, (${getMonthAndYear(edu.from)} - ${
                    getMonthAndYear(edu.to)
                  })`}</li>
                );
              })}
            </ul>
          </div>
        )}

        {/* projects div*/}
        {resume_fields.projects.length > 0 && (
          <div className="flex flex-col">
            <h3 className="font-bold">Projects</h3>
            <ul className="">
              {resume_fields.projects.map((project) => {
                return (
                  <li key={project.id} className="">
                    **{project.name}** : {project.description}
                </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* references div */}
        <div className="flex flex-col">
          <h3 className="font-bold">References</h3>
          <ul className="list-disc">
            {resume_fields.references.map((reference) => {
              return (
                <li key={reference.name} className="">
                  {/* <h5> {reference.name}</h5>
                  <h5> {reference.contact}</h5> */}
                  **{reference.name}** : {reference.contact}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
);
}