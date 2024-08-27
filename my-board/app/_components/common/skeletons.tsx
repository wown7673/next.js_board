import {Skeleton} from "@/app/_components/ui/skeleton";

export function BoardListTableSkeleton() {

    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[300px] w-full rounded-xl"/>
            <div className="space-y-2">
                <Skeleton className="h-4 w-full"/>
                <Skeleton className="h-4 w-full"/>
            </div>
        </div>
    );
}