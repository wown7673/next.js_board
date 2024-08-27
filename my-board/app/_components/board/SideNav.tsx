import Link from "next/link";
import {Separator} from "@/app/_components/ui/separator";


export default function SideNav(){
    return (
        <main className="bg-base-200 rounded-box my-8 mx-2 shadow-lg">
            <div className="p-4 flex items-center justify-center text-xl font-medium"><p>Welcome JJJ</p></div>
            <Separator />
            <div className="border-amber-950 flex w-full pt-2">
                <ul className="menu rounded-box w-56">
                    <li><Link href={"/board/freeBoard"}>자유게시판 </Link></li>
                    <li><Link href={"/board/notice"}>공지사항 </Link></li>
                </ul>
            </div>
        </main>
    );
}