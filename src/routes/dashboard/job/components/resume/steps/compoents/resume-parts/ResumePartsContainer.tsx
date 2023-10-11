import { ResumeFields } from "../../ResumeMutiStepForm";

interface resumePartsContainerProps {
    resume_fields: ResumeFields;
}

export function ResumePartsContainer({resume_fields}:resumePartsContainerProps){
return (
 <div className='w-full h-full flex items-center justify-center p-5'>
<div className="w-full mx-auto flex flex-col gap-2 text-sm">
    {/* basic deatils */}
  <section className="flex items-center justify-between gap-2">
    <h2 className="text-3xl font-bold">{resume_fields.name}</h2>
    <h5 className="">{resume_fields.city}, {resume_fields.country}</h5>
    <h5 className="">{resume_fields.phone} | {resume_fields.email}</h5>
    
  <a href={`https://www.linkedin.com/in/${resume_fields.linkedin_username}/`} className="underline">{resume_fields.linkedin_username}LinkedIn Profile</a>
  <a href={`https:/github.com/${resume_fields.github_username}/`} className="underline">{resume_fields.github_username} Github Profile</a>
  </section>

  {/* summary */}
  <section className="flex flex-col ">
  <h3 className="font-bold">Summary</h3>
  <p className="">Software Engineer with 3+ years of experience building and maintaining high-traffic web applications. Proven ability to use React to create reusable components, optimize performance, and deliver a great user experience. Expertise in Redux, React Router, and Webpack.</p>
</section>

{/* skills section */}
  <section className="flex flex-col w-full">
  <h3 className="font-bold">Skills</h3>
  <ul className="w-full flex flex-col list-disc gap-1 ">
    <li className="flex-grow">React</li>
    <li className="flex-grow">Redux</li>
    <li className="flex-grow">React Router</li>
    <li className="flex-grow">Webpack</li>
    <li className="flex-grow">HTML</li>

  </ul>
</section>
{/* experience section */}
<section className="flex flex-col">
<h3 className="font-bold">Experience</h3>
  <ul className="flex flex-col gap-1 list-disc">
    <li className="flex-grow">Acme Corporation, Software Engineer (2021 - Present)</li>
    <li className="flex-grow">XYZ Company, Web Developer (2019 - 2021)</li>
  </ul>
</section>
{/* education section */}
<section className="flex flex-col">
    <h3 className="font-bold">Education</h3>
  <ul className="list-disc">
    <li className="mb-1">Bachelor of Science in Computer Science, California State University, Long Beach (2017 - 2021)</li>
  </ul>
</section>

    {/* projects section*/}
    <section className="flex flex-col">
    <h3 className="font-bold">Projects</h3>
  <ul className="list-disc">
    <li className="mb-1">Personal Portfolio Website: Developed a personal portfolio website using React, Redux, and React Router. The website showcases my skills and experience, and includes a blog where I write about React and other web development topics.</li>
    <li className="mb-1">To-Do List App: Developed a to-do list app using React, Redux, and React Router. The app allows users to create, edit, and delete to-do items. It also includes features such as filtering and sorting to help users stay organized.</li>
  </ul>
</section>
{/* references section */}
<section className="flex flex-col">
<h3 className="font-bold">References</h3>
  <ul className="list-disc">
    <li className="mb-1">Dean's List, California State University, Long Beach (2019 - 2021)</li>
  </ul>

</section>
</div>

 </div>
);
}
