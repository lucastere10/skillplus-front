import { toast } from "sonner";
import api from "./api";

export const registerSkill = async (data: SkillForm) => {
    try {
        await api.post(`/skills`, {
            skillNome: data.skillNome,
            skillDescricao: data.skillDescricao,
            skillCategoria: data.skillCategoria,
            skillDificuldade: data.skillDificuldade,
            skillUrl: data.skillUrl,
            ativo: data.ativo
        });
        return true;
    } catch (error: any) {
        console.error(error);
        return false;
    }
}

export const editSkill = async (id: number, data: SkillForm): Promise<SkillForm> => {
    try {
        const response = await api.put(`/skills/${id}`, {
            skillNome: data.skillNome,
            skillDescricao: data.skillDescricao,
            skillCategoria: data.skillCategoria,
            skillDificuldade: data.skillDificuldade,
            skillUrl: data.skillUrl,
            ativo: data.ativo
        });
        //toast.success("Habilidade atualizada com sucesso!")
        return response.data;
    } catch (error: any) {
        console.error(error);
        alert(error.response.data.userMessage);
        throw error; // re-throw the error so it can be caught and handled by the calling code
    }
}

export const fetchSkills = async (search:string, page:number, size:number, sort:string) => {
    try {
        const response = await api.get(`/skills`, {
            params: {
                search,
                page,
                size,
                sort,
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

export const fetchSkillById = async (skillId: number) => {
    try {
        const response = await api.get(`/skills/${skillId}`);
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

export const fetchSkillsPublic = async () => {
    try {
        const response = await api.get(`/skills/publico?size=50`);
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

export const activateSkill = async (id: number) => {
    try {
        const response = await api.patch(`/skills/ativar/${id}`);
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

export const deleteSkill = async (id: number) => {
    try {
        const response = await api.delete(`/skills/${id}`);

        if (response.status === 204) {
            toast.error('Skill deletada com sucesso')
            return { data: 'Skill deletada com sucesso', error: null };
        }
        return response.data;
    } catch (err: any) {
        if (err.response) {
            toast.warning('Skill já possui usuários atrelados')
            console.error('Error fetching data:', err.response.data);
            return { data: null, error: err.response.data };
        } else {
            toast.warning('Skill não encontrada')
            console.error('Error:', err.message);
            return { data: null, error: err.message };
        }
    }
}
