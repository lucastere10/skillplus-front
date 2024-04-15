import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Github, Instagram, Linkedin, Mail, Rss, Globe, CirclePlus, Component, CodeXml, Presentation, FolderKanban, BadgeDollarSign, Languages } from "lucide-react";
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
import { skillSchema } from "@/schemas/authSchema"
import { useStateChange } from "@/context/stateChangeContext";
import { toast } from "sonner";
import { registerSkill } from "@/services/api/skills";

export function CreateSkillDialog() {
    const [ativoValue, setAtivoValue] = useState(true);
    const [open, setOpen] = useState(false);
    const { setStateChanged } = useStateChange();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<SkillForm>({
        resolver: yupResolver(skillSchema)
    });

    const onSubmit: SubmitHandler<SkillForm> = async (data: SkillForm) => {
        try {
            const response = await registerSkill(data);
            if (response) {
                setStateChanged((prevState: boolean) => !prevState);
                toast.success("Habilidade criada com sucesso!")
                setOpen(false);
            } else {
                toast.error("Habilidade já existente")
            }
        } catch (error) {

        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="px-4 gap-4">
                    <CirclePlus />
                    <p className="text-xl">Adicionar</p>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Criar Habilidade</DialogTitle>
                    <DialogDescription>
                        Criar uma nova Habilidade. Clique em salvar ao acabar.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} action="">
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="skillNome" className="text-right">
                                Nome
                            </Label>
                            <Input
                                id="skillNome"
                                {...register('skillNome')}
                                defaultValue="Python para Machine Learning"
                                className="col-span-3"
                            />
                        </div>
                        {errors.skillNome && (
                            <p className="text-red-500 text-sm mb-1" >
                                {errors.skillNome.message}
                            </p>
                        )}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="skillDescricao" className="text-right">
                                Descrição
                            </Label>
                            <Input
                                id="skillDescricao"
                                {...register('skillDescricao')}
                                defaultValue=""
                                className="col-span-3"
                            />
                            {errors.skillDescricao && (
                                <p className="text-red-500 text-sm mb-1" >
                                    {errors.skillDescricao.message}
                                </p>
                            )}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="skillCategoria" className="text-right">
                                Categoria
                            </Label>
                            <Controller
                                control={control}
                                name="skillCategoria"
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
                                                <SelectItem value="PROGRAMACAO">
                                                    <p className="flex items-center gap-2" >
                                                        <CodeXml size={18} />Programação
                                                    </p>
                                                </SelectItem>
                                                <SelectItem value="DESIGN_GRAFICO">
                                                    <p className="flex items-center gap-2" >
                                                        <Component size={18} />Design Gráfico
                                                    </p>
                                                </SelectItem>
                                                <SelectItem value="MARKETING_DIGITAL">
                                                    <p className="flex items-center gap-2" >
                                                        <Presentation size={18} />Marketing Digital
                                                    </p>
                                                </SelectItem>
                                                <SelectItem value="GESTAO_PROJETOS">
                                                    <p className="flex items-center gap-2" >
                                                        <FolderKanban size={18} />Gestão de Projetos
                                                    </p>
                                                </SelectItem>
                                                <SelectItem value="VENDAS">
                                                    <p className="flex items-center gap-2" >
                                                        <BadgeDollarSign size={18} />Vendas
                                                    </p>
                                                </SelectItem>
                                                <SelectItem value="IDIOMAS">
                                                    <p className="flex items-center gap-2" >
                                                        <Languages size={18} />Idiomas
                                                    </p>
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        {errors.skillCategoria && (
                            <p className="text-red-500 text-sm mb-1" >
                                {errors.skillCategoria.message}
                            </p>
                        )}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="skillDificuldade" className="text-right">
                                Dificuldade
                            </Label>
                            <Controller
                                control={control}
                                name="skillDificuldade"
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
                                                <SelectLabel>Dificuldade</SelectLabel>
                                                <SelectItem value="INICIANTE">
                                                    <p className="flex items-center gap-2" >
                                                        Iniciante
                                                    </p>
                                                </SelectItem>
                                                <SelectItem value="INTERMEDIARIO">
                                                    <p className="flex items-center gap-2" >
                                                        Intermediário
                                                    </p>
                                                </SelectItem>
                                                <SelectItem value="AVANCADO">
                                                    <p className="flex items-center gap-2" >
                                                        Avançado
                                                    </p>
                                                </SelectItem>
                                                <SelectItem value="ESPECIALISTA">
                                                    <p className="flex items-center gap-2" >
                                                        Especialista
                                                    </p>
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        {errors.skillDificuldade && (
                            <p className="text-red-500 text-sm mb-1" >
                                {errors.skillDificuldade.message}
                            </p>
                        )}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="ativo" className="text-right">
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
                            {errors.ativo && (
                                <p className="text-red-500 text-sm mb-1" >
                                    {errors.ativo.message}
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
