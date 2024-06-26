
import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    login: yup
        .string()
        .required('Digite o email'),
    senha: yup
        .string()
        .required('Digite a senha'),
    rememberMe: yup
        .boolean()
});

export const registerSchema = yup.object().shape({
    nome: yup
        .string()
        .required('Digite seu Nome Completo'),
    login: yup
        .string()
        .required('Digite o email'),
    senha: yup
        .string()
        .required('Digite a senha'),
    confirmarSenha: yup
        .string()
        .required('Digite a senha novamente')
});

export const OtpFormSchema = yup.object().shape({
    pin: yup.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
})

const PHONE_NO_REGEX = /^\(\d{2}\) \d{5}-\d{4}$/;
export const updateUserSchema = yup.object().shape({
    nome: yup.string().required('Nome é obrigatório'),
    nomeSocial: yup.string(),
    telefone: yup.string().notRequired().matches(PHONE_NO_REGEX, 'Favor seguir o formato "(11) 99999-9999"'),
    dataNascimento: yup.string().required('Data de Nascimento é obrigatória'),
});

const SUPPORTED_FORMATS: { [key: string]: string[] } = { image: ['jpg', 'png', 'jpeg'] };
const MAX_FILE_SIZE = 1048576; //3mb
const fileSelected = (value: FileList) => value && value.length > 0;
export const uploadPictureSchema = yup.object().shape({
    arquivo: yup.mixed<FileList>().required('Favor Adicionar uma foto')
        .test("is-null", "Favor adicionar um arquivo", fileSelected)
        .test("is-valid-type", "Formato não suportado",
            value => fileSelected(value) && SUPPORTED_FORMATS.image.includes(value[0].type.split('/')[1]))
        .test("is-valid-size", "A imagem pode ter no máximo 1MB",
            value => fileSelected(value) && value[0].size <= MAX_FILE_SIZE),
    descricao: yup.string().required('Descrição é obrigatória'),
});

export const contactSchema = yup.object().shape({
    contatoNome: yup
        .string()
        .required('Digite o nome do contato'),
    contatoUrl: yup
        .string()
        .required('Digite a url'),
    contatoTipo: yup
        .string()
        .required('Escolha um tipo'),
    privado: yup
        .boolean()
        .required()
});

export const cartaoSchema = yup.object().shape({
    cartaoUsuario: yup
        .string()
        .required('Digite o nome do usuário'),
    cartaoNome: yup
        .string()
        .required('Digite o nome do cartão'),
    cartaoUrl: yup
        .string()
        .required('Digite a URL do cartão'),
    cartaoBackground: yup
        .string()
        .matches(/\.(jpeg|jpg|png)$/, 'Precisa ser um formato de imagem válido (jpeg, jpg, png)')
        .required('escolha um background para o seu cartão'),
    ativo: yup
        .boolean()
        .required()
});

export const editCartaoSchema = yup.object().shape({
    cartaoUsuario: yup
        .string()
        .required('Digite o nome do usuário'),
    cartaoNome: yup
        .string()
        .required('Digite o nome do cartão'),
    cartaoUrl: yup
        .string()
        .required('Digite a URL do cartão'),
});

export const userSkillSchema = yup.object().shape({
    skillNome: yup
        .string()
        .required('Escolha uma skill'),
    usuarioSkillDominio: yup
        .string()
        .required('Defina o domínio sobre a skill'),
    usuarioSkillVersao: yup
        .string(),
    ativo: yup
        .boolean()
        .required()
});

export const skillSchema = yup.object().shape({
    skillNome: yup
        .string()
        .required('Digite o nome da Habilidade'),
    skillDescricao: yup
        .string(),
    skillCategoria: yup
        .string()
        .required('Escolha uma categoria válida'),
    skillDificuldade: yup
        .string()
        .required('Escolha a dificuldade'),
    skillUrl: yup
        .string(),
    ativo: yup
        .boolean()
        .required()
});
