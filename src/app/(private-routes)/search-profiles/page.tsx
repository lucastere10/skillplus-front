'use client'
import { ProfileCard } from "@/components/Cards/ProfileCard";
import { SearchProfilePagination } from "@/components/Pagination/SearchProfilePagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchUsers } from "@/services/api/api";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
//import debounce from 'lodash.debounce'

export default function SearchProfiles() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [firstLoad, setFirstLoad] = useState(true); 
    const [totalPages, setTotalPages] = useState(0);
    const [sort, setSort] = useState("USUA_CD_ID,asc")
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);


    let debounce = require('lodash.debounce');
    const handleUsers = debounce(async () => {
        if (firstLoad) setLoading(true);
        const response = await fetchUsers(search, page, size, sort)
        setUsers(response.content);
        setTotalPages(response.totalPages)
        setLoading(false);
        setFirstLoad(false);
    }, 1000);

    useEffect(() => {
        handleUsers();
    }, [search, page, size]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleUsers();
    }
    
    return (
        <main>
            <div className="bg-stone-200 w-full flex flex-col lg:flex-row  p-2 sm:p-12 md:px-48 py-4 ">
                <form onSubmit={handleSubmit} className="flex p-2 bg-white w-full max-w-md items-center space-x-3 shadow-xl px-4">
                    <Search size={48} />
                    <Input value={search} onChange={e => setSearch(e.target.value)} className="bg-transparent border-0 focus-visible:ring-offset-0 focus-visible:ring-0 text-lg" type="text" placeholder="Pequisar" />
                    <Button className="rounded-none" type="submit">Pesquisar</Button>
                </form>
                <SearchProfilePagination
                page={page} 
                size={size} 
                totalPages={totalPages}
                setPage={setPage}
                setSize={setSize}
                setTotalPages={setTotalPages}
                />
            </div>
            <div className="flex flex-col lg:px-36">
                <div className="flex p-12 gap-12 justify-center flex-wrap">
                    {loading ?
                        (
                            Array.from({ length: 4 }).map((_, index) =>
                                <Skeleton
                                    key={index}
                                    className="bg-primary w-[280px] h-[400px] rounded-xl relative"
                                />)
                        ) : (

                            users.map((user) => (
                                <ProfileCard key={user.usuarioId} usuario={user} />
                            ))

                        )}
                </div>
            </div>
        </main>
    );
}
