import Link from "next/link";

export default function Page(){
    return (
        <main className="h-screen flex justify-center items-center">
            <div className="border border-8 border-opacity-45 border-gray-400 rounded p-4 flex flex-col gap-7">
                <p className="text-7xl">Welcome!</p>
                <div className="flex justify-center items-center">
                    <Link href="/board" className="btn btn-primary btn-wide">게시판입장</Link>
                </div>
            </div>
        </main>
    );
}