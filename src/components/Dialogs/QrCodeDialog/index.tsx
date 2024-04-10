import { BsQrCode } from "react-icons/bs";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react";
import { InputOTPLogin } from "@/components/Inputs/InputOTP";
import { Separator } from "@/components/ui/separator";
import { fetchSecret, verifySecret } from "@/services/api/api";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { emitShowCode } from "@/services/api/websocket";

export function QrCodeDialog() {
    const [src, setSrc] = useState<string>('')
    const [code, setCode] = useState<string>('')
    const [verify, setVerify] = useState<string>('')

    // useEffect(() => {
    //     handleSecret();

    //     const intervalId = setInterval(async () => {
    //         await handleSecret();
    //     }, 30000);

    //     return () => clearInterval(intervalId);
    // }, []);

    useEffect(() => {
        handleSecret();
    }, []);

 

    async function handleSecret() {
        const secret = await fetchSecret();
        setSrc(secret);
    }

    async function handleVerify(code: string) {
        const data = await verifySecret(code);
        setVerify(data)
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="w-full h-[56px] max-w-xs font-bold shadow-sm rounded-lg py-3 bg-secondary text-white flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5">
                    <div className="">
                        <BsQrCode className="size-6" />
                    </div>
                    <span className="ml-4 text-[15px]">
                        Entrar com QR Code
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl flex p-8 flex-col sm:flex-row">
                <div className="w-3/7 flex flex-col gap-6">
                    <div className="grid flex-1 gap-2 justify-center">
                        <Image width={500} height={500} src={src} alt="QRCODE" />
                    </div>
                    <DialogHeader className="items-center gap-2">
                        <DialogTitle>Logar com QR Code</DialogTitle>
                        <DialogDescription className="text-center">
                            Use o aplicativo Springtech para ler o QR Code e fazer o login
                        </DialogDescription>
                    </DialogHeader>
                </div>
                <div className="ml-6">
                    <Separator orientation="vertical" className="hidden sm:block"></Separator>
                    <Separator orientation="horizontal" className="block sm:hidden"></Separator>
                </div>
                <div className="w-4/7 justify-center items-center mb-11 flex flex-col p-6 gap-6">
                    <div className="text-center font-medium ">
                        Ou faça o login com o código do AuthGuard
                    </div>
                    <InputOTPLogin otpCode={code} setOtpCode={setCode} />                    
                    <p>{verify}</p>
                    <Button onClick={() => { handleVerify(code) }} className="bg-black">Verificar</Button>
                    <Button onClick={() => {emitShowCode()}}>Teste</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
