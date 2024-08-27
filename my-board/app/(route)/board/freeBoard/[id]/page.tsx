import  {getBoard} from "@/lib/data";
import {Separator} from "@/app/_components/ui/separator";
import {Board} from "@/lib/definitions";
import { UpdateBoardBtn} from "@/app/_components/board/Button";
import {Button} from "@/app/_components/ui/button";
import {deleteBoard} from "@/lib/action";


export default async function Page({params}:{params: {id:string}}) {
    const id = params.id;
    const result  = await getBoard(id);
    const board = result[0] as Board;


    const formattedDate = board.crea_date ? new Date(board.crea_date).toLocaleDateString() : '';

    const deleteBoardWithId = deleteBoard.bind(null, Number(id));

    return (
        <main className="flex flex-col gap-2">
            <div className="shadow-lg p-11 pt-9">
                <div className="text-2xl">{board.title}</div>

                <div className="flex h-5 items-center space-x-4 mt-4">
                    {board.author || <p>미확인사용자</p>}
                    <div className="">{board.author}</div>
                    <Separator orientation="vertical" />
                    <div>{formattedDate}</div>
                </div>
                <Separator className="mt-4"/>
                <div className="mt-4 min-h-96">
                    {board.content}
                </div>
            </div>
            <div className="flex gap-1 justify-end mr-5">
                <UpdateBoardBtn id={id}/>
                <form action={deleteBoardWithId}>
                    <Button type="submit">삭제</Button>
                </form>

            </div>
        </main>
    );
}


