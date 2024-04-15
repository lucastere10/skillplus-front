import NextAuth from "next-auth";

declare module 'next-auth' {
    interface Session {
        rememberMe?: string;
        provider?: string;
        password?:string;
        token: string;
        usuario: {
            usuario_id: number,
            nome: string,
            email: string,
            usuario_tipo: string,
            data_cadastro: string,
        }
    }
}