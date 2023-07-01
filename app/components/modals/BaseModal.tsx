'use client';

import { useCallback, useEffect, useState } from "react";
import {AiOutlineClose} from 'react-icons/ai';
import MainButton from "../MainButton";

interface AuthModalProps{
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryLabel?: string;
}

const BaseModal: React.FC<AuthModalProps> = ({
    isOpen, onClose, onSubmit,  
    title, body, footer,
    actionLabel, disabled, 
    secondaryAction, secondaryLabel
}) => {

    const [show, setShow] = useState(isOpen);

    useEffect(() => {
     setShow(isOpen);
    }, [isOpen]);
    
    const closeModal = useCallback(() => {
     if(disabled) return;
     setShow(false);
     setTimeout(() => {
        onClose();
     }, 300)
    }, [disabled, onClose]);

    const modalSubmit = useCallback(() => {
     if(disabled) return;
     onSubmit();
    }, [disabled, onSubmit]);

    const secondayActionHandler = useCallback(() => {
     if(disabled || !secondaryAction) return;
     secondaryAction();
    }, [disabled, secondaryAction]);

    if(!isOpen) return null;

    return( 
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
                <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/6 my-6 mx-auto h-full md:h-auto lg:h-auto">
                    <div className={`translate duration-300 h-full
                     ${show ? "translate-y-0" : "translate-y-full"}
                     ${show ? "opacity-100" : "opacity-0"}`}>
                        <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="flex items-center p-6 rounded-t relative justify-center border-b-[1px]">
                                <button className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                                onClick={closeModal}>
                                    <AiOutlineClose size={18} />
                                </button>
                                <div className="text-lg font-semibold">
                                    {title}
                                </div>
                            </div>
                            <div className="relative p-6 flex-auto">
                                {body}
                            </div>
                            <div className="flex flex-col gap-2 p-6">
                                <div className="flex flex-row items-center gap-4 w-full">
                                    {secondaryLabel && secondaryAction && (<MainButton disabled={disabled} label={secondaryLabel} onClick={secondayActionHandler} outline />)}
                                    <MainButton disabled={disabled} label={actionLabel} onClick={modalSubmit}/>
                                </div>
                                {footer}
                            </div>    
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default BaseModal;