'use client'
import { AddCard } from "@/components/Cards/AddCard";
import { SocialCardTypeOne } from "@/components/Cards/SocialCardTypeOne";
import { useStateChange } from "@/context/stateChangeContext";
import { fetchUserCards } from "@/services/api/cards";
import { useEffect, useState } from "react";

export default function Cards() {
    const [cards, setCards] = useState<Cartao[]>([]);
    const { stateChanged } = useStateChange();

    useEffect(() => {
        handleUserCards();
    }, [stateChanged]);

    async function handleUserCards() {
        try {
            const data = await fetchUserCards();
            setCards(data.content)
            console.log(data.content)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <main className="flex flex-col py-6">
            <p className="text-2xl mb-3 sm:text-4xl md:text-5xl font-bold md:mx-48 self-center lg:self-auto">Meus Cartões</p>
            <div className="flex p-2 md:p-12 gap-6 md:gap-12 mx-auto justify-center xl:justify-start flex-wrap">
                <AddCard />
                {cards.map((card) => (
                    <SocialCardTypeOne key={card.cartaoId} card={card}/>
                ))}
            </div>
        </main>
    );
}