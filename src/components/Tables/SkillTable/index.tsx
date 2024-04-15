"use client"

import React, { useEffect, useState } from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, Edit, MoreHorizontal, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { activateSkill, deleteSkill, fetchSkills } from "@/services/api/skills"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { SearchProfilePagination } from "@/components/Pagination/SearchProfilePagination"
import { CreateSkillDialog } from "@/components/Dialogs/CreateSkillDialog"
import { toast } from "sonner"
import { useStateChange } from "@/context/stateChangeContext"
import { EditSkillDialog } from "@/components/Dialogs/EditSkillDialog"

export type SkillTableType = {
    id: number
    nome: string
    descricao: string
    categoria: "PROGRAMACAO" | "DESIGN_GRAFICO" | "MARKETING_DIGITAL" | "GESTAO_PROJETOS" | "VENDAS" | "IDIOMAS"
    dificuldade: "INICIANTE" | "INTERMEDIARIO" | "AVANCADO" | "ESPECIALISTA"
    url: string
    data_criacao: Date
    data_atualizacao: Date
    ativo: boolean
}

export const columns = (setSort: (sort: string) => void, sort: string, setStateChanged: any): ColumnDef<Skill>[] => [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value: any) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "skillCategoria",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        const currentOrder = sort.split(',')[1];
                        const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
                        setSort(`SKIL_TX_CATEGORIA,${newOrder}`);
                    }}                >
                    Categoria
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <Badge>{row.getValue("skillCategoria")}</Badge>
        ),
    },
    {
        accessorKey: "skillNome",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        const currentOrder = sort.split(',')[1];
                        const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
                        setSort(`SKIL_TX_NOME,${newOrder}`);
                    }}
                >
                    Nome
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("skillNome")}</div>,
    },
    {
        accessorKey: "skillDescricao",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        const currentOrder = sort.split(',')[1];
                        const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
                        setSort(`SKIL_TX_DESCRICAO,${newOrder}`);
                    }}                >
                    Descrição
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("skillDescricao")}</div>,
    },
    {
        accessorKey: "skillDificuldade",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        const currentOrder = sort.split(',')[1];
                        const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
                        setSort(`SKIL_TX_DIFICULDADE,${newOrder}`);
                    }}                >
                    Dificuldade
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("skillDificuldade")}</div>,
    },
    {
        accessorKey: "dataCadastro",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        const currentOrder = sort.split(',')[1];
                        const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
                        setSort(`SKIL_DT_ATUALIZACAO,${newOrder}`);
                    }}                >
                    Data Cadastro
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("dataCadastro")}</div>,
    },
    {
        accessorKey: "dataAtualizacao",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        const currentOrder = sort.split(',')[1];
                        const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
                        setSort(`SKIL_DT_ATUALIZACAO,${newOrder}`);
                    }}                >
                    Data Atualização
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("dataAtualizacao")}</div>,
    },
    {
        accessorKey: "ativo",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        const currentOrder = sort.split(',')[1];
                        const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
                        setSort(`SKIL_BL_ATIVO,${newOrder}`);
                    }}                >
                    Ativo
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const isActive = Boolean(row.getValue('ativo'));
            const skillRow = row.original
            return (
                <div className="flex items-center justify-center gap-2">
                    <Switch defaultChecked={isActive} className="capitalize"
                        onClick={() => {
                            setStateChanged((prevState: boolean) => !prevState),
                                activateSkill(skillRow.skillId),
                                toast.success(`Habilidade ${isActive ? "Desativada" : "Ativada"} com sucesso!`)
                        }}
                    >
                        {isActive ? "Ativo" : "Inativo"}
                    </Switch>
                </div>
            )
        },
    },
    {
        accessorKey: "editar",
        header: ({ column }) => {
            return (
                <p>Editar</p>
            )
        },
        cell: ({ row }) => {
            const skillRow = row.original
            return (
                <div className="flex items-center justify-center gap-2">
                    <EditSkillDialog skillId={skillRow.skillId} />
                </div>
            )
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const skillRow = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir Menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem
                        >
                            Ativar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Editar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                setStateChanged((prevState: boolean) => !prevState),
                                    deleteSkill(skillRow.skillId)
                            }}
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Excluir</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export function SkillTable() {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [sort, setSort] = useState("SKIL_CD_ID,asc")
    const [search, setSearch] = useState('');
    const [data, setData] = useState<Skill[]>([])
    const { stateChanged, setStateChanged } = useStateChange();

    async function handleFetchSkills() {
        try {
            const data = await fetchSkills(search, page, size, sort);
            setData(data.content);
            setTotalPages(data.totalPages)
        } catch (error) {
        }
    }

    useEffect(() => {
        handleFetchSkills();
        if (page > totalPages) {
            setPage(totalPages - 1);
        }
    }, [search, page, size, sort, stateChanged]);


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleFetchSkills();
    }

    const table = useReactTable({
        data,
        columns: columns(setSort, sort, setStateChanged),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection
        },
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <div className="flex lg:flex-row flex-col gap-8 items-center">
                    <form onSubmit={handleSubmit}>
                        <Input
                            placeholder="Filtrar Habilidades..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="lg:w-[250px] xl:w-[400px]"
                        />
                    </form>
                    <CreateSkillDialog />
                </div>
                <SearchProfilePagination
                    page={page}
                    size={size}
                    totalPages={totalPages}
                    setPage={setPage}
                    setSize={setSize}
                    setTotalPages={setTotalPages}
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender( 
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} de{" "}
                    {table.getFilteredRowModel().rows.length} linha(s) selecionadas.
                </div>
            </div>
        </div>
    )
}
