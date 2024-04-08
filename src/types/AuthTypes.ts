interface LoginResponse {
    token: string;
}

interface LoginRequest {
    login: string;
    senha: string;
    rememberMe?: boolean;
};

interface RegisterRequest {
    nome: string;
    login: string;
    senha: string;
    confirmarSenha: string;
}

interface RegisterSocialRequest {
    nome: string;
    login: string;
    senha: string;
}