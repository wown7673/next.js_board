import {query} from "@/lib/db";

import {Board, CreateBoard} from "@/lib/definitions";
import {getCurrentDateTime} from "@/lib/utils";
import {QueryResult, RowDataPacket} from "mysql2";
import exp from "node:constants";

export async function getBoards():Promise<RowDataPacket[]>{
    // 지연테스트용
    //await new Promise(resolve => setTimeout(resolve, 2000));

    return await query<RowDataPacket[]>("SELECT * FROM board", []);
}

export async function getBoardTotalRows(search:string){
    return await query<RowDataPacket[]>(
        `SELECT count(*) as cnt FROM board 
                WHERE 
                    title LIKE ? OR 
                    content LIKE ? `
        ,[`%${search}%`,`%${search}%`]
    );
}


export async function getFilteredBoards(search:string, pageInfo: { rowSize:number, page:number }):Promise<RowDataPacket[]>{
    //await new Promise(resolve => setTimeout(resolve, 2000));

    const {rowSize, page} = pageInfo;

    // offset : 가져올 row의 시작 번호
    const offset = (page - 1)* rowSize;

    return await query<RowDataPacket[]>(
        `SELECT * FROM board 
                WHERE 
                    title LIKE ? OR 
                    content LIKE ? 
                LIMIT ${rowSize} OFFSET ${offset}`
        ,[`%${search}%`,`%${search}%`]
    );
}

export async function getBoard(id:string):Promise<RowDataPacket[]>{
    //await new Promise(resolve => setTimeout(resolve, 2000));
    return await query<RowDataPacket[]>('SELECT * FROM BOARD WHERE `KEY` = ?', [id]);
}

export async function insertBoard(board:CreateBoard){
    const {title, content} = board;
    return await query(`INSERT INTO board (title, content, crea_date, author) VALUES (? ,? ,? , ? )`, [title, content, getCurrentDateTime(), "관리자"]);
}

export async function updateBoardQuery(board:CreateBoard, key:Pick<Board, 'key'>|Number) {
    //console.log(board);
    return await query('UPDATE BOARD SET title = ? , content = ? WHERE `KEY` = ?', [board.title, board.content, key]);
}

export default async function deleteBoardQuery(key:Pick<Board,"key">|number) {
    return await query('DELETE FROM board WHERE `KEY`=?', [key]);
}

