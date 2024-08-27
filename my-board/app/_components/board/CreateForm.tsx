"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"

import {Button} from "@/app/_components/ui/button";
import {Input} from "@/app/_components/ui/input";
import {Textarea} from "@/app/_components/ui/textarea";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/app/_components/ui/form";
import {createBoard, moveBoardList} from "@/lib/action";
import {createBoardSchemaMask, CreateBoard} from "@/lib/definitions";


import {useToast} from "@/app/_components/ui/use-toast";




/*************************
     메인 컴포넌트
 ***************************/
export default function CreateForm() {

    const { toast } = useToast();

    const form = useForm<CreateBoard>({
        // resolver : 유효성검사 - 사용할 스키마 검증 라이브러리(나는 zodResolver사용) 등록
        resolver: zodResolver(createBoardSchemaMask),

        // defaultValues : form의 기본값을 채우는 속성
        defaultValues: {
            title: "",
            content:"",
        },
    })


    // 2. Define a submit handler.
    async function onSubmit(values:CreateBoard) {
        let result = null;
        try{
            result = await createBoard(values);
        }catch(e){
            //console.log(e);
            toast({
                variant: "destructive",
                title: "서버오류",
                description: "등록중 오류가 발생하였습니다.",
            });
        }

        if(result?.code === "SUCCESS" ){
            toast({
                title: "등록 성공",
                duration:2000,
            });
            await moveBoardList();
        }else{
            toast({
                title: result?.code,
                //description: result?.error,
                description: result?.message,
            });
        }
    }

    return (
        <main>
            <Form {...form}>
                <form  onSubmit={form.handleSubmit(onSubmit)}  className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="font-bold text-lg">제목</FormLabel>
                                <FormControl>
                                    <Input placeholder="제목을 입력해주세요" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="content"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="font-bold text-lg">내용</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="내용을 입력해주세요" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">등록</Button>
                </form>
            </Form>
        </main>
    )
}
