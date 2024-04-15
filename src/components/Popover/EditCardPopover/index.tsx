import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Image } from "lucide-react";

export function ChangeBackgroundPopover({ onChange }: { onChange: () => void }) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="shadow-2xl transition-transform transform hover:scale-110 dark:bg-stone-950 cursor-pointer hover:text-blue-500">
                    <Image size={30} />
                </div>
            </PopoverTrigger>
            <PopoverContent side="bottom" className="flex p-2 mt-2 rounded-xl gap-3 justify-center items-center">
                <div className="w-6 p-3 bg-black shadow-2xl rounded-xl transition-transform transform hover:scale-110 cursor-pointer">
                </div>
                <div className="w-6 p-3 bg-blue-950 shadow-2xl rounded-xl transition-transform transform hover:scale-110 cursor-pointer">
                </div>
                <div className="w-6 p-3 bg-zinc-700 shadow-2xl rounded-xl transition-transform transform hover:scale-110 cursor-pointer">
                </div>
                <div className="w-6 p-3 bg-yellow-500 shadow-2xl rounded-xl transition-transform transform hover:scale-110 cursor-pointer">
                </div>
                <div className="w-6 p-3 bg-teal-500 shadow-2xl rounded-xl transition-transform transform hover:scale-110 cursor-pointer">
                </div>
            </PopoverContent>
        </Popover>
    )
}