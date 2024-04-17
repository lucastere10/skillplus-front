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
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { fetchUser, fetchUserPicture } from "@/services/api/api";
import { CreateContactDialog } from "@/components/Dialogs/CreateContactDialog";
import { fetchUserContacts } from "@/services/api/contacts";
import { useStateChange } from "@/context/stateChangeContext";
import { ContactCard } from "@/components/Cards/ContactCard";
import { fetchUserSkillsOfLoggedUser } from "@/services/api/userSkills";
import { CreateUserSkillDialog } from "@/components/Dialogs/CreateUserSkillDialog";
import { UserSkillCard } from "@/components/Cards/UserSkillCard";

export default function Profile() {
    const [user, setUser] = useState<User | null>(null)
    const [contacts, setContacts] = useState<Contato[]>([]);
    const [userSkills, setUserSkills] = useState<UserSkill[]>([])
    const [picture, setPicture] = useState<string | null>("https://www.pngitem.com/pimgs/m/421-4212617_person-placeholder-image-transparent-hd-png-download.png");
    const { stateChanged } = useStateChange();

    useEffect(() => {
        async function getUser() {
            const data = await fetchUser();
            setUser(data);
            if (data) {
                handleUserPicture(data.email);
            }
        }
        getUser();
    }, []);

    useEffect(() => {
        handleUserContacts();
        handleUserSkills();
    }, [stateChanged]);

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

    async function handleUserContacts() {
        try {
            const data = await fetchUserContacts();
            setContacts(data.content)
        } catch (error) {
            console.log(error);
        }
    }

    async function handleUserSkills() {
        try {
            const data = await fetchUserSkillsOfLoggedUser();
            console.log(data)
            setUserSkills(data.content)
        } catch (error) {
            console.log(error);
        }
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
                                            <p>{user?.dataNascimento}4</p>
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
                                        <p>{user?.dataCadastro}</p>
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
                    <Card className="">
                        <CardHeader className="pb-2 ">
                            <CardTitle className="items-start">Contatos</CardTitle>
                            <Separator />
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-4 p-4 w-full xl:w-2/3">
                                {contacts.map((contact) => (
                                    <ContactCard key={contact.contatoId} contact={contact} />
                                ))}
                                <CreateContactDialog />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="">
                        <CardHeader className="pb-2 ">
                            <CardTitle className="items-start">Habilidades</CardTitle>
                            <Separator />
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-4 p-4 w-full xl:w-10/12">
                                {userSkills.map((userSkill) => (
                                    <UserSkillCard key={userSkill.usuarioSkillId} userSkill={userSkill}/>
                                ))}
                                <CreateUserSkillDialog />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}
