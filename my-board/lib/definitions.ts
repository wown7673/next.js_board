import {z} from "zod";

/*************************
 타입관련 ( Ts, zod 스키마 ) 는 이 파일에서 정의하여 동일성을 맞춘다.
 타입생성은 기본적으로 zod스키마를 통해 생성하고 이를 TS로 변환하여 사용한다.
 ***************************/


/*************************
 board 스키마 - zod
 ***************************/
export const boardSchema = z.object({
    key:z.number(),
    title: z.string()
        .min(2, {
            message: "2글자 이상을 입력하세요~",
        })
        .max(20, {
            message : "20글자를 이하로 입력하세요"
        }),
    content : z.string()
        .min(2, {
            message: "2글자 이상을 입력하세요",
        })
        .max(2000, {
            message : "2000글자를 이하로 입력하세요"
        }),
    age : z.coerce.number()
        .min(1, {
            message: "1~100사이의 값을 입력하세요",
        })
        .max(100, {
            message: "1~100사이의 값을 입력하세요",
        }),
    author : z.string(),
    last_update_date:z.date(),
    crea_date:z.date()

})

// zod의 타입 추론
export type Board = z.infer<typeof boardSchema>

/*************************
 board 스키마 - create버전
 ***************************/

// pick()은 특정 키만 저장. 이유는 유효성 검사를 하려는 속성을 맞춰야하기때문
export const createBoardSchemaMask =  boardSchema.pick({title:true, content: true});
export type CreateBoard = z.infer<typeof createBoardSchemaMask>;
