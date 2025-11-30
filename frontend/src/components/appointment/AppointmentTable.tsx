"use client";

import { useState } from "react";
import { Appointment } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2, Edit, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AppointmentTableProps {
  appointments: Appointment[];
  loading: boolean;
  onEdit: (appointment: Appointment) => void;
  onDelete: (id: string) => void;
}

export function AppointmentTable({
  appointments,
  loading,
  onEdit,
  onDelete,
}: AppointmentTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState<Appointment | null>(null);

  const handleDeleteClick = (appointment: Appointment) => {
    setAppointmentToDelete(appointment);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (appointmentToDelete) {
      onDelete(appointmentToDelete.id);
      setDeleteDialogOpen(false);
      setAppointmentToDelete(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (price?: number) => {
    if (!price) return "N/A";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const isUpcoming = (dateString: string) => {
    return new Date(dateString) > new Date();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando agendamentos...</p>
        </div>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center p-8">
        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Nenhum agendamento encontrado.</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pet</TableHead>
              <TableHead>Serviço</TableHead>
              <TableHead>Veterinário</TableHead>
              <TableHead>Data/Hora</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Observações</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell className="font-medium">
                  {appointment.petName || "N/A"}
                </TableCell>
                <TableCell>{appointment.serviceName || "N/A"}</TableCell>
                <TableCell>{appointment.veterinarianName || "N/A"}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>{formatDate(appointment.appointmentDate)}</span>
                    {isUpcoming(appointment.appointmentDate) && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Próximo
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-semibold text-green-600">
                  {formatPrice(appointment.servicePrice)}
                </TableCell>
                <TableCell>
                  {appointment.notes ? (
                    <span className="text-sm text-gray-600">
                      {appointment.notes.length > 50
                        ? `${appointment.notes.substring(0, 50)}...`
                        : appointment.notes}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-400 italic">
                      Sem observações
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(appointment)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteClick(appointment)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Dialog de confirmação de exclusão */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o agendamento de{" "}
              <strong>{appointmentToDelete?.petName}</strong> em{" "}
              <strong>
                {appointmentToDelete?.appointmentDate &&
                  formatDate(appointmentToDelete.appointmentDate)}
              </strong>
              ? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

