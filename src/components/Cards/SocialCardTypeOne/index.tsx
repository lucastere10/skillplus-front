import { CircleX, Edit, Nfc } from "lucide-react";
import { useEffect, useState } from "react";
import QRCode from 'qrcode'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { activateCard, deleteCard, updateBackgroundCard, updateCard } from "@/services/api/cards";
import { useStateChange } from "@/context/stateChangeContext";
import { toast } from "sonner";
import { DeleteCardPopover } from "@/components/Popover/DeleteCardPopover";
import { ChangeBackgroundPopover } from "@/components/Popover/ChangeBackgroundPopover";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { editCartaoSchema } from "@/schemas/authSchema";
import { PopoverClose } from "@radix-ui/react-popover";

export function SocialCardTypeOne({ card }: Readonly<{ card: Cartao }>) {
    const [src, setSrc] = useState("")
    const { setStateChanged } = useStateChange();
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedDate = date.toLocaleDateString('pt-BR', options);

    useEffect(() => {
        generateQR(card.cartaoUrl);
    }, []);

    let opts = {
        margin: 1
    }

    const generateQR = async (text: string) => {
        try {
            const data = await QRCode.toDataURL(text, opts)
            setSrc(data)
        } catch (err) {
            console.error(err)
        }
    }

    async function handleActivateCard() {
        try {
            const data = await activateCard(card.cartaoId);
            setStateChanged(prevState => !prevState);
            const ativo = (data.ativo ? "Ativado" : "Desativado")
            toast.info(`Cartão ${ativo} com sucesso`, {
                description: formattedDate,
                action: {
                    label: "fechar",
                    onClick: () => { }
                },

            })
        } catch (error) {
            console.log(error);
        }
    }

    async function handleDeleteCard() {
        try {
            await deleteCard(card.cartaoId)
            setStateChanged(prevState => !prevState);
            toast.error("Cartão removido", {
                description: formattedDate,
                action: {
                    label: "fechar",
                    onClick: () => { }
                },
            })
        } catch (error) {
            console.log(error);
        }
    }

    const handleEditBackgroundCard = async (newBackground: string) => {
        try {
            await updateBackgroundCard(card.cartaoId, { cartaoBackground: newBackground });
            setStateChanged(prevState => !prevState);
            toast.info('background alterado com sucesso')
        } catch (error: any) {
            console.error(error);
        }
    };

    return (
        <TooltipProvider delayDuration={200}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className={`space-y-16 ${!card.ativo ? 'opacity-60' : ''}`}>
                        <div className="w-80 sm:w-96 h-56 m-auto bg-white rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110">
                            <img className="relative bg-black object-cover w-full h-full rounded-xl" src={card.cartaoBackground} />
                            <div className={`${!card.ativo ? 'absolute' : 'hidden'} z-10 opacity-100 top-0 right-0 bottom-0 left-0 flex items-center justify-center text-white`}>
                                <CircleX size={96} />
                            </div>
                            <div className="w-full px-8 absolute top-8">
                                <div className="flex justify-between">
                                    <div className="">
                                        <p className="font-light">
                                            Nome
                                        </p>
                                        <p className="font-medium tracking-widest">
                                            {card.cartaoUsuario}
                                        </p>
                                    </div>
                                    <img className="w-14 h-14 bg-white" src={src} />
                                </div>
                                <div className="pt-1 flex items-end justify-between">
                                    <div className="">
                                        <p className="font-light">
                                            Cartão
                                        </p>
                                        <p className="font-medium tracking-more-wider">
                                            {card.cartaoNome}
                                        </p>
                                    </div>
                                    <Nfc />
                                </div>
                                <div className="pt-6 pr-6">
                                    <div className="flex justify-between">
                                        <div className="">
                                            <p className="font-light text-xs">
                                                Tipo
                                            </p>
                                            <p className="font-medium tracking-wider text-sm">
                                                {card.cartaoUsuarioTipo}
                                            </p>
                                        </div>
                                        <div className="">
                                            <p className="font-light text-xs">
                                                Status
                                            </p>
                                            <p className="font-medium tracking-wider text-sm">
                                                {card.ativo ? "Ativo" : "Inativo"}
                                            </p>
                                        </div>

                                        <div className="">
                                            <p className="font-light text-xs">
                                                CVV
                                            </p>
                                            <p className="font-bold tracking-more-wider text-sm">
                                                ...
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="flex p-3 rounded-xl gap-3 justify-center items-center">
                    <ChangeBackgroundPopover onChange={handleEditBackgroundCard} />
                    <EditCardPopover cartaoId={card.cartaoId} card={card} />
                    <DeleteCardPopover onDelete={handleDeleteCard} />
                    <Separator orientation="vertical" className="mx-2" />
                    <div>
                        <Switch defaultChecked={card.ativo} onClick={() => { handleActivateCard() }} />
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

function EditCardPopover({ cartaoId, card }: Readonly<{ cartaoId: number, card: Cartao }>) {
    const { setStateChanged } = useStateChange();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors }
    } = useForm<CartaoEditForm>({
        resolver: yupResolver(editCartaoSchema),
        defaultValues: {
            cartaoNome: '',
            cartaoUsuario: '',
            cartaoUrl: '',
        },
    });

    useEffect(() => {
        async function getUser() {
            setValue('cartaoNome', card['cartaoNome']);
            setValue('cartaoUsuario', card['cartaoUsuario']);
            setValue('cartaoUrl', card['cartaoUrl']);
        }
        getUser();
    }, [setValue]);

    const onSubmit = async (data: CartaoEditForm) => {
        try {
            await updateCard(cartaoId, data);
            setStateChanged(prevState => !prevState);
            toast.info("Cartão Atualizado com Sucesso!")
        } catch (error: any) {
            console.error(error);
            alert(error.response.data.userMessage);
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="shadow-2xl transition-transform transform hover:scale-110 dark:bg-stone-950 cursor-pointer hover:text-green-500">
                    <Edit size={30} />
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-80 mt-3">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Editar Cartão</h4>
                        <p className="text-sm text-muted-foreground">
                            Edite as informações do seu cartão.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="cartaoUsuario" className="text-right">
                                Usuário
                            </Label>
                            <Input
                                id="cartaoUsuario"
                                {...register('cartaoUsuario')}
                                className="col-span-3 p-2 m-0 h-8 text-sm"
                            />
                        </div>
                        {errors.cartaoUsuario && (
                            <p className="text-red-500 text-sm mb-1" >
                                {errors.cartaoUsuario.message}
                            </p>
                        )}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="cartaoNome" className="text-right">
                                Cartão
                            </Label>
                            <Input
                                id="cartaoNome"
                                {...register('cartaoNome')}
                                className="col-span-3 p-2 m-0 h-8 text-sm"
                            />
                        </div>
                        {errors.cartaoNome && (
                            <p className="text-red-500 text-sm mb-1" >
                                {errors.cartaoNome.message}
                            </p>
                        )}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="cartaoUrl" className="text-right">
                                URL
                            </Label>
                            <Input
                                id="cartaoUrl"
                                {...register('cartaoUrl')}
                                className="col-span-3 p-2 m-0 h-8 text-sm"
                            />
                        </div>
                        {errors.cartaoUrl && (
                            <p className="text-red-500 text-sm mb-1" >
                                {errors.cartaoUrl.message}
                            </p>
                        )}
                        <PopoverClose type="submit">
                            <Button className="w-full">Confirmar</Button>
                        </PopoverClose>
                    </form>
                </div>
            </PopoverContent>
        </Popover>
    )
}