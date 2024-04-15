'use client'
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from '@/components/ui/switch';
import { enableTwoFa, fetchUser, updateUser } from '@/services/api/api';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateUserSchema } from '@/schemas/authSchema';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { ProfileCompleteDialog } from '@/components/Dialogs/ProfileCompleteDialog';
import { useStateChange } from '@/context/stateChangeContext';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

export default function CompleteProfile() {
    const [user, setUser] = useState<User | null>(null)
    const [showModal, setShowModal] = useState(false)
    const router = useRouter();
    const { stateChanged, setStateChanged } = useStateChange();
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedDate = date.toLocaleDateString('pt-BR', options);
    const [loading, setLoading] = useState(true);

    function formatDate(dateString: string) {
        const [day, month, year] = dateString.split("/");
        return `${year}-${month}-${day}`;
    }

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<UpdateUserForm>({
        resolver: yupResolver(updateUserSchema),
        defaultValues: {
            nome: '',
            nomeSocial: '',
            telefone: '',
            dataNascimento: '',
        },
    });
    useEffect(() => {
        async function getUser() {
            const data = await fetchUser();
            setValue('nome', data['nome']);
            setValue('nomeSocial', data['nomeSocial']);
            setValue('dataNascimento', formatDate(data['dataNascimento']));
            setValue('telefone', data['telefone']);
            setUser(data);
            setLoading(false);
        }
        getUser();
    }, [setValue, stateChanged]);

    const onSubmit = async (data: UpdateUserForm) => {
        try {
            await updateUser(data);
            setShowModal(true)
        } catch (error: any) {
            console.error(error);
            alert(error.response.data.userMessage);
        }
    };

    async function handleChangeTwoFaStatus() {
        try {
            await enableTwoFa()
            setStateChanged(prevState => !prevState);
            const ativo = (user?.twoFa ? "ativada" : "desativada")
            toast.info(`Autenticação em 2 etapas ${ativo} com sucesso`, {
                description: formattedDate,
                action: {
                    label: "fechar",
                    onClick: () => { }
                },
            })
        } catch (error) {

        }
    }

    return (
        <div className="min-h-screentext-gray-900 flex flex-col justify-center items-center gap-8 mt-32">
            <h1 className="font-bold text-4xl p-8">Vamos aprimorar seu perfil?</h1>
            <p className="text-center p-4"> Completar seu perfil não só ajuda seus amigos a reconhecê-lo, mas também cria uma experiência mais personalizada para você. Vamos lá!</p>
            {loading ? (
                <div className='mt-16 flex gap-24'>
                    <div className='flex flex-col gap-14'>
                        <Skeleton className="w-[250px] bg-primary h-[30px] rounded-full" />
                        <Skeleton className="w-[250px] bg-primary h-[30px] rounded-full" />
                        <Skeleton className="w-[250px] bg-primary h-[30px] rounded-full" />
                    </div>
                    <div className='flex flex-col gap-14'>
                        <Skeleton className="w-[250px] bg-primary h-[30px] rounded-full" />
                        <Skeleton className="w-[250px] bg-primary h-[30px] rounded-full" />
                        <Skeleton className="w-[250px] bg-primary h-[30px] rounded-full" />
                    </div>
                </div>
            ) : (
                <form className='flex flex-col sm:p-8 gap-16' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex sm:flex-row flex-col gap-32'>
                        <div className='flex flex-col gap-8 items-center'>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="nome">Nome</Label>
                                <Input
                                    id="nome"
                                    type="text"
                                    {...register('nome')}
                                />
                                {errors.nome && (
                                    <p className="text-red-500 text-sm mb-1" >
                                        {errors.nome.message}
                                    </p>
                                )}
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="nomeSocial">Nome Social</Label>
                                <Input
                                    id="nomeSocial"
                                    type="text"
                                    {...register('nomeSocial')}
                                />
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" disabled value={user?.email} />
                            </div>
                        </div>
                        <div className='flex flex-col gap-8 items-center'>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="telefone">Telefone</Label>
                                <Input
                                    id="telefone"
                                    type="text"
                                    {...register('telefone')}
                                />
                                {errors.telefone && (
                                    <p className="text-red-500 text-sm mb-1" >
                                        {errors.telefone.message}
                                    </p>
                                )}
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                                <Input
                                    id="dataNascimento"
                                    type="date"
                                    {...register('dataNascimento')}
                                />
                                {errors.dataNascimento && (
                                    <p className="text-red-500 text-sm mb-1" >
                                        {errors.dataNascimento.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center space-x-3 mt-8">
                                <Switch defaultChecked={user?.twoFa} onClick={() => { handleChangeTwoFaStatus() }} />
                                <Label htmlFor="two_fa">Habilitar 2FA</Label>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-10 justify-center">
                        <Button type='button' variant={'ghost'} onClick={() => { router.push('/') }}>Pular</Button>
                        <Button type='submit'>Continuar</Button>
                    </div>
                </form>
            )}
            <ProfileCompleteDialog
                showModal={showModal}
                setShowModal={setShowModal}
                onModalClose={() => { router.push('/') }}
            />
        </div>
    )
}