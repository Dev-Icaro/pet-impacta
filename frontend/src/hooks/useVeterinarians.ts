import { useState, useEffect } from "react";
import {
  Veterinarian,
  CreateVeterinarianDTO,
  UpdateVeterinarianDTO,
  VeterinarianListApiResponse,
  VeterinarianApiResponse,
} from "@/types";
import { getBaseUrl } from "@/lib/utils";

export const useVeterinarians = () => {
  const [veterinarians, setVeterinarians] = useState<Veterinarian[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVeterinarians = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${getBaseUrl()}/api/veterinarian`);
      const data: VeterinarianListApiResponse = await response.json();

      if (data.success && data.data) {
        setVeterinarians(data.data);
      } else {
        setError(data.message || "Erro ao carregar veterinários");
      }
    } catch (err) {
      setError("Erro de conexão com o servidor");
      console.error("Erro ao buscar veterinários:", err);
    } finally {
      setLoading(false);
    }
  };

  const createVeterinarian = async (
    veterinarianData: CreateVeterinarianDTO
  ): Promise<boolean> => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/veterinarian`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(veterinarianData),
      });

      const data: VeterinarianApiResponse = await response.json();

      if (data.success) {
        await fetchVeterinarians(); // Recarregar lista
        return true;
      } else {
        setError(data.message || "Erro ao criar veterinário");
        return false;
      }
    } catch (err) {
      setError("Erro de conexão com o servidor");
      console.error("Erro ao criar veterinário:", err);
      return false;
    }
  };

  const updateVeterinarian = async (
    id: string,
    veterinarianData: UpdateVeterinarianDTO
  ): Promise<boolean> => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/veterinarian/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(veterinarianData),
      });

      const data: VeterinarianApiResponse = await response.json();

      if (data.success) {
        await fetchVeterinarians(); // Recarregar lista
        return true;
      } else {
        setError(data.message || "Erro ao atualizar veterinário");
        return false;
      }
    } catch (err) {
      setError("Erro de conexão com o servidor");
      console.error("Erro ao atualizar veterinário:", err);
      return false;
    }
  };

  const deleteVeterinarian = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/veterinarian/${id}`, {
        method: "DELETE",
      });

      const data: VeterinarianApiResponse = await response.json();

      if (data.success) {
        await fetchVeterinarians(); // Recarregar lista
        return true;
      } else {
        setError(data.message || "Erro ao deletar veterinário");
        return false;
      }
    } catch (err) {
      setError("Erro de conexão com o servidor");
      console.error("Erro ao deletar veterinário:", err);
      return false;
    }
  };

  useEffect(() => {
    fetchVeterinarians();
  }, []);

  return {
    veterinarians,
    loading,
    error,
    fetchVeterinarians,
    createVeterinarian,
    updateVeterinarian,
    deleteVeterinarian,
  };
};
