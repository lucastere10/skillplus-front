import React, { FC, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Facebook, Github, Instagram, Linkedin, Mail, MessageSquare, QrCode, Rss, Globe } from "lucide-react"
import { ProfileCardDropdown } from "@/components/Dropdowns/ProfileCardDropdown"
import { useRouter } from "next/navigation"
import { fetchUserPicture } from "@/services/api/api"
import { fetchContactsByUserId } from "@/services/api/contacts"

interface ProfileCardProps {
    usuario: User
}

const IconMap = {
    INSTAGRAM: Instagram,
    EMAIL: Mail,
    GITHUB: Github,
    BLOG: Rss,
    WEBSITE: Globe,
    LINKEDIN: Linkedin,
    FACEBOOK: Facebook
};


export function ProfileCard({ usuario }: ProfileCardProps) {
    const router = useRouter();
    const [contacts, setContacts] = useState<Contato[]>([]);
    const [src, setSrc] = useState('https://www.pngitem.com/pimgs/m/421-4212617_person-placeholder-image-transparent-hd-png-download.png');

    useEffect(() => {
        handleUserPicture(usuario.email);
        handleUserContacts(usuario.usuarioId)
    }, []);

    async function handleUserPicture(email: string) {
        try {
            const data = await fetchUserPicture(email);
            if (typeof data === 'string') {
                setSrc(data);
            } else {
                console.log(data.error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function handleUserContacts(usuarioId: number) {
        try {
            const data = await fetchContactsByUserId(usuarioId, 5);
            setContacts(data.content)
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Card className="w-[280px] rounded-xl relative">
            <CardHeader className="bg-gradient-to-bl from-primary to-secondary rounded-t-xl flex items-end py-14">
                <div className="absolute -translate-y-11 translate-x-6">
                    <ProfileCardDropdown />
                </div>
            </CardHeader>
            <div className="absolute -translate-y-1/2 -translate-x-[-7.5%] z-10 flex gap-4 items-center justify-center">
                <div className="rounded-full bg-stone-100 dark:bg-stone-700 p-2 transition-transform transform hover:scale-110">
                    <MessageSquare />
                </div>
                <Avatar className="size-32 border-4">
                    <AvatarImage src={src} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="rounded-full bg-stone-100 dark:bg-stone-700 p-2 transition-transform transform hover:scale-110">
                    <QrCode />
                </div>
            </div>
            <CardContent className="flex flex-col pt-20">
                <div className="flex flex-col items-center">
                    <h1 className="font-bold text-2xl">{usuario.nome}</h1>
                    <p className="font-mono">{usuario.email}</p>
                </div>
                <div className="flex min-h-[64px] mt-4 gap-4 justify-center p-4">
                    {contacts.map((contact) => (
                        <ContactIcon key={contact.contatoId} contact={contact} />
                    ))}
                </div>
            </CardContent>
            <CardFooter className="flex justify-center">
                <Button onClick={() => router.push(`/profile/${usuario.usuarioId}`)} className="w-full">Ver Perfil</Button>
            </CardFooter>
        </Card>
    )
}

function ContactIcon({ contact }: Readonly<{ contact: Contato }>) {
    const IconComponent = IconMap[contact.contatoTipo as keyof typeof IconMap];
    return (

        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="bg-stone-100 dark:bg-stone-700 hover:text-primary p-1 rounded-lg transition-transform transform hover:scale-110 cursor-pointer">
                        <IconComponent size={24} />
                    </div>
                </TooltipTrigger>
                <TooltipContent className="m-1">
                    <p>{contact.contatoNome}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}