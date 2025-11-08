import { useState, useEffect } from "react";
import {
  Service,
  CreateServiceDTO,
  UpdateServiceDTO,
  ServiceListApiResponse,
  ServiceApiResponse,
} from "@/types";
import { getBaseUrl } from "@/lib/utils";

export const useService = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${getBaseUrl()}/api/service`);
      const data: ServiceListApiResponse = await response.json();

      if (data.success && data.data) {
        setServices(data.data);
      } else {
        setError(data.message || "Erro ao carregar serviços");
      }
    } catch (err) {
      setError("Erro de conexão com o servidor");
      console.error("Erro ao buscar serviços:", err);
    } finally {
      setLoading(false);
    }
  };

  const createService = async (
    serviceData: CreateServiceDTO
  ): Promise<boolean> => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/service`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serviceData),
      });

      const data: ServiceApiResponse = await response.json();

      if (data.success) {
        await fetchServices(); // Recarregar lista
        return true;
      } else {
        setError(data.message || "Erro ao criar serviço");
        return false;
      }
    } catch (err) {
      setError("Erro de conexão com o servidor");
      console.error("Erro ao criar serviço:", err);
      return false;
    }
  };

  const updateService = async (
    id: string,
    serviceData: UpdateServiceDTO
  ): Promise<boolean> => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/service/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serviceData),
      });

      const data: ServiceApiResponse = await response.json();

      if (data.success) {
        await fetchServices(); // Recarregar lista
        return true;
      } else {
        setError(data.message || "Erro ao atualizar serviço");
        return false;
      }
    } catch (err) {
      setError("Erro de conexão com o servidor");
      console.error("Erro ao atualizar serviço:", err);
      return false;
    }
  };

  const deleteService = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/service/${id}`, {
        method: "DELETE",
      });

      const data: ServiceApiResponse = await response.json();

      if (data.success) {
        await fetchServices(); // Recarregar lista
        return true;
      } else {
        setError(data.message || "Erro ao deletar serviço");
        return false;
      }
    } catch (err) {
      setError("Erro de conexão com o servidor");
      console.error("Erro ao deletar serviço:", err);
      return false;
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return {
    services,
    loading,
    error,
    fetchServices,
    createService,
    updateService,
    deleteService,
  };
};
