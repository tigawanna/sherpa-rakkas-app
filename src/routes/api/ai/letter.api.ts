
import { TextServiceClient, } from "@google-ai/generativelanguage";
import { google } from "@google-ai/generativelanguage/build/protos/protos";
import { json } from "@hattip/response";
import { GoogleAuth } from "google-auth-library"
import { RequestContext } from "rakkasjs";



const resume_input = `
## Dennis Kinuthia
##### City : Nairobi
##### Country : Kenya
##### Phone : +2547090984481
##### Emaill : denniskinuthiawaweru@gmail.com
[LinkedIn: dennis-kinuthia](https://www.linkedin.com/in/dennis-kinuthia/) | [Github: tigawanna](https:/github.com/tigawanna/)
### Summary
love react and building on the web
### Skills
- react
- nodejs
- bun
### Experience
- Acme HQ , senior strict master  (10/9/2023 - 10/9/2023)
### Education
- Certificate in Intro to computer science, ALX software enginnering programme, (10/1/2023 - 10/11/2023)
### Projects
- **pocketbase-app** : redoing a firebase app in pocketbase + react-router + react-query + google-oauth
- **pocketbook** : minimal social app with next13 appDir , shadcn and  pocketbase
### References
- **marko** : marko@email.com
### Hackathons
- **firebase** : build with firebase
- **Outerbase** : buid something cool with outerbase
`
const job_description_input = `
**Acme web developer Agency**

**Overview**

We are looking for a talented and experienced React web developer to join our team. In this role, you will be responsible for developing and maintaining high-quality user interfaces for our web applications using React. You will work closely with other developers to design and implement new features, and you will also be responsible for fixing bugs and improving performance.

**Responsibilities**

* Develop and maintain user interfaces for web applications using React
* Work with other developers to design and implement new features
* Fix bugs and improve performance
* Write unit and integration tests
* Participate in code reviews
* Stay up-to-date on the latest trends and technologies in React development

**Qualifications**

* 2+ years of experience developing web applications with React
* Strong understanding of React concepts and best practices
* Experience with JavaScript, HTML, and CSS
* Experience with unit and integration testing
* Experience with code review
* Excellent problem-solving and debugging skills
* Ability to work independently and as part of a team

**Bonus Qualifications**

* Experience with Redux
* Experience with TypeScript
* Experience with GraphQL
* Experience with continuous integration and continuous delivery (CI/CD)

**Benefits**

* Competitive salary and benefits package
* Opportunity to work on challenging and innovative projects
* Collaborative and supportive work environment
* Opportunities for professional development and growth

**To Apply**

Please submit your resume and a cover letter to [email protected]

**Please note that this is just a generic job description. You may want to 
tailor it to the specific needs of your company and the role you are hiring for.**
`






export async function post(ctx:RequestContext){
    try{
        const MODEL_NAME = "models/text-bison-001";
        const API_KEY = import.meta.env.RAKKAS_PALM_API_KEY;

        const body = await ctx.request.json()

        const job_description_input = body?.input?.job
        const resume_input = body?.input?.resume;


        if (!resume_input) {
            return json({
                error: {
                    message: 'resume is required',
                    original_error: new Error('resume is required'),
                },
            });
        }
        if (!job_description_input) {
            return json({
                error: {
                    message: 'job description is required',
                    original_error: new Error('job description is required'),
                },
            });
        }
        if (!body?.input?.user_id) {
            return json({
                error: {
                    message: 'user_id is required',
                    original_error: new Error('resume is required'),
                },
            });
        }
        const rate_limit_api = new URL(ctx.url.origin)
        rate_limit_api.pathname = "/api/auth/rate-limit"
        const is_approved = await ctx.fetch(rate_limit_api.toString(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: body?.input?.user_id,
            }),
        }).then((res) => res.json())
            .then((res) => res as LuciaUser | ReturnedError)

        if ('error' in is_approved) {
            return json({
                error: {
                    message: is_approved.error.message,
                    original_error: is_approved.error.original_error,
                },
            });
        }
        const promptString = `craft a cover letter for a 
         software developer using rich text and ATS-friendly 
        formatting for an applicant with the following resume ${resume_input} 
        with the following job description ${job_description_input}`;
        const stopSequences: string[] = [];

        const client = new TextServiceClient({
            authClient: new GoogleAuth().fromAPIKey(API_KEY),
        });

       const result =await client.generateText({
            // required, which model to use to generate the result
            model: MODEL_NAME,
            // optional, 0.0 always uses the highest-probability result
            temperature: 0.7,
            // optional, how many candidate results to generate
            candidateCount: 1,
            // optional, number of most probable tokens to consider for generation
            topK: 40,
            // optional, for nucleus sampling decoding strategy
            topP: 0.95,
            // optional, maximum number of output tokens to generate
            maxOutputTokens: 1024,
            // optional, sequences at which to stop model generation
            stopSequences: stopSequences,
            // optional, safety settings
            safetySettings: [{ "category": "HARM_CATEGORY_DEROGATORY", "threshold": 1 }, { "category": "HARM_CATEGORY_TOXICITY", "threshold": 1 }, { "category": "HARM_CATEGORY_VIOLENCE", "threshold": 2 }, { "category": "HARM_CATEGORY_SEXUAL", "threshold": 2 }, { "category": "HARM_CATEGORY_MEDICAL", "threshold": 2 }, { "category": "HARM_CATEGORY_DANGEROUS", "threshold": 2 }],
            prompt: {
                text: promptString,
            },
        })

        let cover_letter_response = ""
        result.forEach((item,idx)=>{
    
            if (item){
                // @ts-expect-error
                item.candidates.forEach((x, index) => {
                    cover_letter_response = cover_letter_response + x.output
                })
          }
        })

  
        return json({
            resume:cover_letter_response,
            original_response:result
        }, { status: 200 });
        
    }catch(err:any){
        console.log("error creating cover letter ========= ",err)
        return json({message:"error creating cover letter",original_error:err}, { status: 400 });
    }
}
