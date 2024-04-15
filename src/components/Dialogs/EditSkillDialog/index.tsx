import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Component, CodeXml, Presentation, FolderKanban, BadgeDollarSign, Languages, Edit } from "lucide-react";
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
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { skillSchema } from "@/schemas/authSchema"
import { useStateChange } from "@/context/stateChangeContext";
import { toast } from "sonner";
import { editSkill, fetchSkillById } from "@/services/api/skills";
import { Skeleton } from "@/components/ui/skeleton";


export function EditSkillDialog({ skillId }: Readonly<{ skillId: number }>) {
    const [ativoValue, setAtivoValue] = useState(true);
    const [open, setOpen] = useState(false);
    const { stateChanged, setStateChanged } = useStateChange();
    const [loading, setLoading] = useState(true);
    

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors }
    } = useForm<UpdateSkillForm>({
        resolver: yupResolver(skillSchema),
        defaultValues: {
            skillNome: '',
            skillDescricao: '',
            skillCategoria: '',
            skillDificuldade: '',
        },
    });

    const onSubmit = async (data: UpdateSkillForm) => {
        try {
            const response = await editSkill(skillId, data);
            setStateChanged((prevState: boolean) => !prevState);
            toast.success("Habilidade atualizada com sucesso!")
            if (response) {
                setOpen(false);
            }
        } catch (error) {
            console.error(error);
        }
    };    

    useEffect(() => {
        async function getSkill() {
            const data = await fetchSkillById(skillId);
            setValue('skillNome', data['skillNome']);
            setValue('skillDescricao', data['skillDescricao']);
            setValue('skillCategoria', data['skillCategoria']);
            setValue('skillDificuldade', data['skillDificuldade']);
            setAtivoValue(data.ativo)
            setLoading(false);
        }
        getSkill();
    }, [setValue, stateChanged]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div >
                    <Edit size={48} className="mr-2 h-4 w-4" />
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Editar Habilidade</DialogTitle>
                    <DialogDescription>
                        Editar uma nova Habilidade. Clique em salvar ao acabar.
                    </DialogDescription>
                </DialogHeader>
                {loading ? (
                    <div className='flex flex-col gap-14'>
                        <Skeleton className="w-[75px] bg-primary h-[30px] rounded-full" />
                        <Skeleton className="w-[75px] bg-primary h-[30px] rounded-full" />
                        <Skeleton className="w-[75px] bg-primary h-[30px] rounded-full" />
                        <Skeleton className="w-[75px] bg-primary h-[30px] rounded-full" />
                        <Skeleton className="w-[75px] bg-primary h-[30px] rounded-full" />
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} action="">
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="skillNome" className="text-right">
                                    Nome
                                </Label>
                                <Input
                                    id="skillNome"
                                    {...register('skillNome')}
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
                            <Button type="submit">Salvar</Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    )
}
