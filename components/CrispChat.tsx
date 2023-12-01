'use client'
import { useEffect } from "react";
import { Crisp } from 'crisp-sdk-web';



export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("86948bd2-1553-4a79-a8b8-eda54b73514b");
    }, []);

    return null;
};
