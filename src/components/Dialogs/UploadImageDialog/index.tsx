import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type AlertDialogDemoProps = {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    onModalClose: () => void;
};

export function UploadImageDialog({ showModal, setShowModal, onModalClose }: Readonly<AlertDialogDemoProps>) {

    const handleClose = () => {
        setShowModal(false);
        onModalClose();
    };

    return (
        <AlertDialog open={showModal} onOpenChange={setShowModal}>
            <AlertDialogContent className="w-2/5">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-2xl">Imagem atualizada com sucesso!</AlertDialogTitle>
                    <AlertDialogDescription className="text-lg">
                        Sua foto foi carrega. Voce pode continuar com o seu cadastro agora.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={handleClose}>Continuar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
