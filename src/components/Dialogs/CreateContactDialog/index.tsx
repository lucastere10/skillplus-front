import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Facebook, Github, Instagram, Linkedin, Mail, Rss, Globe, CirclePlus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { contactSchema } from "@/schemas/authSchema"
import { registerContact } from "@/services/api/contacts";
import { useStateChange } from "@/context/stateChangeContext";
import { toast } from "sonner";

export function CreateContactDialog() {
    const [privadoValue, setPrivadoValue] = useState(true);
    const [open, setOpen] = useState(false);
    const { setStateChanged } = useStateChange();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<ContactForm>({
        resolver: yupResolver(contactSchema)
    });

    const onSubmit: SubmitHandler<ContactForm> = async (data: ContactForm) => {
        const response = await registerContact(data);
        setStateChanged((prevState: boolean) => !prevState);
        toast.success("Contato criado com sucesso!")
        if (response) {
            setOpen(false);
        }
    };


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={'ghost'} className="flex items-center justify-center p-2 border-2 cursor-pointer hover:text-primary hover:border-primary">
                    <CirclePlus />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Criar Contato</DialogTitle>
                    <DialogDescription>
                        Criar um novo contato. Clique em salvar ao acabar.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} action="">
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="contatoNome" className="text-right">
                                Nome
                            </Label>
                            <Input
                                id="contatoNome"
                                {...register('contatoNome')}
                                defaultValue="Blog Pessoal"
                                className="col-span-3"
                            />
                            {errors.contatoNome && (
                                <p className="text-red-500 text-sm mb-1" >
                                    {errors.contatoNome.message}
                                </p>
                            )}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="contatoUrl" className="text-right">
                                Link
                            </Label>
                            <Input
                                id="contatoUrl"
                                {...register('contatoUrl')}
                                defaultValue="https://github.com/lucastere10"
                                className="col-span-3"
                            />
                            {errors.contatoUrl && (
                                <p className="text-red-500 text-sm mb-1" >
                                    {errors.contatoUrl.message}
                                </p>
                            )}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="contatoTipo" className="text-right">
                                Tipo
                            </Label>
                            <Controller
                                control={control}
                                name="contatoTipo"
                                defaultValue=""
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        onValueChange={(value) => {
                                            field.onChange(value);
                                        }}
                                    >
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Selecione o tipo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Redes Sociais</SelectLabel>
                                                <SelectItem value="INSTAGRAM">
                                                    <p className="flex items-center gap-2" >
                                                        <Instagram size={18} />Instagram
                                                    </p>
                                                </SelectItem>
                                                <SelectItem value="LINKEDIN">
                                                    <p className="flex items-center gap-2" >
                                                        <Linkedin size={18} />LinkedIn
                                                    </p>
                                                </SelectItem>
                                                <SelectItem value="GITHUB">
                                                    <p className="flex items-center gap-2" >
                                                        <Github size={18} />Github
                                                    </p>
                                                </SelectItem>
                                                <SelectItem value="EMAIL">
                                                    <p className="flex items-center gap-2" >
                                                        <Mail size={18} />Email
                                                    </p>
                                                </SelectItem>
                                                <SelectItem value="BLOG">
                                                    <p className="flex items-center gap-2" >
                                                        <Rss size={18} />Blog
                                                    </p>
                                                </SelectItem>
                                                <SelectItem value="WEBSITE">
                                                    <p className="flex items-center gap-2" >
                                                        <Globe size={18} />Website
                                                    </p>
                                                </SelectItem>
                                                <SelectItem value="FACEBOOK">
                                                    <p className="flex items-center gap-2" >
                                                        <Facebook size={18} />Facebook
                                                    </p>
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.contatoTipo && (
                                <p className="text-red-500 text-sm mb-1" >
                                    {errors.contatoTipo.message}
                                </p>
                            )}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="privado" className="text-right">
                                Ativo
                            </Label>
                            <Controller
                                control={control}
                                name="privado"
                                defaultValue={privadoValue}
                                render={({ field }) => (
                                    <Switch
                                        checked={field.value}
                                        onClick={() => {
                                            field.onChange(!field.value);
                                            setPrivadoValue(!field.value);
                                        }}
                                    />
                                )}
                            />
                            {errors.privado && (
                                <p className="text-red-500 text-sm mb-1" >
                                    {errors.privado.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Adiconar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
