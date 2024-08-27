
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/app/_components/ui/table";
import Link from "next/link";
import {Board} from "@/lib/definitions";
import {getFilteredBoards} from "@/lib/data";
import {Suspense} from "react";

export default async function boardListTable({query, pageInfo}: {
    query: string,
    pageInfo: { rowSize: number, page: number }
}) {
    let boards;
    try {
        //boards = await getBoards();
        boards = await getFilteredBoards(query, pageInfo);
    }catch (e:any){
        // 이에러를 error.tsx가 캐치함
        throw new Error(e.message);
    }

    return (
        <Table className="shadow-lg">

            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">번호</TableHead>
                    <TableHead>제목</TableHead>
                    <TableHead>내용</TableHead>
                    <TableHead className="text-right">작성자</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {boards && boards.length > 0 ? (
                        boards.map((board) => (

                            <Link href={`/board/freeBoard/${board.key}`} key={board.key} passHref legacyBehavior>
                                <TableRow>
                                    <TableCell className="font-medium">{board.key}</TableCell>
                                    <TableCell>{board.title}</TableCell>
                                    <TableCell>{board.content}</TableCell>
                                    <TableCell className="text-right">{board.author}</TableCell>
                                </TableRow>
                            </Link>

                        )))
                    : <TableRow>
                        <TableCell colSpan={4} className="text-center">No data available</TableCell>
                    </TableRow>}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}