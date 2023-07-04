'use client';

import Image from "next/image";


const UserAvatar = () => {
    return(
        <Image 
            className="rounded-full"
            height="30"
            width="30"
            alt="User Avatar"
            src="/images/placeholder.png"
        />
    )
}


export default UserAvatar;