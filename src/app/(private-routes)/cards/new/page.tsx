'use client'
import { NewSocialCardTypeOne } from "@/components/Cards/NewSocialCardTypeOne"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useStateChange } from "@/context/stateChangeContext"
import { cartaoSchema } from "@/schemas/authSchema"
import { registerCard } from "@/services/api/cards"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

export default function NewCard() {
    const router = useRouter()
    const [selectedBackground, setSelectedBackground] = useState("https://www.solidbackgrounds.com/images/950x350/950x350-black-solid-color-background.jpg")
    const [ativoValue, setAtivoValue] = useState(true);
    const { setStateChanged } = useStateChange();

    const {
        control,
        register,
        watch,
        setValue,
        handleSubmit,
        formState: { errors }
    } = useForm<CartaoForm>({
        resolver: yupResolver(cartaoSchema)
    });

    const click = (value: string) => {
        setSelectedBackground(value);
        setValue('cartaoBackground', value);
    }

    useEffect(() => {
        setValue('cartaoBackground', selectedBackground);
    }, []);

    const cartaoNome = watch("cartaoNome");
    const cartaoUsuario = watch("cartaoUsuario");
    const cartaoUrl = watch("cartaoUrl");
    const cartaoBackground = watch("cartaoBackground");
    const ativo = watch("ativo");

    const onSubmit: SubmitHandler<CartaoForm> = async (data: CartaoForm) => {
        try {
            const response = await registerCard(data);
            console.log(response)
            setStateChanged((prevState: boolean) => !prevState);
            toast.success('Cartão Registrado com Sucesso!')
            router.replace('/cards')
        } catch (error) {
            console.log(error)
        }

    };

    return (
        <main className="flex flex-col xl:flex-row justify-center md:mx-8 xl:mx-0 gap-12">
            <div className="flex md:min-w-[650px] flex-col justify-start h-fit p-10 mt-16 rounded-xl relative shadow-2xl dark:bg-zinc-800">
                <form onSubmit={handleSubmit(onSubmit)} action="">
                    <h1 className="ml-8 text-3xl font-bold">Novo Cartão</h1>
                    <div className="flex flex-col gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="cartaoUsuario" className="text-right font-mono text-lg">
                                Usuário
                            </Label>
                            <Input
                                id="cartaoUsuario"
                                {...register('cartaoUsuario')}
                                defaultValue="Nome do Usuário"
                                className="col-span-3 text-xl"
                            />
                        </div>
                        {errors.cartaoUsuario && (
                            <p className="text-red-500 text-sm mb-1" >
                                {errors.cartaoUsuario.message}
                            </p>
                        )}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="cartaoNome" className="text-right font-mono text-lg">
                                Nome do Cartão
                            </Label>
                            <Input
                                id="cartaoNome"
                                {...register('cartaoNome')}
                                defaultValue="Nome do Cartão"
                                className="col-span-3 text-xl"
                            />
                        </div>
                        {errors.cartaoNome && (
                            <p className="text-red-500 text-sm mb-1" >
                                {errors.cartaoNome.message}
                            </p>
                        )}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="cartaoUrl" className="text-right font-mono text-lg">
                                Url do Cartão
                            </Label>
                            <Input
                                id="cartaoUrl"
                                {...register('cartaoUrl')}
                                defaultValue="https://github.com/lucastere10"
                                className="col-span-3 text-xl"
                            />
                        </div>
                        {errors.cartaoUrl && (
                            <p className="text-red-500 text-sm mb-1" >
                                {errors.cartaoUrl.message}
                            </p>
                        )}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="cartaoBackground" className="text-right font-mono text-lg">
                                Background
                            </Label>
                            <Input
                                id="cartaoBackground"
                                {...register('cartaoBackground')}
                                className={`col-span-3 text-xl`}
                                defaultValue={selectedBackground === "Personalizado" ? "" : selectedBackground}
                                disabled={selectedBackground !== "Personalizado"}
                            />
                            {errors.cartaoBackground && (
                                <p className="text-red-500 text-sm mb-1" >
                                    {errors.cartaoBackground.message}
                                </p>
                            )}
                        </div>
                        <div className="mt-3 grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="ativo" className="text-right font-mono text-lg">
                                Ativo
                            </Label>
                            <Controller
                                control={control}
                                name="ativo"
                                defaultValue={ativoValue}
                                render={({ field }) => (
                                    <Switch
                                        checked={field.value}
                                        onClick={() => {
                                            field.onChange(!field.value);
                                            setAtivoValue(!field.value);
                                        }}
                                    />
                                )}
                            />
                        </div>
                        {errors.ativo && (
                            <p className="text-red-500 text-sm mb-1" >
                                {errors.ativo.message}
                            </p>
                        )}
                    </div>
                    <div className="flex justify-end">
                        <Button className="p-4 text-xl">Adicionar Cartão</Button>
                    </div>
                </form>
            </div>
            <div className="md:p-12 md:w-[650px]">
                <h1 className="font-bold text-2xl lg:text-5xl">.CARD Personalizado</h1>
                <Separator className="ml-4 mb-4 mt-2 items-start" />
                <p className="font-mono pl-4 pr-40">
                    O dotCard é mais do que um cartão de visitas. É uma experiência digital que conecta você e sua empresa ao mundo em um instante.
                </p>
                <h2 className="font-semibold text-2xl mt-7">Background</h2>
                <Separator className="ml-4 mb-4 mt-1 items-start" />
                <div>
                    <ToggleGroup
                        className="flex flex-wrap justify-start"
                        type="single"
                        defaultValue={selectedBackground}
                        value={selectedBackground}
                        onValueChange={(value) => click(value)}
                    >
                        <ToggleGroupItem defaultChecked={true}
                            className="data-[state='on']:bg-primary data-[state='on']:text-white rounded-full px-4 py-0 border-2" value="https://www.solidbackgrounds.com/images/950x350/950x350-black-solid-color-background.jpg" aria-label="Toggle bold">
                            <p>Preto</p>
                        </ToggleGroupItem>
                        <ToggleGroupItem className="data-[state='on']:bg-primary data-[state='on']:text-white rounded-full px-4 py-0 border-2" value="https://img.freepik.com/free-vector/gradient-dark-dynamic-lines-background_23-2148995950.jpg" aria-label="Toggle italic">
                            <p>Azul</p>
                        </ToggleGroupItem>
                        <ToggleGroupItem className="data-[state='on']:bg-primary data-[state='on']:text-white rounded-full px-4 py-0 border-2" value="https://img.freepik.com/premium-photo/black-paper-texture-background-black-cardboard-artworks_434420-1392.jpg" aria-label="Toggle underline">
                            <p>Textura</p>
                        </ToggleGroupItem>
                        <ToggleGroupItem className="data-[state='on']:bg-primary data-[state='on']:text-white rounded-full px-4 py-0 border-2" value="https://t4.ftcdn.net/jpg/04/37/53/59/360_F_437535966_BeqAubSzmrhlniUjsJ5NQGj7l7r7yk20.jpg" aria-label="Toggle underline">
                            <p>Premium</p>
                        </ToggleGroupItem>
                        <ToggleGroupItem className="data-[state='on']:bg-primary data-[state='on']:text-white rounded-full px-4 py-0 border-2" value="https://neki.com.br/wp-content/uploads/2024/03/Pessoas-sorrindo-Bnner-Inicial-NEKI.jpg" aria-label="Toggle underline">
                            <p>Neki</p>
                        </ToggleGroupItem>
                        <ToggleGroupItem className="data-[state='on']:bg-primary data-[state='on']:text-white rounded-full px-4 py-0 border-2" value="Personalizado" aria-label="Toggle underline">
                            <p>Personalizado</p>
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>
                <h2 className="font-semibold text-2xl mt-7">Sua logo</h2>
                <Separator className="ml-4 mb-4 mt-1 items-start" />
                <Input type="file" />
                <div className="flex lg:p-12 lg:gap-12 justify-start flex-wrap">
                    <NewSocialCardTypeOne cartaoNome={cartaoNome} cartaoBackground={cartaoBackground} cartaoUsuario={cartaoUsuario} cartaoUrl={cartaoUrl} ativo={ativo} />
                </div>
            </div>
        </main>
    )
}