'use client';

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm} from "react-hook-form";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import BaseModal from "./BaseModal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import MainButton from "../MainButton";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginModal = () => {

    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [isLoading , setIsLoading] = useState(false);
    const router = useRouter();
    

    const { register, handleSubmit, formState: { errors,} } = useForm<FieldValues>({defaultValues: {email: "", password: ""}});


    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        signIn('credentials', {...data, redirect: false})
        .then((callback) => {
            setIsLoading(false);
            if(callback?.ok){
                toast.success('Logged in');
                router.refresh();
                loginModal.onClose();
            }
            if(callback?.error){
                toast.error(callback.error);
            }
        })
    }


    const modalBody = (
        <div className="flex flex-col gap-4">
            <Heading 
                title="Welcome back to Hermit." 
                subtitle="Login to your account!" 
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
            <MainButton outline  label="Continue with Google" icon={FcGoogle} onClick={() => {}}/>
            <MainButton outline  label="Continue with Github" icon={AiFillGithub} onClick={() => {}}/>
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="flex flex-row items-center justify-center gap-2">
                   <div>
                        Already have an account? 
                   </div>
                   <button 
                   className="text-neutral-800 cursor-pointer hover:underline"
                   onClick={loginModal.onClose}
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
                isOpen={loginModal.isOpen}
                title="Login"
                actionLabel="Sign In"
                onClose={loginModal.onClose}
                onSubmit={handleSubmit(onSubmit)}
                body={modalBody}
                footer={modalFooter}
             />
    )
}

export default LoginModal;