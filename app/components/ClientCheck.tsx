'use client';

import React, { useEffect, useState } from "react";

interface ClientCheckProps{
    children: React.ReactNode;
}

const ClientCheck: React.FC<ClientCheckProps> = ({children}) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, [])
    
    if(!mounted) return null;

    return(
        <>
        {children}
        </>
    )
}

export default ClientCheck;