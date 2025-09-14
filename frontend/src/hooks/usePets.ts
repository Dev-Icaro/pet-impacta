import { useState, useEffect } from "react";
import {
  Pet,
  CreatePetDTO,
  UpdatePetDTO,
  PetListApiResponse,
  PetApiResponse,
} from "@/types";
import { getBaseUrl } from "@/lib/utils";

export const usePets = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPets = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${getBaseUrl()}/api/pet`);
      const data: PetListApiResponse = await response.json();

      if (data.success && data.data) {
        setPets(data.data);
      } else {
        setError(data.message || "Erro ao carregar pets");
      }
    } catch (err) {
      setError("Erro de conexão com o servidor");
      console.error("Erro ao buscar pets:", err);
    } finally {
      setLoading(false);
    }
  };

  const createPet = async (petData: CreatePetDTO): Promise<boolean> => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/pet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(petData),
      });

      const data: PetApiResponse = await response.json();

      if (data.success) {
        await fetchPets(); // Recarregar lista
        return true;
      } else {
        setError(data.message || "Erro ao criar pet");
        return false;
      }
    } catch (err) {
      setError("Erro de conexão com o servidor");
      console.error("Erro ao criar pet:", err);
      return false;
    }
  };

  const updatePet = async (
    id: string,
    petData: UpdatePetDTO
  ): Promise<boolean> => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/pet/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(petData),
      });

      const data: PetApiResponse = await response.json();

      if (data.success) {
        await fetchPets(); // Recarregar lista
        return true;
      } else {
        setError(data.message || "Erro ao atualizar pet");
        return false;
      }
    } catch (err) {
      setError("Erro de conexão com o servidor");
      console.error("Erro ao atualizar pet:", err);
      return false;
    }
  };

  const deletePet = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/pet/${id}`, {
        method: "DELETE",
      });

      const data: PetApiResponse = await response.json();

      if (data.success) {
        await fetchPets(); // Recarregar lista
        return true;
      } else {
        setError(data.message || "Erro ao deletar pet");
        return false;
      }
    } catch (err) {
      setError("Erro de conexão com o servidor");
      console.error("Erro ao deletar pet:", err);
      return false;
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return {
    pets,
    loading,
    error,
    fetchPets,
    createPet,
    updatePet,
    deletePet,
  };
};
