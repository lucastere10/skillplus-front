import axios from "axios";
import { getSession } from 'next-auth/react';
import { toast } from "sonner";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session) {
    config.headers.Authorization = session.token;
  }
  return config;
});

export const registerUser = async (data: RegisterRequest): Promise<boolean> => {
  try {
    await api.post('/auth/register', {
      nome: data.nome,
      login: data.login,
      senha: data.senha
    });
    toast.success('Usuário registrado com sucesso!');
    return true;
  } catch (error: any) {
    console.error(error);
    toast.error(error.response.data.userMessage);
    return false;
  }
};

export const registerSocial = async (data: RegisterSocialRequest): Promise<boolean> => {
  try {
    const response = await api.post('/auth/login-social', {
      nome: data.nome,
      login: data.login,
      senha: data.senha
    });
    return response.data.token;
  } catch (error: any) {
    console.error(error);
    return false;
  }
};

export const fetchUser = async () => {
  try {
    const response = await api.get(`/auth/user`);
    return response.data;
  } catch (err: any) {
    if (err.response) {
      console.error('Error fetching data:', err.response.data);
      return { data: null, error: err.response.data };
    } else {
      console.error('Error:', err.message);
      return { data: null, error: err.message };
    }
  }
}

export const fetchUserById = async (id: string) => {
  try {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
  } catch (err: any) {
    if (err.response) {
      console.error('Error fetching data:', err.response.data);
      return { data: null, error: err.response.data };
    } else {
      console.error('Error:', err.message);
      return { data: null, error: err.message };
    }
  }
}

export const fetchUserPicture = async (email: string) => {
  try {
    const response = await api.get(`/usuarios/foto/${email}`, { responseType: 'arraybuffer' });
    const blob = new Blob([response.data], { type: 'image/png' });
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  } catch (err: any) {
    if (err.response) {
      console.error('Error fetching data:', err.response.data);
      const placeholder = `https://www.pngitem.com/pimgs/m/421-4212617_person-placeholder-image-transparent-hd-png-download.png`
      return placeholder;
    } else {
      console.error('Error:', err.message);
      return { data: null, error: err.message };
    }
  }
}

export const fetchSecret = async () => {
  try {
    const response = await api.get(`/auth/totp/setup`);
    return response.data;
  } catch (err: any) {
    if (err.response) {
      console.error('Error fetching data:', err.response.data);
      return { data: null, error: err.response.data };
    } else {
      console.error('Error:', err.message);
      return { data: null, error: err.message };
    }
  }
}

export const fetchUserVerify = async () => {
  try {
    const response = await api.get(`/auth/verify`);
    return response.data;
  } catch (err: any) {
    if (err.response) {
      console.error('Error fetching data:', err.response.data);
      return { data: null, error: err.response.data };
    } else {
      console.error('Error:', err.message);
      return { data: null, error: err.message };
    }
  }
}

export const verifySecret = async (code: string) => {
  try {
    const response = await api.post(`/auth/totp/validar?code=${code}`);
    console.log("Verify :", response.data)
    return response.data;
  } catch (err: any) {
    if (err.response) {
      console.error('Error fetching data:', err.response.data);
      return { data: null, error: err.response.data };
    } else {
      console.error('Error:', err.message);
      return { data: null, error: err.message };
    }
  }
}

export const checkEmail = async (email: string) => {
  try {
    const response = await api.get(`/usuarios/verificar/${email}`);
    return { data: response.data, error: null };
  } catch (err: any) {
    if (err.response) {
      console.error('Error fetching data:', err.response.data);
      return { data: null, error: err.response.data };
    } else {
      console.error('Error:', err.message);
      return { data: null, error: err.message };
    }
  }
};

export const uploadPicture = async (data: any): Promise<boolean> => {
  try {
    const formData = new FormData();
    formData.append('arquivo', data.arquivo[0]); // Append the file object
    formData.append('descricao', data.descricao);

    await api.put('/usuarios/foto/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return true;
  } catch (error: any) {
    console.error(error.response);
    alert(error.response.data.detail);
    return false;
  }
};

export const updateUser = async (data: any): Promise<boolean> => {
  try {
    await api.put('/usuarios', {
      nome: data.nome,
      nomeSocial: data.nomeSocial,
      dataNascimento: data.dataNascimento,
      telefone: data.telefone
    })
    return true;
  } catch (error: any) {
    console.error(error);
    alert(error.response.data.userMessage);
    return false;
  }
}

export const fetchUsers = async (search: string, page: number, size: number, sort: string) => {
  try {
    const response = await api.get(`/usuarios`, {
      params: {
        search,
        page,
        size,
        sort
      }
    });
    return response.data;
  } catch (err: any) {
    if (err.response) {
      console.error('Error fetching data:', err.response.data);
      return { data: null, error: err.response.data };
    } else {
      console.error('Error:', err.message);
      return { data: null, error: err.message };
    }
  }
}

export const enableTwoFa = async () => {
  try {
    const response = await api.put(`/usuarios/update/2fa`);
    return response.data;
  } catch (err: any) {
    if (err.response) {
      console.error('Error fetching data:', err.response.data);
      return { data: null, error: err.response.data };
    } else {
      console.error('Error:', err.message);
      return { data: null, error: err.message };
    }
  }
}

export const activateUser = async (id: number) => {
  try {
    await api.put(`/usuarios/status/ativar/${id}`);
    toast.info('Usuário ativado com sucesso')
    return { data: 'Usuário ativado com sucesso', error: null };
  } catch (err: any) {
    if (err.response) {
      console.error('Error fetching data:', err.response.data);
      return { data: null, error: err.response.data };
    } else {
      console.error('Error:', err.message);
      return { data: null, error: err.message };
    }
  }
}

export const inactivateUser = async (id: number) => {
  try {
    await api.put(`/usuarios/status/desativar/${id}`);
    toast.info('Usuário inativado com sucesso')
    return { data: 'Usuário inativado com sucesso', error: null };
  } catch (err: any) {
    if (err.response) {
      console.error('Error fetching data:', err.response.data);
      return { data: null, error: err.response.data };
    } else {
      console.error('Error:', err.message);
      return { data: null, error: err.message };
    }
  }
}

export const blockUser = async (id: number) => {
  try {
    await api.put(`/usuarios/status/bloquear/${id}`);
    toast.info('Usuário bloqueado com sucesso')
    return { data: 'Usuário bloqueado com sucesso', error: null };
  } catch (err: any) {
    if (err.response) {
      console.error('Error fetching data:', err.response.data);
      return { data: null, error: err.response.data };
    } else {
      console.error('Error:', err.message);
      return { data: null, error: err.message };
    }
  }
}

export const banUser = async (id: number) => {
  try {
    await api.put(`/usuarios/status/banir/${id}`);
    toast.info('Usuário banido com sucesso')
    return { data: 'Usuário banido com sucesso', error: null };
  } catch (err: any) {
    if (err.response) {
      console.error('Error fetching data:', err.response.data);
      return { data: null, error: err.response.data };
    } else {
      console.error('Error:', err.message);
      return { data: null, error: err.message };
    }
  }
}


export default api;
