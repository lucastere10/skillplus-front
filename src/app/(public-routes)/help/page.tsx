'use client'
import HelpLottie from "@/components/Animations/HelpLottie";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function Help() {
    const router = useRouter()

    return (
        <main className="flex flex-col lg:px-48 lg:py-6 lg:gap-16">
            <div className="flex items-start justify-center gap-16">
                <div className="lg:mt-16 flex flex-col gap-6 p-8 lg:w-3/5">
                    <p className="text-3xl sm:text-5xl font-bold font-sans">Documentação SkillPlus</p>
                    <p className="text-xl font-mono">
                        A documentação SkillPlus é um guia completo que detalha as funcionalidades e o uso da plataforma. Encontre aqui informações essenciais para maximizar seu potencial no SkillPlus.
                    </p>
                </div>
                <div className="hidden lg:flex md:ml-32 md:w-2/5">
                    <HelpLottie />
                </div>
            </div>
            <div className="flex md:flex-row flex-col gap-4">
                <Card onClick={() => { alert('voce clicou aqui') }} className="m-4 w-fite md:w-4/5 rounded-xl relative shadow-2xl transition-transform transform hover:scale-110 dark:bg-stone-950 cursor-pointer">
                    <CardHeader className=" justify-center">
                        <CardTitle className="text-2xl ">Seções Principais:</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <a href="" className="hover:text-primary">
                            <p className="font-mono text-lg">
                                <strong>Introdução ao SkillPlus:{' '}</strong>Descubra o que é a SkillPlus, suas vantagens e como pode impulsionar sua carreira.
                            </p>
                        </a>
                        <a href="" className="hover:text-primary">
                            <p className="font-mono text-lg">
                                <strong>Funcionalidades da SkillPlus:{' '}</strong>Explore em detalhes todas as ferramentas que a SkillPlus oferece para o seu desenvolvimento profissional.
                            </p>
                        </a>
                        <a href="" className="hover:text-primary">
                            <p className="font-mono text-lg">
                                <strong>Perguntas Frequentes (FAQs):{' '}</strong>Respostas para as perguntas mais comuns sobre o dotCard.
                            </p>
                        </a>
                        <a href="" className="hover:text-primary">
                            <p className="font-mono text-lg">
                                <strong>Suporte e Contato:{' '}</strong>Informações de contato para suporte ao cliente e outras consultas.
                            </p>
                        </a>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                    </CardFooter>
                </Card>
                <Card onClick={() => { alert('voce clicou aqui') }} className="m-4 rounded-xl relative shadow-2xl transition-transform transform hover:scale-110 dark:bg-stone-950 cursor-pointer">
                    <CardHeader className="justify-center">
                        <CardTitle className="text-2xl">Links Importantes:
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-wrap gap-2">
                        <a href="" className="hover:text-primary">
                            <li className="font-mono text-lg">Documentação do dotCard</li>
                        </a>
                        <a href="" className="hover:text-primary">
                            <li className="font-mono text-lg">Contato</li>
                        </a>
                        <a href="" className="hover:text-primary">
                            <li className="font-mono text-lg">Termos de Uso</li>
                        </a>
                        <a href="" className="hover:text-primary">
                            <li className="font-mono text-lg">Política de Privacidade</li>
                        </a>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                    </CardFooter>
                </Card>
            </div>
        </main >
    );
}