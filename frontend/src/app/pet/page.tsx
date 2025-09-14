"use client";

import { useState } from "react";
import { Pet, CreatePetDTO, UpdatePetDTO } from "@/types";
import { usePets } from "@/hooks/usePets";
import { PetTable } from "@/components/pet/PetTable";
import { PetForm } from "@/components/pet/PetForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, AlertCircle } from "lucide-react";

export default function PetPage() {
  const { pets, loading, error, createPet, updatePet, deletePet } = usePets();
  const [formOpen, setFormOpen] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const handleCreatePet = () => {
    setEditingPet(null);
    setFormOpen(true);
  };

  const handleEditPet = (pet: Pet) => {
    setEditingPet(pet);
    setFormOpen(true);
  };

  const handleFormSubmit = async (
    data: CreatePetDTO | UpdatePetDTO
  ): Promise<boolean> => {
    setFormLoading(true);

    try {
      let success: boolean;

      if (editingPet) {
        // Atualizar pet existente
        success = await updatePet(editingPet.id, data as UpdatePetDTO);
      } else {
        // Criar novo pet
        success = await createPet(data as CreatePetDTO);
      }

      return success;
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeletePet = async (id: string) => {
    await deletePet(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pets</h1>
          <p className="text-muted-foreground">
            Gerencie os pets cadastrados no sistema
          </p>
        </div>
        <Button onClick={handleCreatePet} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Pet
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
          <CardTitle>Lista de Pets</CardTitle>
          <CardDescription>
            {pets.length > 0
              ? `${pets.length} pet${pets.length !== 1 ? "s" : ""} cadastrado${
                  pets.length !== 1 ? "s" : ""
                }`
              : "Nenhum pet cadastrado"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PetTable
            pets={pets}
            loading={loading}
            onEdit={handleEditPet}
            onDelete={handleDeletePet}
          />
        </CardContent>
      </Card>

      <PetForm
        pet={editingPet}
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleFormSubmit}
        loading={formLoading}
      />
    </div>
  );
}
