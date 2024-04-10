'use client'
import HomeLottie from "@/components/Animations/HomeLottie";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()

  return (
    <main className="flex flex-col mx-auto xl:px-36 py-12">
      <div className="flex">
        <div className="flex flex-col w-fit p-4 gap-12 lg:p-24 lg:gap-12 lg:w-1/2">
          <h1 className="text-2xl lg:text-5xl font-bold">SkillPlus: Amplie Seu Horizonte Profissional com Conexões e Habilidades</h1>
          <p className="text-xl font-mono">
          Explore talentos e compartilhe suas competências no SkillPlus, o seu espaço para crescimento profissional e networking dinâmico.</p>
          <div className="flex lg:flex-row flex-col gap-4">
            <Button onClick={() => {router.push('/about')}} className="rounded-full text-lg px-16 py-6">Conheça o .Card</Button>
            <Button variant={'outline'} className="rounded-full text-lg px-16 py-6 border-primary">.Card para Empresas</Button>
          </div>
        </div>
        <div className="hidden lg:block w-1/2">
          <HomeLottie />
        </div>
      </div>
    </main>
  );
}