'use client';

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm} from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import BaseModal from "./BaseModal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import MainButton from "../MainButton";
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";

const RegisterModal = () => {

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading , setIsLoading] = useState(false);


    const { register, handleSubmit, formState: { errors,} } = useForm<FieldValues>({defaultValues: {name: "", email: "", password: ""}});


    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post('/api/register', data)
            .then(() => {
                registerModal.onClose();
            })
            .catch((error) => {
                toast.error("Wtf happened");
            })
            .finally(() => {
                setIsLoading(false);
            })
    }


    const modalSwap = useCallback(() => {
        
        registerModal.onClose();
        loginModal.onOpen();
    } , [loginModal, registerModal])

    const modalBody = (
        <div className="flex flex-col gap-4">
            <Heading 
                title="Welcome to Hermit." 
                subtitle="Create your Account!" 
            />
            <Input 
                register={register} 
                id="email"
                type="text" 
                label="Email"
                disabled={isLoading}
                errors={errors}
                required
            />
            <Input 
                register={register} 
                id="name"
                type="text" 
                label="Name"
                disabled={isLoading}
                errors={errors}
                required
            />
            <Input 
                register={register} 
                id="password"
                type="password" 
                label="Password"
                disabled={isLoading}
                errors={errors}
                required
            />
        </div>
    )

    const modalFooter = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <MainButton outline  label="Continue with Google" icon={FcGoogle} onClick={() => {signIn('google')}}/>
            <MainButton outline  label="Continue with Github" icon={AiFillGithub} onClick={() => {signIn('github')}}/>
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="flex flex-row items-center justify-center gap-2">
                   <div>
                        Already have an account? 
                   </div>
                   <button 
                   className="text-neutral-800 cursor-pointer hover:underline"
                   onClick={modalSwap}
                   >
                     Log in 
                   </button>
                </div>
            </div>
        </div>
    )

    return(
            <BaseModal
                disabled={isLoading}
                isOpen={registerModal.isOpen}
                title="Become a Hermit"
                actionLabel="Sign Up"
                onClose={registerModal.onClose}
                onSubmit={handleSubmit(onSubmit)}
                body={modalBody}
                footer={modalFooter}
             />
    )
}

export default RegisterModal;