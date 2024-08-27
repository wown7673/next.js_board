'use server'

import {Board, CreateBoard, createBoardSchemaMask} from "@/lib/definitions";
import deleteBoardQuery, {insertBoard, updateBoardQuery} from "@/lib/data";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";



export async function createBoard(board:CreateBoard){
    // 테스트용 유효성 검사 일부러 실패
    //board.title = "";
    //board.content="";
    
    const validateResult = createBoardSchemaMask.safeParse(board);

    let result;
    // 서버측 유효성 검사
    if(validateResult.success){
        try{
            // db저장
           const result = await insertBoard(board);
            console.log(result);
            //console.log("등록성공");
        }catch (e){
            //console.log(`등록실패 : ${e}`)
            console.log(e);
            result = { code:"FAIL" , message : "등록 실패(DB오류)", error: e};
        }

        result = {code:"SUCCESS", message : "등록 성공"};
    }else{
        result = { code:"FAIL" , message : "등록 실패", error: `${validateResult.error}` };
    }
    return result;
}

export async function updateBoard(board:CreateBoard, key:Pick<Board,"key">|Number){
    const validateResult = createBoardSchemaMask.safeParse(board);

    let result;
    // 서버측 유효성 검사
    if(validateResult.success){
        try{
            // db저장
            await updateBoardQuery(board, key);
            //console.log("등록성공");
        }catch (e){
            //console.log(`등록실패 : ${e}`)
            result = { code:"FAIL" , message : "등록 실패(DB오류)", error: e};
        }

        result = {code:"SUCCESS", message : "등록 성공"};
    }else{
        result = { code:"FAIL" , message : "등록 실패", error: `${validateResult.error}` };
    }

    return result;
}

export async function moveBoardList(key:number){
    revalidatePath(`/board/freeBoard`);
    redirect(`/board/freeBoard/${key}`);
}

export async function deleteBoard(key:Pick<Board,"key">|number){
    await deleteBoardQuery(key);

    revalidatePath('/board/freeBoard');
    redirect('/board/freeBoard');
}