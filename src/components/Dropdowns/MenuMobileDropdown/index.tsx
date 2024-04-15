import {
    AlignJustify,
    Book,
    Contact,
    CreditCard,
    Gem,
    Home,
    Info,
    Keyboard,
    Settings,
    User,
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"


export function MenuMobileDropdown() {
    const router = useRouter()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="border-2 p-1 rounded-lg items-center justify-center flex xl:hidden">
                    <AlignJustify className="size-8" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="ml-6 w-56">
                <DropdownMenuLabel>Menu de Opções</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => { router.push('/') }}>
                    <Home className="mr-2 h-4 w-4" />
                    <span className="font-bold">Home</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => { router.push('/cards') }}>
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Comprar</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => { router.push('/about') }}>
                        <Info className="mr-2 h-4 w-4" />
                        <span>Sobre</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => { router.push('/feature') }}>
                        <Book className="mr-2 h-4 w-4" />
                        <span>Features</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => { router.push('/contact') }}>
                        <Contact className="mr-2 h-4 w-4" />
                        <span>Contato</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => { router.push('/help') }}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Ajuda</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => { router.push('/search-profiles') }}>
                    <Gem className="mr-2 h-4 w-4" />
                    <span className="font-bold">dotCard Pro</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
