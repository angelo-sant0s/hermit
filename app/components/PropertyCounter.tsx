'use client';

import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";



interface PropertyCounterProps{
    title: string;
    subtitle: string;
    value: number;
    onChange: (value: number) => void;
}

const PropertyCounter: React.FC<PropertyCounterProps> = ({title, subtitle, value, onChange}) => {
   
    const addingCounter = useCallback(() => {
        onChange(value + 1);
    }, [onChange, value]);

    const reducingCounter = useCallback(() => {
        if(value === 1){
            toast.error(`You can't have 0 ${title}!`);
            return;
        }
        onChange(value - 1);
    }, [onChange, value, title]);

    return (
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col">
                <div className="font-medium">
                    {title}
                </div>
                <div className="font-light text-gray-600">
                    {subtitle}
                </div>
            </div>
            <div className="flex flex-row items-center gap-4">
                <div onClick={reducingCounter} className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition ">
                    <AiOutlineMinus />
                </div>
                <div className="font-light text-xl text-neutral-600">
                    {value}
                </div>
                <div onClick={addingCounter} className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition ">
                    <AiOutlinePlus />
                </div>
            </div>    
        </div>
    )
}

export default PropertyCounter;