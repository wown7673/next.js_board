'use client';

import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function Page(){
    const router = useRouter();

    //
    useEffect(()=>{
        router.push('/board/freeBoard');
    }, [router]);


    return (
        <main className="h-screen flex justify-center items-center">
            <p className="text-2xl">메인</p>
            <p>메인</p>
        </main>
    );
}