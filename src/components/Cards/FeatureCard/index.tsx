import * as React from "react"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function FeatureCard({ titulo, descricao }: Readonly<{ titulo: string, descricao: string }>) {
    return (
        <div className="space-y-16">
            <Card onClick={() => { alert('voce clicou aqui') }} className="w-64 h-[460px] m-auto rounded-xl relative shadow-2xl transition-transform transform hover:scale-110 dark:bg-stone-950 cursor-pointer">
                <CardHeader className="h-24 justify-center">
                    <CardTitle className="text-2xl ">{titulo}</CardTitle>
                </CardHeader>
                <Separator className="mb-4" />
                <CardContent className="flex items-center justify-center">
                    <p className="font-mono text-lg">{descricao}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                </CardFooter>
            </Card>
        </div>
    )
}
