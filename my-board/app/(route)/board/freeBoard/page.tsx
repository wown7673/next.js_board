import BoardListTable from "@/app/_components/board/BoardListTable";
import Link from "next/link";
import {Button} from "@/app/_components/ui/button";
import Search from "@/app/_components/board/Search";
import {Suspense} from "react";
import {BoardListTableSkeleton} from "@/app/_components/common/skeletons";
import MyPagination from "@/app/_components/board/MyPagination";

export default async function Page({searchParams}: { searchParams: { page: string, query: string } }) {

    const query: string = searchParams?.query || '';

    // 페이징 설정값
    const rowSize:number = 3;
    const pageSize:number = 2;

    const page:number = Number(searchParams?.page) || 1;
    const pageInfo: { page: number; rowSize: number } = {rowSize: rowSize, page: page};


    return (
        <main>
            <div>
                <Search/>
            </div>

            <div className="p-5">
                <Suspense fallback={<BoardListTableSkeleton/>}>
                    <BoardListTable query={query} pageInfo={pageInfo}/>
                </Suspense>
            </div>

            <MyPagination page={page} query={query} rowSize={pageInfo.rowSize} pageSize={pageSize}/>



            {/*create화면이동*/}
            <div className="flex justify-end">
                <Link href="/board/freeBoard/create" className="mr-32">
                    <Button>등록</Button>
                </Link>
            </div>

        </main>
    );
}