/* eslint-disable @next/next/no-img-element */
'use client'
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { ThemeToggle } from "../Switch/ThemeToggle";
import { SkeletonHeader } from "../Skeletons/SkeletonHeader";
import { Badge } from "../ui/badge";
import { fetchUser, fetchUserPicture } from "@/services/api/api";
import { HeaderDropdown } from "../Dropdowns/HeaderDropdown";
import { CreditCard } from "lucide-react";
import { MenuMobileDropdown } from "../Dropdowns/MenuMobileDropdown";
import { useTheme } from "next-themes";

interface HeaderProps {
    titulo?: string;
}

export const PageHeader: FC<HeaderProps> = () => {
    const router = useRouter()
    const { data: session, status } = useSession()
    const { theme } = useTheme()
    const [user, setUser] = useState<User | null>(null)
    const [picture, setPicture] = useState<string | null>("https://www.pngitem.com/pimgs/m/421-4212617_person-placeholder-image-transparent-hd-png-download.png");


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

    return (
        <header>
            <nav className="px-4 py-2.5 m-4">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl">
                    <MenuMobileDropdown />
                    <button onClick={() => { router.push("/") }}>
                        <div className="sm:flex hidden items-center gap-4">
                            {theme === 'dark' ? (
                                <img src="/images/logo-white.png" width={210} height={64} className="" alt="" />
                            ) : (
                                <img src="/images/logo-color.png" width={210} height={64} className="" alt="" />
                            )}
                        </div>
                    </button>
                    <div className="items-baseline gap-8 hidden xl:flex">
                        <button onClick={() => { router.push('/cards') }} className="text-lg font-semibold leading-6 hover:text-primary">Cartões</button>
                        <button onClick={() => { router.push('/search-profiles') }} className="text-lg font-semibold leading-6 hover:text-primary">Pesquisar</button>
                        <button onClick={() => { router.push('/about') }} className="text-lg font-semibold leading-6 hover:text-primary">Sobre</button>
                        <button onClick={() => { router.push('/features') }} className="text-lg font-semibold leading-6 hover:text-primary">Features</button>
                        <button onClick={() => { router.push('/contact') }} className="text-lg font-semibold leading-6 hover:text-primary">Contato</button>
                        <button onClick={() => { router.push('/help') }} className="text-lg font-semibold leading-6 hover:text-primary">Ajuda</button>
                        <button onClick={() => { router.push('/') }} className="text-xl ml-1 font-bold leading-6 hover:text-primary text-yellow-600">SKILL+ Pro</button>
                    </div>

                    {status === 'loading' ?
                        (<SkeletonHeader></SkeletonHeader>) :
                        (
                            <div className="flex items-center gap-4">
                                <div className="hidden md:flex">
                                    <ThemeToggle />
                                </div>
                                {session ? (
                                    <div className="flex items-center gap-6">
                                        <div className="hidden md:flex items-center gap-4">
                                            {picture ? (
                                                <button onClick={() => { router.push('/upload-picture') }}>
                                                    <img
                                                        className="rounded-full border-2 dark:border-white dark:bg-white p-0.5"
                                                        src={picture}
                                                        alt="User profile"
                                                        width={56}
                                                        height={56}
                                                    />
                                                </button>
                                            ) : (
                                                <div>Loading...</div>
                                            )}
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-1">
                                                    <p className="text-xl font-bold">{user?.nome}</p>
                                                    <Badge className="bg-primary text-white">
                                                        {user?.usuarioStatus}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-md font-semibold">{user?.email}</p>
                                                    <p className="text-sm">{user?.usuarioTipo}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <HeaderDropdown />
                                    </div>
                                ) : (
                                    <div className="px-1 flex gap-1">
                                        <button className="text-lx cursor-pointer" onClick={() => { router.push("/login") }} >Login</button>
                                        <p>|</p>
                                        <button className="ml-1 text-lx cursor-pointer" onClick={() => { router.push("/register") }} >Registrar</button>
                                    </div>
                                )}
                            </div>
                        )
                    }
                </div>
            </nav>
        </header>
    )

}