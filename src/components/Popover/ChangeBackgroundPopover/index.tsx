import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Image } from "lucide-react";

export function ChangeBackgroundPopover({ onChange }: { onChange: (newBackground: string) => void }) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="shadow-2xl transition-transform transform hover:scale-110 dark:bg-stone-950 cursor-pointer hover:text-blue-500">
                    <Image size={30} />
                </div>
            </PopoverTrigger>
            <PopoverContent side="bottom" className="flex p-2 mt-2 rounded-xl gap-3 justify-center items-center">
                <button
                    className="w-6 p-3 bg-black shadow-2xl rounded-xl transition-transform transform hover:scale-110 cursor-pointer"
                    onClick={() => onChange('https://www.solidbackgrounds.com/images/950x350/950x350-black-solid-color-background.jpg')}
                />
                <button
                    className="w-6 p-3 bg-blue-950 shadow-2xl rounded-xl transition-transform transform hover:scale-110 cursor-pointer"
                    onClick={() => onChange('https://img.freepik.com/free-vector/gradient-dark-dynamic-lines-background_23-2148995950.jpg')}
                >
                </button>
                <button
                    className="w-6 p-3 bg-zinc-700 shadow-2xl rounded-xl transition-transform transform hover:scale-110 cursor-pointer"
                    onClick={() => onChange('https://img.freepik.com/premium-photo/black-paper-texture-background-black-cardboard-artworks_434420-1392.jpg')}
                >
                </button>
                <button
                    className="w-6 p-3 bg-yellow-500 shadow-2xl rounded-xl transition-transform transform hover:scale-110 cursor-pointer"
                    onClick={() => onChange('https://t4.ftcdn.net/jpg/04/37/53/59/360_F_437535966_BeqAubSzmrhlniUjsJ5NQGj7l7r7yk20.jpg')}
                >
                </button>
                <button
                    className="w-6 p-3 bg-teal-500 shadow-2xl rounded-xl transition-transform transform hover:scale-110 cursor-pointer"
                    onClick={() => onChange('https://neki.com.br/wp-content/uploads/2024/03/Pessoas-sorrindo-Bnner-Inicial-NEKI.jpg')}
                >
                </button>
            </PopoverContent>
        </Popover>
    )
}