import { DeleteContactPopover } from "@/components/Popover/DeleteContactPopover";
import { Switch } from "@/components/ui/switch";
import { useStateChange } from "@/context/stateChangeContext";
import { activateUserSkill, deleteUserSkill } from "@/services/api/userSkills";
import { toast } from "sonner"

export function UserSkillCard({ userSkill }: Readonly<{ userSkill: UserSkill }>) {
    const { setStateChanged } = useStateChange();
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedDate = date.toLocaleDateString('pt-BR', options);

    async function handlePatchUserSkill() {
        try {
            const data = await activateUserSkill(userSkill.usuarioSkillId);
            setStateChanged(prevState => !prevState);
            const ativo = (data.ativo ? "Ativada" : "Desativada")
            toast.success(`Habilidade ${ativo} com sucesso`, {
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

    async function handleDeleteUserSkill() {
        try {
            await deleteUserSkill(userSkill.usuarioSkillId)
            setStateChanged(prevState => !prevState);
            toast.error("Contato removido", {
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

    return (
        <div className="grid grid-cols-5 gap-2 items-center">
            <p className="col-span-4 md:col-span-2">{userSkill.skill.skillNome}</p>
            <p className="hidden text-md hover:text-primary font-mono md:block">{userSkill.usuarioSkillVersao}</p>
            <p className="hidden text-md hover:text-primary font-mono md:block">{userSkill.usuarioSkillDominio}</p>
            <div className="md:flex justify-end gap-4 items-center">
                <Switch defaultChecked={userSkill.ativo} onClick={() => { handlePatchUserSkill() }} />
                <DeleteContactPopover title="Skill" onDelete={handleDeleteUserSkill} />
            </div>
        </div>
    )
}