"use client";

import { useState, useEffect } from "react";
import {
  Veterinarian,
  CreateVeterinarianDTO,
  UpdateVeterinarianDTO,
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

interface VeterinarianFormProps {
  veterinarian?: Veterinarian | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (
    data: CreateVeterinarianDTO | UpdateVeterinarianDTO
  ) => Promise<boolean>;
  loading?: boolean;
}

export function VeterinarianForm({
  veterinarian,
  open,
  onOpenChange,
  onSubmit,
  loading = false,
}: VeterinarianFormProps) {
  const [formData, setFormData] = useState<CreateVeterinarianDTO>({
    name: "",
    licenseNumber: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (veterinarian) {
      setFormData({
        name: veterinarian.name,
        licenseNumber: veterinarian.licenseNumber,
        phone: veterinarian.phone || "",
        email: veterinarian.email || "",
      });
    } else {
      setFormData({
        name: "",
        licenseNumber: "",
        phone: "",
        email: "",
      });
    }
    setErrors({});
  }, [veterinarian, open]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!formData.licenseNumber.trim()) {
      newErrors.licenseNumber = "Número da licença é obrigatório";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Filtrar campos vazios para update
    const submitData = veterinarian
      ? Object.fromEntries(
          Object.entries(formData).filter(([, value]) => value !== "")
        )
      : formData;

    const success = await onSubmit(submitData);
    if (success) {
      onOpenChange(false);
    }
  };

  const handleInputChange = (
    field: keyof CreateVeterinarianDTO,
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
            {veterinarian ? "Editar Veterinário" : "Novo Veterinário"}
          </DialogTitle>
          <DialogDescription>
            {veterinarian
              ? "Atualize as informações do veterinário."
              : "Adicione um novo veterinário ao sistema."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Ex: Dr. João Silva"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="licenseNumber">Número da Licença *</Label>
              <Input
                id="licenseNumber"
                value={formData.licenseNumber}
                onChange={(e) =>
                  handleInputChange("licenseNumber", e.target.value)
                }
                placeholder="Ex: CRMV-12345"
                className={errors.licenseNumber ? "border-red-500" : ""}
              />
              {errors.licenseNumber && (
                <p className="text-sm text-red-500">{errors.licenseNumber}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Ex: (11) 99999-9999"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Ex: joao@vet.com"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Salvando..." : veterinarian ? "Atualizar" : "Criar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
