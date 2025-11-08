"use client";

import { useState, useEffect } from "react";
import { Service, CreateServiceDTO, UpdateServiceDTO } from "@/types";
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

interface ServiceFormProps {
  service?: Service | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateServiceDTO | UpdateServiceDTO) => Promise<boolean>;
  loading?: boolean;
}

export function ServiceForm({
  service,
  open,
  onOpenChange,
  onSubmit,
  loading = false,
}: ServiceFormProps) {
  const [formData, setFormData] = useState<CreateServiceDTO>({
    name: "",
    description: "",
    price: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name,
        description: service.description || "",
        price: service.price,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        price: 0,
      });
    }
    setErrors({});
  }, [service, open]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome do serviço é obrigatório";
    }

    if (formData.price === undefined || formData.price === null) {
      newErrors.price = "Preço é obrigatório";
    } else if (formData.price < 0) {
      newErrors.price = "Preço não pode ser negativo";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const success = await onSubmit(formData);
    if (success) {
      onOpenChange(false);
    }
  };

  const handleInputChange = (
    field: keyof CreateServiceDTO,
    value: string | number
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
            {service ? "Editar Serviço" : "Novo Serviço"}
          </DialogTitle>
          <DialogDescription>
            {service
              ? "Atualize as informações do serviço."
              : "Adicione um novo serviço ao sistema."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Serviço *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Ex: Consulta Veterinária"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Ex: Consulta completa com exame físico e orientações"
              className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Preço (R$) *</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) =>
                handleInputChange("price", parseFloat(e.target.value) || 0)
              }
              placeholder="Ex: 150.00"
              className={errors.price ? "border-red-500" : ""}
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price}</p>
            )}
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
              {loading ? "Salvando..." : service ? "Atualizar" : "Criar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
