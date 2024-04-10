'use client'
import AboutLottie from "@/components/Animations/AboutLottie";
import { Button } from "@/components/ui/button";

export default function About() {

    return (
        <main className="flex px-16 py-8 xl:px-36 xl:py-12">
            <div className="flex flex-col lg:p-20 lg:gap-12 lg:w-1/2">
                <h1 className="text-4xl mb-3 font-bold">O que é SKILL+?</h1>
                <div className="flex flex-col gap-4">
                    <p className="text-xl font-mono text-justify">
                        <strong>Conexão:{' '}</strong>
                        A SkillPlus revoluciona a forma como você se conecta com profissionais. Uma interface simples e direta para criar laços profissionais valiosos.
                    </p>
                    <p className="text-xl font-mono text-justify">
                        <strong>Crescimento:{' '}</strong>
                        A SkillPlus é sua aliada no desenvolvimento de carreira. Aqui, suas habilidades ganham o palco e seu talento encontra oportunidades.
                    </p>
                    <p className="text-xl font-mono text-justify">
                        <strong>Colaboração:{' '}</strong>
                        Descubra o poder da colaboração com a SkillPlus. Uma rede onde compartilhar conhecimento e experiência impulsiona o sucesso mútuo.
                    </p>
                </div>
                <div className="flex mt-3 md:mt-0 md:flex-row flex-col gap-4">
                    <Button className="rounded-full text-lg px-16 py-6">.Card para Você</Button>
                    <Button variant={'outline'} className="rounded-full text-lg px-16 py-6 border-primary">.Card para Empresas</Button>
                </div>
            </div>
            <div className="hidden lg:block w-1/2">
                <AboutLottie />
            </div>
        </main>
    );
}
