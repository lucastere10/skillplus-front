import { DeleteContactPopover } from "@/components/Popover/DeleteContactPopover";
import { Switch } from "@/components/ui/switch";
import { useStateChange } from "@/context/stateChangeContext";
import { activateContact, deleteContact } from "@/services/api/contacts";
import { Facebook, Github, Instagram, Linkedin, Mail, Rss, Globe } from "lucide-react";
import { toast } from "sonner"


const IconMap = {
    INSTAGRAM: Instagram,
    EMAIL: Mail,
    GITHUB: Github,
    BLOG: Rss,
    WEBSITE: Globe,
    LINKEDIN: Linkedin,
    FACEBOOK: Facebook
};

export function ContactCard({ contact }: Readonly<{ contact: Contato }>) {
    const { setStateChanged } = useStateChange();
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedDate = date.toLocaleDateString('pt-BR', options);
    const IconComponent = IconMap[contact.contatoTipo as keyof typeof IconMap];

    async function handlePatchContact() {
        try {
            const data = await activateContact(contact.contatoId);
            setStateChanged(prevState => !prevState);
            const ativo = (data.privado ? "Ativado" : "Desativado")
            toast.success(`Contato ${ativo} com sucesso`, {
                description: formattedDate,
                action: {
                    label: "fechar",
                    onClick: () => {}
                },
            })
        } catch (error) {
            console.log(error);
        }
    }

    async function handleDeleteContact() {
        try {
            await deleteContact(contact.contatoId)
            setStateChanged(prevState => !prevState);
            toast.error("Contato removido", {
                description: formattedDate,
                action: {
                    label: "fechar",
                    onClick: () => {}
                },

            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex justify-between gap-2">
            <div className="flex text-xl font-semibold items-center gap-2">
                <IconComponent />
                <p className="hidden md:block">
                    {contact.contatoTipo}
                </p>
            </div>
            <div className="flex gap-4 items-center">
                <a href={contact.contatoUrl} target="_blank" className="text-md hover:text-primary font-mono">{contact.contatoNome}</a>
                <Switch defaultChecked={contact.privado} onClick={() => { handlePatchContact() }} />
                <DeleteContactPopover title="Contato" onDelete={handleDeleteContact} />
            </div>
        </div>
    )
}