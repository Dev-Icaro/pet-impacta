"use client";

import { useState } from "react";
import { Appointment, CreateAppointmentDTO, UpdateAppointmentDTO } from "@/types";
import { useAppointment } from "@/hooks/useAppointment";
import { AppointmentTable } from "@/components/appointment/AppointmentTable";
import { AppointmentForm } from "@/components/appointment/AppointmentForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, AlertCircle, Calendar } from "lucide-react";

export default function AppointmentPage() {
  const {
    appointments,
    loading,
    error,
    createAppointment,
    updateAppointment,
    deleteAppointment,
  } = useAppointment();
  const [formOpen, setFormOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const handleCreateAppointment = () => {
    setEditingAppointment(null);
    setFormOpen(true);
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setFormOpen(true);
  };

  const handleFormSubmit = async (
    data: CreateAppointmentDTO | UpdateAppointmentDTO
  ): Promise<boolean> => {
    setFormLoading(true);

    try {
      let success: boolean;

      if (editingAppointment) {
        // Atualizar agendamento existente
        success = await updateAppointment(
          editingAppointment.id,
          data as UpdateAppointmentDTO
        );
      } else {
        // Criar novo agendamento
        success = await createAppointment(data as CreateAppointmentDTO);
      }

      return success;
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteAppointment = async (id: string) => {
    await deleteAppointment(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Calendar className="h-8 w-8" />
            Agendamentos
          </h1>
          <p className="text-muted-foreground">
            Gerencie os agendamentos de consultas e serviços
          </p>
        </div>
        <Button
          onClick={handleCreateAppointment}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Novo Agendamento
        </Button>
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-700">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Lista de Agendamentos</CardTitle>
          <CardDescription>
            {appointments.length > 0
              ? `${appointments.length} agendamento${
                  appointments.length !== 1 ? "s" : ""
                } cadastrado${appointments.length !== 1 ? "s" : ""}`
              : "Nenhum agendamento cadastrado"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AppointmentTable
            appointments={appointments}
            loading={loading}
            onEdit={handleEditAppointment}
            onDelete={handleDeleteAppointment}
          />
        </CardContent>
      </Card>

      <AppointmentForm
        appointment={editingAppointment}
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleFormSubmit}
        loading={formLoading}
      />
    </div>
  );
}

