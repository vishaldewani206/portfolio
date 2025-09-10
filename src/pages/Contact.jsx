import useWeb3forms from "@web3forms/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdEmail } from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa";



function Contact() {
  const {register, reset, handleSubmit} = useForm();

  const [isSuccess, setIsSuccess] = useState(false);
  const [result, setResult] = useState(null);

  const accessKey = import.meta.env.VITE_FORM_ACCESS_KEY;

    console.log(accessKey)
  const { submit: onSubmit } = useWeb3forms({
    access_key: accessKey,
    settings: {
      from_name: "Acme Inc",
      subject: "New Contact Message from your Website",
      // ... other settings,

    },
    onSuccess: (msg, data) => {
      setIsSuccess(true);
      setResult(msg);
      reset();
    },
    onError: (msg, data) => {
      setIsSuccess(false);
      setResult(msg);
    },
  });
  return (
     <div>
        <h1 className="text-center text-5xl font-medium font-heading text-primary mb-5">Contact Me</h1>
        <div className="flex md:flex-row flex-col w-full  gap-2">
            <div className="flex-1">
             <form className=" flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name" className="flex mb-2 text-xl">Full Name</label>
        <input required {...register("name", { required: true })} className="border rounded p-3 text-xl w-full dark:text-white text-black" placeholder="Enter Your Name" type="text" name="name"/>
        <label  htmlFor="name" className="flex mb-2 mt-4 text-xl">Email Address</label>
        <input required {...register("email", { required: true })} className="border rounded p-3 text-xl w-full dark:text-white text-black" placeholder="Enter Your Email" type="email" name="email"/>
        <label htmlFor="name" className="flex mb-2 mt-4 text-xl">Message</label>
        <textarea required {...register("message", { required: true })} rows={4} cols={5} className="border rounded p-3 text-xl w-full dark:text-white text-black" placeholder="Enter Your Message" name="message"></textarea>
        <button className="ml-auto bg-primary px-3 py-2 rounded-xl mt-4 cursor-pointer text-white " type="submit">Send Message</button>
      </form>

      <div>{result}</div>
        </div>
        
        <div className="flex-1 md:p-4 p-2 ">
            <div className="border p-4 rounded-t-xl">
                <div className="flex items-center ">
                    <MdEmail className="w-8 h-8 mr-2" /> 
                    Email
                    </div>           
                <p className="dark:text-zinc-300 text-zinc-500">vishaldewani500@gmail.com</p>
            </div>
            <div className="border p-4 ">
                <div className="flex items-center ">
                    <FaGithub className="w-8 h-8 mr-2" /> 
                    Github
                    </div>           
                <a href="https://github.com/vishaldewani206" target="_blank" className="dark:text-zinc-300 text-zinc-500">github.com/vishaldewani206</a>
            </div>
             <div className="border p-4 rounded-b-xl">
                <div className="flex items-center ">
                    <FaLinkedin className="w-8 h-8 mr-2" /> 
                    Linkedin
                    </div>           
                <a href="https://www.linkedin.com/in/vishal-dewani/" target="_blank" className="dark:text-zinc-300 text-zinc-500">linkedin.com/in/vishal-dewani/</a>
            </div>
        </div>
        </div>
     </div>
  );
}

export default Contact;