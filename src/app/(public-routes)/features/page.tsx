'use client'

import { FeatureCard } from "@/components/Cards/FeatureCard";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function Features() {

    return (
        <main className="flex flex-col px-12 py-6 md:px-24 md:py-12 items-center">
            <h1 className="text-3xl md:text-5xl self-center md:self-start mb-8 md:ml-11 font-bold">Funcionalidades SkillPlus</h1>
            <div className="hidden sm:flex gap-5 flex-wrap justify-center">
                <FeatureCard
                    titulo={'Perfil Dinâmico:'}
                    descricao={'No SkillPlus, seu perfil é uma tela viva de suas habilidades. Atualize suas competências e experiências em tempo real e mostre seu crescimento profissional.'} />
                <FeatureCard
                    titulo={'Integração com Redes:'}
                    descricao={'Conecte suas redes sociais e plataformas profissionais ao SkillPlus para um networking eficaz e uma visibilidade ampliada.'} />
                <FeatureCard
                    titulo={'Descoberta Inteligente:'}
                    descricao={'Utilize nossa tecnologia de busca inteligente para descobrir talentos e oportunidades que se alinham perfeitamente com suas aspirações.'} />
                <FeatureCard
                    titulo={'Sustentabilidade Digital:'}
                    descricao={'O SkillPlus promove um ambiente de trabalho sustentável, reduzindo a necessidade de materiais impressos através de perfis digitais completos.'} />
                <FeatureCard
                    titulo={'Acessibilidade Total:'}
                    descricao={'A plataforma SkillPlus é acessível de qualquer dispositivo, garantindo que você esteja sempre conectado, não importa onde esteja.'} />
                <FeatureCard
                    titulo={'Privacidade Garantida:'}
                    descricao={'No SkillPlus, você tem o controle. Compartilhe apenas o que desejar e mantenha suas informações seguras com nossa política de privacidade robusta.'} />
            </div>
            <div className="sm:hidden flex gap-5 flex-wrap justify-center">
                <Card onClick={() => { alert('voce clicou aqui') }} className="w-72 m-auto rounded-xl">
                    <CardHeader className="justify-center py-2 px-4">
                        <CardTitle className="text-lg ">Perfil Dinâmico</CardTitle>
                    </CardHeader>
                </Card>
                <Card onClick={() => { alert('voce clicou aqui') }} className="w-72 m-auto rounded-xl">
                    <CardHeader className="justify-center py-2 px-4">
                        <CardTitle className="text-lg ">Integração com Redes</CardTitle>
                    </CardHeader>
                </Card>
                <Card onClick={() => { alert('voce clicou aqui') }} className="w-72 m-auto rounded-xl">
                    <CardHeader className="justify-center py-2 px-4">
                        <CardTitle className="text-lg ">Descoberta Inteligente</CardTitle>
                    </CardHeader>
                </Card>
                <Card onClick={() => { alert('voce clicou aqui') }} className="w-72 m-auto rounded-xl">
                    <CardHeader className="justify-center py-2 px-4">
                        <CardTitle className="text-lg ">Sustentabilidade Digital</CardTitle>
                    </CardHeader>
                </Card>
                <Card onClick={() => { alert('voce clicou aqui') }} className="w-72 m-auto rounded-xl">
                    <CardHeader className="justify-center py-2 px-4">
                        <CardTitle className="text-lg ">Acessibilidade Total</CardTitle>
                    </CardHeader>
                </Card>
                <Card onClick={() => { alert('voce clicou aqui') }} className="w-72 m-auto rounded-xl">
                    <CardHeader className="justify-center py-2 px-4">
                        <CardTitle className="text-lg ">Privacidade Garantida</CardTitle>
                    </CardHeader>
                </Card>
            </div>
        </main>
    );
}
