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
import { ArrowUpDown, Ban, Check, ChevronDown, CircleCheckBig, CircleMinus, Clock, Edit, MoreHorizontal, Trash2 } from "lucide-react"

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
import { Switch } from "@/components/ui/switch"
import { SearchProfilePagination } from "@/components/Pagination/SearchProfilePagination"
import { activateUser, banUser, blockUser, fetchUsers, inactivateUser } from "@/services/api/api"
import { useStateChange } from "@/context/stateChangeContext"
import { activateContact, fetchContacts } from "@/services/api/contacts"
import { toast } from "sonner"

export type ContatoTableType = {
    contatoId: number
    contatoNome: string
    contatoUrl: string
    contatoTipo: string
    privado: boolean
}

export const columns = (setSort: (sort: string) => void, sort: string, setStateChanged: any): ColumnDef<Contato>[] => [

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
        accessorKey: "contatoNome",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        const currentOrder = sort.split(',')[1];
                        const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
                        setSort(`CONT_TX_NOME,${newOrder}`);
                    }}
                >
                    Nome
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div >{row.getValue("contatoNome")}</div>,
    },
    {
        accessorKey: "contatoTipo",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        const currentOrder = sort.split(',')[1];
                        const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
                        setSort(`CONT_TX_TIPO,${newOrder}`);
                    }}                >
                    Tipo
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div >{row.getValue("contatoTipo")}</div>,
    },
    {
        accessorKey: "contatoUrl",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        const currentOrder = sort.split(',')[1];
                        const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
                        setSort(`CONT_TX_URL,${newOrder}`);
                    }}                >
                    Url
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div >{row.getValue("contatoUrl")}</div>,
    },
    {
        accessorKey: "privado",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        const currentOrder = sort.split(',')[1];
                        const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
                        setSort(`CONT_BL_PRIVADO,${newOrder}`);
                    }}                >
                    Ativo
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const isActive = Boolean(row.getValue('privado'));
            const contatoRow = row.original
            return (
                <div className="flex items-center justify-center">
                    <Switch defaultChecked={isActive} className="capitalize"
                        onClick={() => {
                            setStateChanged((prevState: boolean) => !prevState),
                                activateContact(contatoRow.contatoId),
                                toast.success(`Habilidade ${isActive ? "Desativada" : "Ativada"} com sucesso!`)
                        }}
                    >{isActive ? "Ativo" : "Inativo"}</Switch>
                </div>
            )
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const usuarioRow = row.original
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
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Editar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Excluir</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export function ContatosTable() {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [sort, setSort] = useState("CONT_CD_ID,asc")
    const [search, setSearch] = useState('');
    const [data, setData] = useState<Contato[]>([])
    const { stateChanged, setStateChanged } = useStateChange();



    async function handleFetchContacts() {
        try {
            const data = await fetchContacts(search, page, size, sort);
            setData(data.content);
            setTotalPages(data.totalPages)
        } catch (error) {
        }
    }

    useEffect(() => {
        handleFetchContacts()
        if (page > totalPages) {
            setPage(totalPages - 1);
        }
    }, [search, page, size, sort, stateChanged])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleFetchContacts();
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
