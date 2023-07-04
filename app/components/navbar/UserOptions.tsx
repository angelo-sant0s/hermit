'use client';
import {RiMenu3Fill} from 'react-icons/ri';
import { useCallback, useState } from 'react';
import UserAvatar from '../UserAvatar';
import ItemsUserMenu from './ItemsUserMenu';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';

interface UserOptionsProps {
    currentUser?: User;
}

const UserOptions: React.FC<UserOptionsProps> = ({currentUser}) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((current) => !current);
    }, []);

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div 
                    className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
                    onClick={() => {}}
                >
                    Hermit your House!
                </div>
                <div
                    onClick={toggleOpen}
                    className="p-4 md:px-2 md:py-1 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                    <RiMenu3Fill />
                    <div className="hidden md:block">
                        <UserAvatar />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                            <>
                            <ItemsUserMenu  onClick={() => {}} label="My Trips" />
                            <ItemsUserMenu  onClick={() => {}} label="My Favourites" />
                            <ItemsUserMenu  onClick={() => {}} label="My Reservations" />
                            <ItemsUserMenu  onClick={() => {}} label="My Houses" />
                            <ItemsUserMenu  onClick={() => {}} label="Hermit my House" />
                            <hr />
                            <ItemsUserMenu  onClick={() => { signOut();}} label="Logout" />
                            </>
                        ) : (
                            <>
                            <ItemsUserMenu  onClick={loginModal.onOpen} label="Login" />
                            <ItemsUserMenu  onClick={registerModal.onOpen} label="Sign Up" />
                            </>
                        )}
                        
                    </div> 
                </div>    
            )}
        </div>
    );
};

export default UserOptions;