import { PageProps } from "rakkasjs"
export default function Page({}:PageProps) {
return (
<div className="w-full h-full flex min-h-screen items-center justify-center">
      <div className="flex flex-col justify-center items-center h-full prose">
        <h1 className="">Terms of Service</h1>
        <p className="mt-4 text-sm">
          Please read the following terms of service carefully before using our
          product. By using our product, you agree to be bound by these terms
          of service.
        </p>
        <div className="mt-4 overflow-y-auto ">
          <p className="text-sm ">
            1. Our product is a job resume builder that helps you tailored resumes and cover letters for every job
            application.
          </p>
          <p className="text-sm ">
            2. You may use our product for personal or commercial use, but you
            may not redistribute or resell our product.
          </p>
          <p className="text-sm ">
            3. We reserve the right to change or terminate our product at any
            time without notice.
          </p>
          <p className="text-sm ">
            4. You are responsible for the accuracy and completeness of the
            information you enter into our product.
          </p>
          <p className="text-sm ">
            5. We are not responsible for any damages that may arise from your
            use of our product.
          </p>
            <h2 className="">Disclaimer of Liability</h2>
          <p className="text-sm ">
            Our product is still in testing and is not yet a commercial product. We are not liable in any form for any damages that may arise from your use of our product.
          </p>
        </div>
        <div className="mt-4 flex flex-row">
          {/* <button
            type="button"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleTosAcceptance}
          >
            Accept TOS
          </button> */}
        </div>
      </div>
</div>
)}
