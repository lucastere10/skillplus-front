'use client'
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { fetchUser, fetchUserPicture, fetchUserVerify, uploadPicture } from '@/services/api/api';
import { uploadPictureSchema } from '@/schemas/authSchema';
import { UploadImageDialog } from '@/components/Dialogs/UploadImageDialog';
import { useRouter } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';

export default function UploadPicture() {
    const [src, setSrc] = useState('https://www.pngitem.com/pimgs/m/421-4212617_person-placeholder-image-transparent-hd-png-download.png');
    const [showModal, setShowModal] = useState(false)
    const router = useRouter();

    useEffect(() => {
        async function getUser() {
            const data = await fetchUser();
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
                setSrc(data);
            } else {
                console.log(data.error);
            }
        } catch (error) {
            console.log(error);
        }
    }


    async function handleVerify() {
        const verify = await fetchUserVerify();
        if (verify) {
            if (!verify.isProfileComplete) {
                router.push('/complete-profile');
            } else {
                router.push('/');
            }
        }
    }

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<UploadPictureForm>({
        resolver: yupResolver(uploadPictureSchema)
    });

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            setSrc(URL.createObjectURL(file));
            register('arquivo', file);
        }
    };

    const onSubmit = async (data: UploadPictureForm) => {
        if (!data.arquivo) {
            alert('Favor Adicionar uma foto');
            return;
        }
        try {
            await uploadPicture(data);
            setShowModal(true);
        } catch (error: any) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screentext-gray-900 flex flex-col justify-center items-center gap-8 mt-32">
            <h1 className="font-bold text-4xl">Vamos adicionar uma foto ao perfil?</h1>
            <p className="text-center">Adicionar uma foto ao seu perfil ajuda seus amigos a reconhecê-lo e cria uma sensação de comunidade.</p>
            <Avatar className="size-60">
                <AvatarImage src={src} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <form className='flex flex-col gap-8 items-center' onSubmit={handleSubmit(onSubmit)}>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Input
                        id="picture"
                        type="file"
                        {...register('arquivo')}
                        onChange={handleFileChange}
                    />
                    {errors.arquivo && (
                        <p className="text-red-500 text-sm mb-1">
                            {errors.arquivo.message}
                        </p>
                    )}
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <div className="grid w-full gap-1.5">
                        <Label htmlFor="descricao">Descrição</Label>
                        <Textarea
                            placeholder="Sou um homem caucasiano “cis”, na casa dos 30 anos."
                            id="descricao"
                            {...register('descricao')} />
                        <p className="text-sm text-muted-foreground">
                            Adicione uma autodescrição para reuniões inclusivas! :D
                        </p>
                        {errors.descricao && (
                            <p className="text-red-500 text-sm mb-1">
                                {errors.descricao.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button variant={'ghost'} onClick={() => { router.push('/complete-profile') }}>Pular</Button>
                    <Button type='submit'>Continuar</Button>
                </div>
            </form>
            <UploadImageDialog
                showModal={showModal}
                setShowModal={setShowModal}
                onModalClose={handleVerify}
            />
        </div>
    );

}