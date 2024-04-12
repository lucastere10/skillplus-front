import * as React from "react"
import { CirclePlus } from "lucide-react"
import { useRouter } from "next/navigation"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function AddCard() {
    const router = useRouter()

    return (
        <div className="space-y-16">
            <Card onClick={() => { router.push('/cards/new') }} className="w-80 sm:w-96 h-56 m-auto rounded-xl relative shadow-2xl transition-transform transform hover:scale-110 dark:bg-stone-950 cursor-pointer">
                <CardHeader>
                    <CardTitle>Novo Cartão</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                    <CirclePlus size={64} />
                </CardContent>
                <CardFooter className="flex justify-between">
                </CardFooter>
            </Card>
        </div>
    )
}
