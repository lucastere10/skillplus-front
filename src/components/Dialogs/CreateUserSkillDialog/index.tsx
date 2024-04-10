import { useEffect, useState } from "react"
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
import { useStateChange } from "@/context/stateChangeContext";
import { registerUserSkill } from "@/services/api/userSkills";
import { fetchSkillsPublic } from "@/services/api/skills";
import { userSkillSchema } from "@/schemas/authSchema";
import { toast } from "sonner";

export function CreateUserSkillDialog() {
    const [ativoValue, setAtivoValue] = useState(true);
    const [skills, setSkills] = useState<Skill[]>([])
    const [open, setOpen] = useState(false);
    const { setStateChanged } = useStateChange();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<UserSkillForm>({
        resolver: yupResolver(userSkillSchema)
    });

    useEffect(() => {
        handleFetchSkills();
    }, []);

    async function handleFetchSkills() {
        try {
            const response = await fetchSkillsPublic()
            setSkills(response.content)
        } catch (error) {

        }
    }

    const onSubmit: SubmitHandler<UserSkillForm> = async (data: UserSkillForm) => {
        const response = await registerUserSkill(data);
        setStateChanged((prevState: boolean) => !prevState);
        toast.success("Habilidade cadastrada com sucesso!")
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
                    <DialogTitle>Criar Habilidade</DialogTitle>
                    <DialogDescription>
                        Criar um novo contato. Clique em salvar ao acabar.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} action="">
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="skillNome" className="text-right">
                                Skill
                            </Label>
                            <Controller
                                control={control}
                                name="skillNome"
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
                                                <SelectLabel>Skill</SelectLabel>
                                                {skills.map((skill) => (
                                                    <div key={skill.skillId}>
                                                        <SelectItem value={skill.skillNome}>
                                                            <p className="flex items-center gap-2" >
                                                                {skill.skillNome}
                                                            </p>
                                                        </SelectItem>
                                                    </div>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        {errors.skillNome && (
                            <p className="text-red-500 text-sm mb-1" >
                                {errors.skillNome.message}
                            </p>
                        )}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="usuarioSkillDominio" className="text-right">
                                Dominio
                            </Label>
                            <Controller
                                control={control}
                                name="usuarioSkillDominio"
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
                                                <SelectLabel>Domínio</SelectLabel>
                                                <SelectItem value="BASICO">
                                                    <p className="flex items-center gap-2" >Básico</p>
                                                </SelectItem>
                                                <SelectItem value="INTERMEDIARIO">
                                                    <p className="flex items-center gap-2" >Intermediário</p>
                                                </SelectItem>
                                                <SelectItem value="AVANCADO">
                                                    <p className="flex items-center gap-2" >Avançado</p>
                                                </SelectItem>
                                                <SelectItem value="FLUENTE">
                                                    <p className="flex items-center gap-2" >Fluente</p>
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        {errors.usuarioSkillDominio && (
                            <p className="text-red-500 text-sm mb-1" >
                                {errors.usuarioSkillDominio.message}
                            </p>
                        )}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="usuarioSkillVersao" className="text-right">
                                Versão
                            </Label>
                            <Input
                                id="usuarioSkillVersao"
                                {...register('usuarioSkillVersao')}
                                defaultValue="Sem vesão"
                                className="col-span-3"
                            />
                        </div>
                        {errors.usuarioSkillVersao && (
                            <p className="text-red-500 text-sm mb-1" >
                                {errors.usuarioSkillVersao.message}
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
                        </div>
                        {errors.ativo && (
                            <p className="text-red-500 text-sm mb-1" >
                                {errors.ativo.message}
                            </p>
                        )}
                    </div>
                    <DialogFooter>
                        <Button type="submit">Adiconar</Button>
                    </DialogFooter>
                </form>
                <button onClick={() => { handleFetchSkills() }}>debug</button>
            </DialogContent>
        </Dialog>
    )
}
