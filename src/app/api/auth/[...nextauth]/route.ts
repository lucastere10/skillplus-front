import api, {registerSocial} from "@/services/api/api";
import { generateDummyPassword } from "@/util/dummyPassword";
import NextAuth, { Account, NextAuthOptions, User } from "next-auth"
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

interface ExtendedUser extends User {
    hasPicture?: unknown;
    isProfileComplete?: unknown;
    rememberMe?: boolean;
    token?: string | boolean;
}

const nextAuthOptions: NextAuthOptions = {
    secret: process.env.AUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        GitHubProvider({
            clientId: process.env.AUTH_GITHUB_ID!,
            clientSecret: process.env.AUTH_GITHUB_SECRET!
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                login: { label: 'login', type: 'text' },
                senha: { label: 'senha', type: 'password' },
                rememberMe: { label: 'rememberMe', type: 'checkbox' }
            },

            async authorize(credentials) {
                if (!credentials) {
                    throw new Error('No credentials provided');
                }

                return api
                    .post(`/auth/login`, {
                        login: credentials?.login,
                        senha: credentials?.senha,
                    })
                    .then((response) => {
                        return { ...response.data, rememberMe: credentials.rememberMe };
                    })
                    .catch((error) => {
                        console.log("Mensagem: ", error.response.data.message);
                        throw new Error(error.response.data.message);
                    });
            }

        })
    ],
    pages: {
        signIn: '/login',
        newUser: '/register',
    },
    callbacks: {
        async jwt({ token, user, account }: { token: JWT; user: ExtendedUser, account: Account | null }) {
            // verificar se user existe e adicionar ele em token.user
            // user possui o token de autenticação e o boleano de remember
            account && (token.account = account)
            user && (token.token = user.token)
            user && (token.rememberMe = user.rememberMe)
            user && (token.hasPicture = user.hasPicture)
            user && (token.isProfileComplete = user.isProfileComplete)

            return token;
        }
        ,
        async session({ session, token }: { session: any; token: any }) {

            session.provider = token.account.provider

            if (['google', 'github', 'credentials'].includes(session.provider)) {
                session.token = token.token;
                session.hasPicture = token.hasPicture;
                session.isProfileComplete = token.isProfileComplete;
            }

            if (session.provider === 'credentials') {
                session.rememberMe = token.rememberMe;
                const rememberMe = session.rememberMe === 'true';
                session.expires = new Date(Date.now() + (rememberMe ? 15 : 1 / 24) * 24 * 60 * 60 * 1000).toISOString();
            }

            return session
        },
        async signIn({ user, account }: { user: ExtendedUser, account: Account | null }) {

            if (account?.provider === 'google' || account?.provider === 'github') {
                const password = generateDummyPassword(user.email!)
                const token = await registerSocial({
                    login: user.email!,
                    senha: password,
                    nome: user.name!
                })

                // Add the token to the user object
                user.token = token;
            }

            return true
        },
    }
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }