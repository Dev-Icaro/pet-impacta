"use client";

import { useState } from "react";
import { Service, CreateServiceDTO, UpdateServiceDTO } from "@/types";
import { useService } from "@/hooks/useService";
import { ServiceTable } from "@/components/service/ServiceTable";
import { ServiceForm } from "@/components/service/ServiceForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, AlertCircle } from "lucide-react";

export default function ServicePage() {
  const {
    services,
    loading,
    error,
    createService,
    updateService,
    deleteService,
  } = useService();
  const [formOpen, setFormOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const handleCreateService = () => {
    setEditingService(null);
    setFormOpen(true);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setFormOpen(true);
  };

  const handleFormSubmit = async (
    data: CreateServiceDTO | UpdateServiceDTO
  ): Promise<boolean> => {
    setFormLoading(true);

    try {
      let success: boolean;

      if (editingService) {
        // Atualizar serviço existente
        success = await updateService(
          editingService.id,
          data as UpdateServiceDTO
        );
      } else {
        // Criar novo serviço
        success = await createService(data as CreateServiceDTO);
      }

      return success;
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteService = async (id: string) => {
    await deleteService(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Serviços</h1>
          <p className="text-muted-foreground">
            Gerencie os serviços oferecidos pela clínica
          </p>
        </div>
        <Button
          onClick={handleCreateService}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Novo Serviço
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
          <CardTitle>Lista de Serviços</CardTitle>
          <CardDescription>
            {services.length > 0
              ? `${services.length} serviço${
                  services.length !== 1 ? "s" : ""
                } cadastrado${services.length !== 1 ? "s" : ""}`
              : "Nenhum serviço cadastrado"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ServiceTable
            services={services}
            loading={loading}
            onEdit={handleEditService}
            onDelete={handleDeleteService}
          />
        </CardContent>
      </Card>

      <ServiceForm
        service={editingService}
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleFormSubmit}
        loading={formLoading}
      />
    </div>
  );
}
