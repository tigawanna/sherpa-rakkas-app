import { PageProps } from "rakkasjs"
export default function Page({}:PageProps) {
return (
<div className="w-full min-h-screen h-full flex items-center justify-center prose">
      <div className="w-full flex flex-col justify-center items-center h-full prose p-5 gap-1">
        <h1 className="">Privacy Policy</h1>
        <p className="mt-4  ray-500">
          We respect your privacy and are committed to protecting your personal
          information. This privacy policy explains how we collect, use, and
          share your personal information when you use our product.
        </p>
        <div className=" ">
          <h3 className="">
            What personal information do we collect?
          </h3>
          <p className="text-gray-500 text-sm">
            We collect the following personal information from you when you use our
            product:
          </p>
          <ul>
            <li>Your email address</li>
            <li>Your IP address</li>
            <li>The information you enter into our product, such as your skills,
              experience, and job applications</li>
          </ul>
          <h3 className="">
            How do we use your personal information?
          </h3>
          <p className="text-sm text-gray-500">
            We use your personal information to:
          </p>
          <ul>
            <li>Provide you with our product and services</li>
            <li>Improve our product and services</li>
            <li>Contact you about our product and services</li>
          </ul>
          <h3 className="">
            How do we share your personal information?
          </h3>
          <p className="text-sm text-gray-500">
            We do not share your personal information with any third parties.
          </p>
          <h3 className="">
            Your choices and rights
          </h3>
          <p className="text-sm text-gray-500">
            You have the following choices and rights regarding your personal
            information:
          </p>
          <ul>
            <li>You can access your personal information at any time by logging
              into your account.</li>
            {/* <li>You can request that we delete your personal information by
              contacting us at [your email address].</li> */}
          </ul>
        </div>
      </div>
</div>
)}
