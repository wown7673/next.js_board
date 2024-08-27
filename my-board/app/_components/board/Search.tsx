'use client';

import {Input} from "@/app/_components/ui/input";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';

export default function Search(){
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams();

/*    function handleSearch(val:string){
        // 페이징을 위해 초기 page 1로 세팅
        params.set("page", "1");

        if(val) {
            params.set("query", val);
        }

        replace(`${pathname}?${params.toString()}`);
    }*/
    /*const handleSearch = (val:string)=>{
        // 페이징을 위해 초기 page 1로 세팅
        params.set("page", "1");

        if(val) {
            params.set("query", val);
        }

        replace(`${pathname}?${params.toString()}`);
    }*/

    const handleSearch = useDebouncedCallback((val:string)=>{
        // 페이징을 위해 초기 page 1로 세팅
        params.set("page", "1");

        if(val) {
            params.set("query", val);
        }

        replace(`${pathname}?${params.toString()}`);
    }, 300);


    return (
        <Input type="email" placeholder="검색" className="w-[15rem]"
               onChange={(e)=>{ handleSearch(e.target.value); }}
                defaultValue={searchParams.get("query")?.toString()}
        />
    );
}