'use client';
import { useState, useMemo } from "react";
import BaseModal from "./BaseModal";
import useRentModal from "@/app/hooks/useRentModel";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategorySelector from "../inputs/CategorySelector";
import { FieldValues, useForm } from "react-hook-form";


enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}


const RentModal = () => {

    const rentModal = useRentModal();
    const [step, setStep] = useState(STEPS.CATEGORY);
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState:{
            errors,
        },
        reset,
    } = useForm<FieldValues>({
        defaultValues:{
            category: "",
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: "",
            price: 1,
            title: "",
            description: "",
        }
    });

    const category = watch("category");

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }


    const onBack = () => {
        setStep((value) => value - 1);
    };
    const onFoward = () => {
        setStep((value) => value + 1);
    };


    const actionLabel = useMemo(() => {
        if( step === STEPS.PRICE ){
            return 'Create'
        }
        return 'Next'
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if( step === STEPS.CATEGORY){
            return undefined
        }

        return 'Back'
    }, [step])


    let modalBody = (
        <div className="flex flex-col gap-8">
            <Heading title="Which best describes your home?" subtitle="Select a category"/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((cat) => (
                        <div key={cat.label} className="col-span-1">
                            <CategorySelector 
                                onClick={(category) => setCustomValue("category", category)}
                                selected={category === cat.label}
                                label={cat.label}
                                icon={cat.icon}
                            />
                        </div>
                    )
                )}
            </div>
        </div>
    )

    return(
        <BaseModal 
            title="Hermit your Home!"
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={rentModal.onClose}
            actionLabel={actionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            body={modalBody}
        />
    )
}

export default RentModal;