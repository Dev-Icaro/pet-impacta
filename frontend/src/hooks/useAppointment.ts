import { useState, useEffect } from "react";
import {
  Appointment,
  CreateAppointmentDTO,
  UpdateAppointmentDTO,
  AppointmentListApiResponse,
  AppointmentApiResponse,
} from "@/types";
import { getBaseUrl } from "@/lib/utils";

export const useAppointment = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${getBaseUrl()}/api/appointment`);
      const data: AppointmentListApiResponse = await response.json();

      if (data.success && data.data) {
        setAppointments(data.data);
      } else {
        setError(data.message || "Erro ao carregar agendamentos");
      }
    } catch (err) {
      setError("Erro de conexão com o servidor");
      console.error("Erro ao buscar agendamentos:", err);
    } finally {
      setLoading(false);
    }
  };

  const createAppointment = async (appointmentData: CreateAppointmentDTO): Promise<boolean> => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/appointment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      const data: AppointmentApiResponse = await response.json();

      if (data.success) {
        await fetchAppointments(); // Recarregar lista
        return true;
      } else {
        setError(data.message || "Erro ao criar agendamento");
        return false;
      }
    } catch (err) {
      setError("Erro de conexão com o servidor");
      console.error("Erro ao criar agendamento:", err);
      return false;
    }
  };

  const updateAppointment = async (
    id: string,
    appointmentData: UpdateAppointmentDTO
  ): Promise<boolean> => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/appointment/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      const data: AppointmentApiResponse = await response.json();

      if (data.success) {
        await fetchAppointments(); // Recarregar lista
        return true;
      } else {
        setError(data.message || "Erro ao atualizar agendamento");
        return false;
      }
    } catch (err) {
      setError("Erro de conexão com o servidor");
      console.error("Erro ao atualizar agendamento:", err);
      return false;
    }
  };

  const deleteAppointment = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/appointment/${id}`, {
        method: "DELETE",
      });

      const data: AppointmentApiResponse = await response.json();

      if (data.success) {
        await fetchAppointments(); // Recarregar lista
        return true;
      } else {
        setError(data.message || "Erro ao deletar agendamento");
        return false;
      }
    } catch (err) {
      setError("Erro de conexão com o servidor");
      console.error("Erro ao deletar agendamento:", err);
      return false;
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return {
    appointments,
    loading,
    error,
    fetchAppointments,
    createAppointment,
    updateAppointment,
    deleteAppointment,
  };
};

