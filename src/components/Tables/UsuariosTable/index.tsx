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
import { ArrowUpDown, Ban, Check, ChevronDown, CircleCheckBig, CircleMinus, Clock, Edit, Mail, MoreHorizontal, Send, Trash2 } from "lucide-react"

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
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { SearchProfilePagination } from "@/components/Pagination/SearchProfilePagination"
import { activateUser, banUser, blockUser, fetchUsers, inactivateUser } from "@/services/api/api"
import { useStateChange } from "@/context/stateChangeContext"

export type UsuariosTableType = {
    usuarioId: number
    nome: string
    nomeSocial?: string
    email: string
    telefone?: string
    dataNascimento: string
    twoFa: boolean
    usuarioStatus: "ATIVO" | "INATIVO" | "BLOQUEADO" | "BANIDO"
    usuarioTipo: "ADMIN" | "CLIENTE"
    dataCadastro: string
    dataAtualizacao: string
}

export const columns = (setSort: (sort: string) => void, sort: string, setStateChanged: any): ColumnDef<User>[] => [

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
        accessorKey: "usuarioStatus",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        const currentOrder = sort.split(',')[1];
                        const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
                        setSort(`USUA_TX_STATUS,${newOrder}`);
                    }}
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const status = row.getValue("usuarioStatus");
            let badgeColor;
            switch (status) {
                case "ATIVO":
                    badgeColor = "bg-green-600";
                    break;
                case "INATIVO":
                    badgeColor = "bg-yellow-600";
                    break;
                case "BLOQUEADO":
                    badgeColor = "bg-orange-600";
                    break;
                case "BANIDO":
                    badgeColor = "bg-red-600";
                    break;
                default:
                    badgeColor = "bg-blue-600";
            }
            return <Badge className={badgeColor}>{row.getValue("usuarioStatus")}</Badge>
        },
    },
    {
        accessorKey: "usuarioTipo",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        const currentOrder = sort.split(',')[1];
                        const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
                        setSort(`USUA_TX_TIPO,${newOrder}`);
                    }}                >
                    Tipo
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <Badge>{row.getValue("usuarioTipo")}</Badge>
        ),
    },
    {
        accessorKey: "nome",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        const currentOrder = sort.split(',')[1];
                        const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
                        setSort(`USUA_TX_NOME,${newOrder}`);
                    }}
                >
                    Nome
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("nome")}</div>,
    },
    {
        accessorKey: "nomeSocial",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        const currentOrder = sort.split(',')[1];
                        const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
                        setSort(`USUA_TX_NOMESOCIAL,${newOrder}`);
                    }}                >
                    Nome Social
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div >{row.getValue("nomeSocial")}</div>,
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        const currentOrder = sort.split(',')[1];
                        const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
                        setSort(`USUA_TX_EMAIL,${newOrder}`);
                    }}                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div >{row.getValue("email")}</div>,
    },
    {
        accessorKey: "telefone",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        const currentOrder = sort.split(',')[1];
                        const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
                        setSort(`USUA_TX_TELEFONE,${newOrder}`);
                    }}                >
                    Telefone
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div >{row.getValue("telefone")}</div>,
    },
    {
        accessorKey: "dataNascimento",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        const currentOrder = sort.split(',')[1];
                        const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
                        setSort(`USUA_DT_NASCIMENTO,${newOrder}`);
                    }}                >
                    Data Nascimento
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div >{row.getValue("dataNascimento")}</div>,
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
                        setSort(`USUA_DT_CADASTRO,${newOrder}`);
                    }}                >
                    Data Cadastro
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div >{row.getValue("dataCadastro")}</div>,
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
                        setSort(`USUA_DT_ATUALIZACAO,${newOrder}`);
                    }}                >
                    Data Atualização
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div >{row.getValue("dataAtualizacao")}</div>,
    },
    {
        accessorKey: "twoFa",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        const currentOrder = sort.split(',')[1];
                        const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
                        setSort(`USUA_BL_TWOFACTOR,${newOrder}`);
                    }}                >
                    2FA
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const isActive = Boolean(row.getValue('twoFa'));
            return (
                <div className="flex items-center justify-center">
                    <Switch defaultChecked={isActive} className="capitalize">{isActive ? "Ativo" : "Inativo"}</Switch>
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
                        <DropdownMenuItem
                            onClick={() => {
                                setStateChanged((prevState: boolean) => !prevState),
                                    activateUser(usuarioRow.usuarioId)
                            }}
                        >
                            <CircleCheckBig className="mr-2 h-4 w-4" />
                            <span>Ativar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                setStateChanged((prevState: boolean) => !prevState),
                                    inactivateUser(usuarioRow.usuarioId)
                            }}
                        >
                            <CircleMinus className="mr-2 h-4 w-4" />
                            <span>Inativar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                setStateChanged((prevState: boolean) => !prevState),
                                    blockUser(usuarioRow.usuarioId)
                            }}
                        >
                            <Clock className="mr-2 h-4 w-4" />
                            <span>Bloquear</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                setStateChanged((prevState: boolean) => !prevState),
                                    banUser(usuarioRow.usuarioId)
                            }}
                        >
                            <Ban className="mr-2 h-4 w-4" />
                            <span>Banir</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Send className="mr-2 h-4 w-4" />
                            <span>Enviar Mensagem</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            <span>Enviar Email</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export function UsuariosTable() {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [sort, setSort] = useState("USUA_CD_ID,asc")
    const [search, setSearch] = useState('');
    const [data, setData] = useState<User[]>([])
    const { stateChanged, setStateChanged } = useStateChange();



    async function handleFetchUsers() {
        try {
            const data = await fetchUsers(search, page, size, sort);
            setData(data.content);
            setTotalPages(data.totalPages)
        } catch (error) {
        }
    }

    useEffect(() => {
        handleFetchUsers()
        if (page > totalPages) {
            setPage(totalPages - 1);
        }
    }, [search, page, size, sort, stateChanged])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleFetchUsers();
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
                    <Button className="px-4 lg:px-12">
                        <p className="text-xl">Adicionar</p>
                    </Button>
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
