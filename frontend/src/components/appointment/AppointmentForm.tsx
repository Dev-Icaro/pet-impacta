"use client";

import { useState, useEffect } from "react";
import {
  Appointment,
  CreateAppointmentDTO,
  UpdateAppointmentDTO,
  Pet,
  Service,
  Veterinarian,
} from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getBaseUrl } from "@/lib/utils";

interface AppointmentFormProps {
  appointment?: Appointment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (
    data: CreateAppointmentDTO | UpdateAppointmentDTO
  ) => Promise<boolean>;
  loading?: boolean;
}

export function AppointmentForm({
  appointment,
  open,
  onOpenChange,
  onSubmit,
  loading = false,
}: AppointmentFormProps) {
  const [formData, setFormData] = useState<CreateAppointmentDTO>({
    petId: "",
    serviceId: "",
    veterinarianId: "",
    appointmentDate: "",
    notes: "",
  });

  const [pets, setPets] = useState<Pet[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [veterinarians, setVeterinarians] = useState<Veterinarian[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Carregar dados dos selects
  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true);
      try {
        const [petsRes, servicesRes, veterinariansRes] = await Promise.all([
          fetch(`${getBaseUrl()}/api/pet`),
          fetch(`${getBaseUrl()}/api/service`),
          fetch(`${getBaseUrl()}/api/veterinarian`),
        ]);

        const petsData = await petsRes.json();
        const servicesData = await servicesRes.json();
        const veterinariansData = await veterinariansRes.json();

        if (petsData.success && petsData.data) setPets(petsData.data);
        if (servicesData.success && servicesData.data)
          setServices(servicesData.data);
        if (veterinariansData.success && veterinariansData.data)
          setVeterinarians(veterinariansData.data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoadingData(false);
      }
    };

    if (open) {
      fetchData();
    }
  }, [open]);

  useEffect(() => {
    if (appointment) {
      // Converter data para formato datetime-local
      const date = new Date(appointment.appointmentDate);
      const localDate = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      )
        .toISOString()
        .slice(0, 16);

      setFormData({
        petId: appointment.petId,
        serviceId: appointment.serviceId,
        veterinarianId: appointment.veterinarianId,
        appointmentDate: localDate,
        notes: appointment.notes || "",
      });
    } else {
      setFormData({
        petId: "",
        serviceId: "",
        veterinarianId: "",
        appointmentDate: "",
        notes: "",
      });
    }
    setErrors({});
  }, [appointment, open]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.petId) {
      newErrors.petId = "Selecione um pet";
    }

    if (!formData.serviceId) {
      newErrors.serviceId = "Selecione um serviço";
    }

    if (!formData.veterinarianId) {
      newErrors.veterinarianId = "Selecione um veterinário";
    }

    if (!formData.appointmentDate) {
      newErrors.appointmentDate = "Data e hora são obrigatórias";
    } else {
      const selectedDate = new Date(formData.appointmentDate);
      const now = new Date();
      if (selectedDate < now) {
        newErrors.appointmentDate = "A data deve ser futura";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Converter data local para ISO string
    const submitData = {
      ...formData,
      appointmentDate: new Date(formData.appointmentDate).toISOString(),
    };

    const success = await onSubmit(submitData);
    if (success) {
      onOpenChange(false);
    }
  };

  const handleInputChange = (
    field: keyof CreateAppointmentDTO,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {appointment ? "Editar Agendamento" : "Novo Agendamento"}
          </DialogTitle>
          <DialogDescription>
            {appointment
              ? "Atualize as informações do agendamento."
              : "Crie um novo agendamento no sistema."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="petId">Pet *</Label>
            <Select
              value={formData.petId}
              onValueChange={(value) => handleInputChange("petId", value)}
              disabled={loadingData}
            >
              <SelectTrigger className={errors.petId ? "border-red-500" : ""}>
                <SelectValue placeholder="Selecione um pet" />
              </SelectTrigger>
              <SelectContent>
                {pets.map((pet) => (
                  <SelectItem key={pet.id} value={pet.id}>
                    {pet.name} - {pet.species}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.petId && (
              <p className="text-sm text-red-500">{errors.petId}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="serviceId">Serviço *</Label>
            <Select
              value={formData.serviceId}
              onValueChange={(value) => handleInputChange("serviceId", value)}
              disabled={loadingData}
            >
              <SelectTrigger
                className={errors.serviceId ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Selecione um serviço" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.name} - R$ {Number(service.price).toFixed(2)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.serviceId && (
              <p className="text-sm text-red-500">{errors.serviceId}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="veterinarianId">Veterinário *</Label>
            <Select
              value={formData.veterinarianId}
              onValueChange={(value) =>
                handleInputChange("veterinarianId", value)
              }
              disabled={loadingData}
            >
              <SelectTrigger
                className={errors.veterinarianId ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Selecione um veterinário" />
              </SelectTrigger>
              <SelectContent>
                {veterinarians.map((vet) => (
                  <SelectItem key={vet.id} value={vet.id}>
                    {vet.name} - CRMV {vet.licenseNumber}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.veterinarianId && (
              <p className="text-sm text-red-500">{errors.veterinarianId}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="appointmentDate">Data e Hora *</Label>
            <Input
              id="appointmentDate"
              type="datetime-local"
              value={formData.appointmentDate}
              onChange={(e) =>
                handleInputChange("appointmentDate", e.target.value)
              }
              className={errors.appointmentDate ? "border-red-500" : ""}
            />
            {errors.appointmentDate && (
              <p className="text-sm text-red-500">{errors.appointmentDate}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Ex: Primeira consulta, vacinação..."
              className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading || loadingData}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading || loadingData}>
              {loading ? "Salvando..." : appointment ? "Atualizar" : "Criar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
