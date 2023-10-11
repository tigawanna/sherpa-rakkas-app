import { ResumeFields } from "../../ResumeMutiStepForm";

interface SplitViewResumeTemplateProps {
  resume_fields: ResumeFields;
}

export function SplitViewResumeTemplate({resume_fields}:SplitViewResumeTemplateProps){
return (
    <div className="w-full h-full flex p-5 gap-1 prose">
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


        {/* summary */}
        <section className="flex flex-col ">
          <h3 className="font-bold">Summary</h3>
          <p className="">{resume_fields.summary}</p>
        </section>



        {/* experience section */}
        {resume_fields?.experience.length > 0 && (
          <section className="flex flex-col">
            <h3 className="font-bold">Experience</h3>
            <ul className="flex flex-col gap-1 list-disc">
              {resume_fields?.experience?.map((exp) => (
                <li
                  className="flex-grow"
                  key={exp.id}
                >{`${exp.company} , ${exp.position}  ${exp.from} - ${exp.to}`}</li>
              ))}
            </ul>
          </section>
        )}

        {/* education section */}
        {resume_fields.education.length > 0 && (
          <section className="flex flex-col">
            <h3 className="font-bold">Education</h3>
            <ul className="list-disc">
              {resume_fields.education.map((edu) => {
                return (
                  <li key={edu.id}>{`${edu.qualification} in ${edu.field}, ${
                    edu.school
                  }, (${edu.from.toISOString().split('T')[0]} - ${
                    edu.to.toISOString().split('T')[0]
                  })`}</li>
                );
              })}
            </ul>
          </section>
        )}

        {/* projects section*/}
        {resume_fields.projects.length > 0 && (
          <section className="flex flex-col">
            <h3 className="font-bold">Projects</h3>
            <ul className="list-disc">
              {resume_fields.projects.map((project) => {
                return (
                  <li key={project.id} >
                    <h5 className="font-bold">{project.name}</h5>
                    <p className="line-clamp-3">{project.description}</p>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
        {/* references section */}
        <section className="flex flex-col">
          <h3 className="font-bold">References</h3>
          <ul className="list-disc">
            {resume_fields.references.map((reference) => {
              return (
                <li key={reference.name} className="w-full flex gap-1">
                  <h5> {reference.name}</h5>
                  <h5> {reference.contact}</h5>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
);
}
