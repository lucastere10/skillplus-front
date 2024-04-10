import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Trash2 } from "lucide-react";

export function DeleteContactPopover({ title, onDelete }: { title: string, onDelete: () => void }) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={'ghost'} className="hover:bg-transparent hover:text-red-500">
                    <Trash2 />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Excluir {title}?</h4>
                        <p className="text-sm text-muted-foreground">
                            Essa operação não pode ser desfeita.
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <div className="grid items-center gap-4">
                            <Button
                                variant={'destructive'}
                                className="h-8"
                                onClick={onDelete}
                            >Deletar</Button>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}