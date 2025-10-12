"use client";

import { useState } from "react";
import {
  Veterinarian,
  CreateVeterinarianDTO,
  UpdateVeterinarianDTO,
} from "@/types";
import { useVeterinarians } from "@/hooks/useVeterinarians";
import { VeterinarianTable } from "@/components/veterinarian/VeterinarianTable";
import { VeterinarianForm } from "@/components/veterinarian/VeterinarianForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, AlertCircle } from "lucide-react";

export default function VeterinarianPage() {
  const {
    veterinarians,
    loading,
    error,
    createVeterinarian,
    updateVeterinarian,
    deleteVeterinarian,
  } = useVeterinarians();
  const [formOpen, setFormOpen] = useState(false);
  const [editingVeterinarian, setEditingVeterinarian] =
    useState<Veterinarian | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const handleCreateVeterinarian = () => {
    setEditingVeterinarian(null);
    setFormOpen(true);
  };

  const handleEditVeterinarian = (veterinarian: Veterinarian) => {
    setEditingVeterinarian(veterinarian);
    setFormOpen(true);
  };

  const handleFormSubmit = async (
    data: CreateVeterinarianDTO | UpdateVeterinarianDTO
  ): Promise<boolean> => {
    setFormLoading(true);

    try {
      let success: boolean;

      if (editingVeterinarian) {
        // Atualizar veterinário existente
        success = await updateVeterinarian(
          editingVeterinarian.id,
          data as UpdateVeterinarianDTO
        );
      } else {
        // Criar novo veterinário
        success = await createVeterinarian(data as CreateVeterinarianDTO);
      }

      return success;
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteVeterinarian = async (id: string) => {
    await deleteVeterinarian(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Veterinários</h1>
          <p className="text-muted-foreground">
            Gerencie os veterinários cadastrados no sistema
          </p>
        </div>
        <Button
          onClick={handleCreateVeterinarian}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Novo Veterinário
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
          <CardTitle>Lista de Veterinários</CardTitle>
          <CardDescription>
            {veterinarians.length > 0
              ? `${veterinarians.length} veterinário${
                  veterinarians.length !== 1 ? "s" : ""
                } cadastrado${veterinarians.length !== 1 ? "s" : ""}`
              : "Nenhum veterinário cadastrado"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VeterinarianTable
            veterinarians={veterinarians}
            loading={loading}
            onEdit={handleEditVeterinarian}
            onDelete={handleDeleteVeterinarian}
          />
        </CardContent>
      </Card>

      <VeterinarianForm
        veterinarian={editingVeterinarian}
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleFormSubmit}
        loading={formLoading}
      />
    </div>
  );
}
