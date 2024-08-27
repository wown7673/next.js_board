import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/app/_components/ui/pagination";
import { getBoardTotalRows} from "@/lib/data";

export default async function MyPagination({page, query, rowSize, pageSize}: { page: number, query: string, rowSize: number , pageSize:number}) {

    // 페이징 설정값
    //console.log(`페이징 설정값 ::: row사이즈:${rowSize}, page사이즈:${pageSize}`);

    const result = await getBoardTotalRows(query);
    const totalRows = result[0].cnt;
    const totalPages = Math.ceil(totalRows / rowSize);

    let startRow = (page-1) * rowSize + 1;
    let endRow = startRow + rowSize - 1;
    if( endRow > totalRows) endRow = totalRows;
    let startPage =  page - ((page-1)%pageSize);
    let endPage = startPage + pageSize - 1;
    if(endPage >totalPages) endPage = totalPages;

    // 단순 log출력하기 쉽게 obj로 담음
    const paginationObj = {
        startRow : startRow,
        endRow : endRow,
        startPage : startPage,
        endPage : endPage,
        totalRows : totalRows,
        totalPages : totalPages,
        page : page,
        pageSize : pageSize,
        rowSize : rowSize
    }
    return (
            <Pagination>
                <PaginationContent>
                    {startPage>1 &&
                        <PaginationItem>
                            <PaginationPrevious  href={{pathname:'/board/freeBoard', query: `query=${query}&page=${startPage-1}`}}/>
                        </PaginationItem>
                    }

                    { Array.from({length:endPage-startPage+1},(_,i)=>{
                        return (
                            <PaginationItem key={i}>
                                <PaginationLink href={{pathname:'/board/freeBoard', query: `query=${query}&page=${startPage+i}`}} isActive={page === startPage+i}>{startPage+i}</PaginationLink>
                            </PaginationItem>
                        );
                    })}

                    {endPage<totalPages &&
                        <PaginationItem>
                            <PaginationNext href={{pathname:'/board/freeBoard', query: `query=${query}&page=${endPage+1}`}}/>
                        </PaginationItem>
                    }
                </PaginationContent>
            </Pagination>
    )
}