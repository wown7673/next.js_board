import Link from "next/link";
import {Button} from "@/app/_components/ui/button";

export function UpdateBoardBtn({id}:{id:string}){

    return (
        <Button>
            <Link href={`/board/freeBoard/${id}/edit`}>수정</Link>
        </Button>
    );
}

export  function DeleteBoardBtn({id}:{id:string}){

    return (
        <Button>
            <Link href={`/board/freeBoard/${id}/edit`}>삭제</Link>
        </Button>
    );
}