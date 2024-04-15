import { CartoesTable } from "@/components/Tables/CartoesTable";
import { ContatosTable } from "@/components/Tables/ContatosTable";
import { SkillTable } from "@/components/Tables/SkillTable";
import { UsuariosTable } from "@/components/Tables/UsuariosTable";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

export default function tables() {
    return (
        <div className="p-12">
            <div className="flex flex-col gap-8">
                <Collapsible>
                    <div className="border-2 p-4">
                        <CollapsibleTrigger><p className="text-3xl font-semibold">Habilidades</p></CollapsibleTrigger>
                        <CollapsibleContent>
                            <SkillTable />
                        </CollapsibleContent>
                    </div>
                </Collapsible>
                <Collapsible>
                    <div className="border-2 p-4">
                        <CollapsibleTrigger><p className="text-3xl font-semibold">Usuários</p></CollapsibleTrigger>
                        <CollapsibleContent>
                            <UsuariosTable />
                        </CollapsibleContent>
                    </div>
                </Collapsible>
                <Collapsible>
                    <div className="border-2 p-4">

                        <CollapsibleTrigger><p className="text-3xl font-semibold">Cartões</p></CollapsibleTrigger>
                        <CollapsibleContent>
                            <CartoesTable />
                        </CollapsibleContent>
                    </div>
                </Collapsible>
                <Collapsible>
                    <div className="border-2 p-4">
                        <CollapsibleTrigger><p className="text-3xl font-semibold">Contatos</p></CollapsibleTrigger>
                        <CollapsibleContent>
                            <ContatosTable />
                        </CollapsibleContent>
                    </div>
                </Collapsible>
            </div>
        </div>
    )
}

