'use client'
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Facebook, Github, Instagram, Linkedin, Mail, Rss, Globe } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { fetchUserById, fetchUserPicture } from "@/services/api/api";
import { fetchContactsByUserId } from "@/services/api/contacts";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchUserSkillsByUserId } from "@/services/api/userSkills";

const IconMap = {
    INSTAGRAM: Instagram,
    EMAIL: Mail,
    GITHUB: Github,
    BLOG: Rss,
    WEBSITE: Globe,
    LINKEDIN: Linkedin,
    FACEBOOK: Facebook
};

export default function ProfileId({ params }: Readonly<{ params: { id: string } }>) {
    const [user, setUser] = useState<User | null>(null)
    const [contacts, setContacts] = useState<Contato[]>([]);
    const [userSkills, setUserSkills] = useState<UserSkill[]>([]);
    const [picture, setPicture] = useState<string | null>("https://www.pngitem.com/pimgs/m/421-4212617_person-placeholder-image-transparent-hd-png-download.png");
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function getUser() {
            const data = await fetchUserById(params.id);
            setUser(data);
            if (data) {
                handleUserPicture(data.email);
                handleUserContacts(data.usuarioId)
                handleUserSkills(data.usuarioId)
            }
        }
        getUser();
    }, []);

    async function handleUserPicture(email: string) {
        try {
            const data = await fetchUserPicture(email);
            if (typeof data === 'string') {
                setPicture(data);
            } else {
                console.log(data.error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function handleUserContacts(usuarioId: number) {
        setLoading(true)
        try {
            const data = await fetchContactsByUserId(usuarioId);
            setContacts(data.content)
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }

    async function handleUserSkills(usuarioId: number) {
        setLoading(true)
        try {
            const data = await fetchUserSkillsByUserId(usuarioId);
            setUserSkills(data.content)
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }


    return (
        <main className="flex flex-col md:mx-8 lg:mx-20 xl:mx-40 py-6">
            <div className="flex lg:flex-row flex-col gap-8">
                <div className="flex flex-col">
                    {/* CARD MOBILE */}
                    <Card className="lg:hidden flex flex-col m-0.5">
                        <CardContent className="flex p-4 gap-3">
                            <CardHeader className="bg-primary max-w-[200px] p-1">
                                <img
                                    src={picture!}
                                    alt="" />
                            </CardHeader>
                            <div className="flex flex-col gap-2">
                                <CardTitle className="items-start">{user?.nome}</CardTitle>
                                <CardDescription>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti, in.</CardDescription>
                                <Card>
                                    <CardContent className="flex flex-col justify-center p-0.5 sm:p-2">
                                        <div className="flex p-0.5 sm:p-2 justify-center">
                                            <Badge>{user?.usuarioStatus}</Badge>
                                        </div>
                                        <Separator />
                                        <div className="flex p-0.5 sm:p-2 justify-center">
                                            <p>12/09/1994</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CardContent>
                        <CardFooter className="flex">
                            <Button className="w-full">Portfolio</Button>
                        </CardFooter>
                    </Card>
                    {/* CARD WEB */}
                    <Card className="hidden lg:block max-w-[360px]">
                        <CardHeader className="bg-primary p-1">
                            <img
                                src={picture!}
                                alt="" />
                        </CardHeader>
                        <CardContent className="flex flex-col p-4 gap-3">
                            <CardTitle className="items-start">{user?.nome}</CardTitle>
                            <CardDescription>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti, in.</CardDescription>
                            <Card>
                                <CardContent className="flex flex-col justify-center p-2">
                                    <div className="flex p-2 justify-between">
                                        <p>Status</p>
                                        <Badge>{user?.usuarioStatus}</Badge>
                                    </div>
                                    <Separator />
                                    <div className="flex p-2 justify-between">
                                        <p>Membro desde</p>
                                        <p>12/09/1994</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </CardContent>
                        <CardFooter className="flex">
                            <Button className="w-full">Portfolio</Button>
                        </CardFooter>
                    </Card>
                </div>
                <div className="flex flex-col w-full gap-4">
                    <Card className="">
                        <CardHeader className="pb-2 ">
                            <CardTitle className="items-start">Sobre</CardTitle>
                            <Separator />
                        </CardHeader>
                        <CardContent>
                            <div className="flex md:flex-row flex-col">
                                <div className="flex flex-col md:w-1/2">
                                    <div className="flex p-2 mr-12 justify-between items-center">
                                        <h3 className="text-xl font-semibold">Nome</h3>
                                        <p className="text-md font-mono">{user?.nome}</p>
                                    </div>
                                    <div className="flex p-2 mr-12 justify-between items-center">
                                        <h3 className="text-xl font-semibold">Nome Social</h3>
                                        <p className="text-md font-mono">{user?.nomeSocial}</p>
                                    </div>
                                    <div className="flex p-2 mr-12 justify-between items-center">
                                        <h3 className="text-xl font-semibold">Endereço</h3>
                                        <p className="text-md font-mono">-</p>
                                    </div>
                                    <div className="flex p-2 mr-12 justify-between items-center">
                                        <h3 className="text-xl font-semibold">Data de Nascimento</h3>
                                        <p className="text-md font-mono">{user?.dataNascimento}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col md:w-1/2">
                                    <div className="flex p-2 mr-12 justify-between items-center">
                                        <h3 className="text-xl font-semibold">Telefone</h3>
                                        <p className="text-md font-mono">{user?.telefone}</p>
                                    </div>
                                    <div className="flex p-2 mr-12 justify-between items-center">
                                        <h3 className="text-xl font-semibold">Email</h3>
                                        <p className="text-md font-mono">{user?.email}</p>
                                    </div>
                                    <div className="flex p-2 mr-12 justify-between items-center">
                                        <h3 className="text-xl font-semibold">Status</h3>
                                        <p className="text-md font-mono">{user?.usuarioStatus}</p>
                                    </div>
                                    <div className="flex p-2 mr-12 justify-between items-center">
                                        <h3 className="text-xl font-semibold">Tipo</h3>
                                        <p className="text-md font-mono">{user?.usuarioTipo}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2 ">
                            <CardTitle className="items-start">Contatos</CardTitle>
                            <Separator />
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-4 p-4 md:w-1/2">
                                {loading ?
                                    (
                                        Array.from({ length: 3 }).map((_, index) =>
                                            <Skeleton
                                                key={index}
                                                className="bg-primary my-0.5 h-6 rounded-full"
                                            />)
                                    ) : (
                                        contacts.map((contact) => (
                                            <ContactCard key={contact.contatoId} contact={contact} />
                                        ))
                                    )}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2 ">
                            <CardTitle className="items-start">Habilidades</CardTitle>
                            <Separator />
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-4 p-4 w-full xl:w-10/12">
                                {userSkills.map((userSkill) => (
                                    <UserSkillCard key={userSkill.usuarioSkillId} userSkill={userSkill} />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}

function ContactCard({ contact }: Readonly<{ contact: Contato }>) {
    const IconComponent = IconMap[contact.contatoTipo as keyof typeof IconMap];
    return (
        <div className="flex justify-between gap-2">
            <div className="flex text-xl font-semibold items-center gap-2">
                <IconComponent />
                <p>
                    {contact.contatoTipo}
                </p>
            </div>
            <div className="flex gap-4 items-center">
                <a href={contact.contatoUrl} target="_blank" className="text-md hover:text-primary font-mono">{contact.contatoNome}</a>
            </div>
        </div>
    )
}

function UserSkillCard({ userSkill }: Readonly<{ userSkill: UserSkill }>) {
    return (
        <div className="grid grid-cols-4 gap-2 items-center">
            <p className="hidden col-span-2 md:block">{userSkill.skill.skillNome}</p>
            <p className="text-md hover:text-primary font-mono">{userSkill.usuarioSkillVersao}</p>
            <p className="text-md hover:text-primary font-mono">{userSkill.usuarioSkillDominio}</p>
        </div>
    )
}