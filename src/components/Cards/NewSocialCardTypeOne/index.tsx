import { Nfc } from "lucide-react";
import { useEffect, useState } from "react";
import QRCode from 'qrcode'

interface NewSocialCardTypeOneProps{
    cartaoNome: string 
    cartaoBackground: string
    cartaoUsuario: string
    cartaoUrl: string
    ativo: boolean
}

export function NewSocialCardTypeOne({cartaoNome, cartaoBackground, cartaoUsuario, cartaoUrl, ativo}: NewSocialCardTypeOneProps) {
    const [src, setSrc] = useState("teste")

    useEffect(() => {
        generateQR(cartaoUrl);
    }, [cartaoUrl]);
    
    let opts = {
        margin: 1
    }

    const generateQR = async (text: string) => {
        try {
            const data = await QRCode.toDataURL(text, opts)
            setSrc(data)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className={`space-y-16`}>
            <div className="w-96 h-56 m-auto bg-white rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110">
                <img className="bg-black relative object-cover w-full h-full rounded-xl" src={cartaoBackground} />
                <div className="w-full px-8 absolute top-8">
                    <div className="flex justify-between">
                        <div className="">
                            <p className="font-light">
                                Nome
                            </p>
                            <p className="font-medium tracking-widest">
                                {cartaoUsuario}
                            </p>
                        </div>
                        <img className="w-14 h-14 bg-white" src={src ? (src) : ("teste")} />
                    </div>
                    <div className="pt-1 flex items-end justify-between">
                        <div className="">
                            <p className="font-light">
                                Cartão
                            </p>
                            <p className="font-medium tracking-more-wider">
                                {cartaoNome}
                            </p>
                        </div>
                        <Nfc />
                    </div>
                    <div className="pt-6 pr-6">
                        <div className="flex justify-between">
                            <div className="">
                                <p className="font-light text-xs">
                                    Tipo
                                </p>
                                <p className="font-medium tracking-wider text-sm">
                                    {"Admin"}
                                </p>
                            </div>
                            <div className="">
                                <p className="font-light text-xs">
                                    Status
                                </p>
                                <p className="font-medium tracking-wider text-sm">
                                    {ativo ? "Ativo" : "Inativo"}
                                </p>
                            </div>

                            <div className="">
                                <p className="font-light text-xs">
                                    CVV
                                </p>
                                <p className="font-bold tracking-more-wider text-sm">
                                    ...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
