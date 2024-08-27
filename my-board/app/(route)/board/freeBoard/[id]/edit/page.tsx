import UpdateForm from "@/app/_components/board/UpdateForm";
import {getBoard} from "@/lib/data";
import {RowDataPacket} from "mysql2";
import {Suspense} from "react";
import {Board} from "@/lib/definitions";

export default async function Page({params}: { params: { id: string } }) {

    const board = await getBoard(params.id);

    return (
        <main>수정페이지
            <div className="p-20">
                    <UpdateForm board={board[0] as Board}/>
            </div>
        </main>
    );
}