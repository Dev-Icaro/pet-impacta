"use client";

import { useState } from "react";
import { Veterinarian } from "@/types";
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
import { Trash2, Edit } from "lucide-react";

interface VeterinarianTableProps {
  veterinarians: Veterinarian[];
  loading: boolean;
  onEdit: (veterinarian: Veterinarian) => void;
  onDelete: (id: string) => void;
}

export function VeterinarianTable({
  veterinarians,
  loading,
  onEdit,
  onDelete,
}: VeterinarianTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [veterinarianToDelete, setVeterinarianToDelete] =
    useState<Veterinarian | null>(null);

  const handleDeleteClick = (veterinarian: Veterinarian) => {
    setVeterinarianToDelete(veterinarian);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (veterinarianToDelete) {
      onDelete(veterinarianToDelete.id);
      setDeleteDialogOpen(false);
      setVeterinarianToDelete(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando veterinários...</p>
        </div>
      </div>
    );
  }

  if (veterinarians.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">Nenhum veterinário encontrado.</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Número da Licença</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {veterinarians.map((veterinarian) => (
              <TableRow key={veterinarian.id}>
                <TableCell className="font-medium">
                  {veterinarian.name}
                </TableCell>
                <TableCell>{veterinarian.licenseNumber}</TableCell>
                <TableCell>{veterinarian.phone || "-"}</TableCell>
                <TableCell>{veterinarian.email || "-"}</TableCell>
                <TableCell>{formatDate(veterinarian.createdAt)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(veterinarian)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteClick(veterinarian)}
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
              Tem certeza que deseja excluir o veterinário{" "}
              <strong>{veterinarianToDelete?.name}</strong>? Esta ação não pode
              ser desfeita.
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
