"use client";

import { useState, useEffect } from "react";
import { Pet, CreatePetDTO, UpdatePetDTO } from "@/types";
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

interface PetFormProps {
  pet?: Pet | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreatePetDTO | UpdatePetDTO) => Promise<boolean>;
  loading?: boolean;
}

export function PetForm({
  pet,
  open,
  onOpenChange,
  onSubmit,
  loading = false,
}: PetFormProps) {
  const [formData, setFormData] = useState<CreatePetDTO>({
    name: "",
    species: "",
    breed: "",
    age: 0,
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (pet) {
      setFormData({
        name: pet.name,
        species: pet.species,
        breed: pet.breed,
        age: pet.age,
        ownerName: pet.ownerName,
        ownerPhone: pet.ownerPhone,
        ownerEmail: pet.ownerEmail,
      });
    } else {
      setFormData({
        name: "",
        species: "",
        breed: "",
        age: 0,
        ownerName: "",
        ownerPhone: "",
        ownerEmail: "",
      });
    }
    setErrors({});
  }, [pet, open]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!formData.species.trim()) {
      newErrors.species = "Espécie é obrigatória";
    }

    if (!formData.ownerName.trim()) {
      newErrors.ownerName = "Nome do proprietário é obrigatório";
    }

    if (formData.age < 0) {
      newErrors.age = "Idade deve ser um valor positivo";
    }

    if (!formData.ownerEmail.trim()) {
      newErrors.ownerEmail = "Email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.ownerEmail)) {
      newErrors.ownerEmail = "Email inválido";
    }

    if (!formData.ownerPhone.trim()) {
      newErrors.ownerPhone = "Telefone é obrigatório";
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
    field: keyof CreatePetDTO,
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
          <DialogTitle>{pet ? "Editar Pet" : "Novo Pet"}</DialogTitle>
          <DialogDescription>
            {pet
              ? "Atualize as informações do pet."
              : "Adicione um novo pet ao sistema."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Pet *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Ex: Rex"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="species">Espécie *</Label>
              <Input
                id="species"
                value={formData.species}
                onChange={(e) => handleInputChange("species", e.target.value)}
                placeholder="Ex: Cachorro"
                className={errors.species ? "border-red-500" : ""}
              />
              {errors.species && (
                <p className="text-sm text-red-500">{errors.species}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="breed">Raça</Label>
              <Input
                id="breed"
                value={formData.breed}
                onChange={(e) => handleInputChange("breed", e.target.value)}
                placeholder="Ex: Golden Retriever"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Idade (anos) *</Label>
              <Input
                id="age"
                type="number"
                min="0"
                value={formData.age}
                onChange={(e) =>
                  handleInputChange("age", parseInt(e.target.value) || 0)
                }
                className={errors.age ? "border-red-500" : ""}
              />
              {errors.age && (
                <p className="text-sm text-red-500">{errors.age}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ownerName">Nome do Proprietário *</Label>
            <Input
              id="ownerName"
              value={formData.ownerName}
              onChange={(e) => handleInputChange("ownerName", e.target.value)}
              placeholder="Ex: João Silva"
              className={errors.ownerName ? "border-red-500" : ""}
            />
            {errors.ownerName && (
              <p className="text-sm text-red-500">{errors.ownerName}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ownerPhone">Telefone *</Label>
              <Input
                id="ownerPhone"
                value={formData.ownerPhone}
                onChange={(e) =>
                  handleInputChange("ownerPhone", e.target.value)
                }
                placeholder="Ex: (11) 99999-9999"
                className={errors.ownerPhone ? "border-red-500" : ""}
              />
              {errors.ownerPhone && (
                <p className="text-sm text-red-500">{errors.ownerPhone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="ownerEmail">Email *</Label>
              <Input
                id="ownerEmail"
                type="email"
                value={formData.ownerEmail}
                onChange={(e) =>
                  handleInputChange("ownerEmail", e.target.value)
                }
                placeholder="Ex: joao@email.com"
                className={errors.ownerEmail ? "border-red-500" : ""}
              />
              {errors.ownerEmail && (
                <p className="text-sm text-red-500">{errors.ownerEmail}</p>
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
              {loading ? "Salvando..." : pet ? "Atualizar" : "Criar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
