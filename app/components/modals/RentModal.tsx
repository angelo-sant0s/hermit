'use client';
import { useState, useMemo } from "react";
import BaseModal from "./BaseModal";
import useRentModal from "@/app/hooks/useRentModel";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategorySelector from "../inputs/CategorySelector";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import PropertyCounter from "../PropertyCounter";
import dynamic from "next/dynamic";
import ImgUploader from "../inputs/ImgUploader";
import Input from "../inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


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
    const router = useRouter();
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading , setisLoading] = useState(false);
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
    const location = watch("location");
    const guestCount = watch("guestCount");
    const roomCount = watch("roomCount");
    const bathroomCount = watch("bathroomCount");
    const imageSrc = watch("imageSrc");

    const Map = useMemo(() => dynamic(() => import("../Map"), { ssr: false }), [location]);

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
    const propertySubmit: SubmitHandler<FieldValues> = (data) => {
        if(step != STEPS.PRICE){
            return onFoward();
        }else{
            setisLoading(true);
            axios.post('/api/listings', data)
            .then(() => {
                toast.success("Listing Created!");
                router.refresh();
                reset();
                setStep(STEPS.CATEGORY);
            })
            .catch(() => {
                toast.error("Something went wrong!");
            })
            .finally(() => {
                setisLoading(false);
            })
        }
    }

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

    if(step === STEPS.LOCATION){
        modalBody = (
            <div className="flex flex-col gap-8">
                <Heading title="Where is your house located" subtitle="Let your guests find you!" />
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue("location", value)}
                />
                <Map center={location?.latlng} />
            </div>
        )
    }else if(step === STEPS.INFO){
        modalBody = (
            <div className="flex flex-col gap-8">
                <Heading title="What does your house have?" subtitle="Share some information with your guests!" />
                <PropertyCounter title="Guests" subtitle="How many guests do you want in your house?" value={guestCount} onChange={(value) => setCustomValue("guestCount", value)}/>
                <hr />
                <PropertyCounter  title="Rooms" subtitle="How many rooms does your house have?" value={roomCount} onChange={(value) => setCustomValue("roomCount", value)} />
                <hr />
                <PropertyCounter  title="Bathrooms" subtitle="How many bathrooms does your house have?" value={bathroomCount} onChange={(value) => setCustomValue("bathroomCount", value)} />
            </div>
        )
    }else if(step === STEPS.IMAGES){
        modalBody = (
            <div className="flex flex-col gap-8">
                <Heading title="Share some pictures of your house." subtitle="So your guests know what to look foward too." />
                <ImgUploader onChange={(value) => setCustomValue("imageSrc", value)} value={imageSrc} />
            </div>
        )
    }else if(step === STEPS.DESCRIPTION){
        modalBody = (
            <div className="flex flex-col gap-8">
                <Heading title="Share some details about your house." subtitle="So your guests know what to look foward too." />
                <Input label="Title" id="title" disabled={isLoading} register={register} errors={errors} required  />
                <hr />
                <Input label="Description" id="description" disabled={isLoading} register={register} errors={errors} required  />
            </div>
        )
    }else if(step === STEPS.PRICE){ 
        modalBody = (
            <div className="flex flex-col gap-8">
                <Heading title="How much are you charging." subtitle="Let your guests know how much you want to receive for hermiting your house." />
                <Input label="Price" id="price" formatPrice type="number" disabled={isLoading} register={register} errors={errors} required  />
            </div>
        )
    }


    return(
        <BaseModal 
            title="Hermit your Home!"
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(propertySubmit)}
            actionLabel={actionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            secondaryLabel={secondaryActionLabel}
            body={modalBody}
        />
    )
}

export default RentModal;