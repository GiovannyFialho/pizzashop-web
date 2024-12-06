import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getManagerRestaurant } from "@/api/get-manager-restaurant";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { updateProfile } from "../api/update-profile";

const storeProfileSchema = z.object({
  name: z.string().min(1, "Campo obrigatório"),
  description: z.string(),
});

type StoreProfileSchema = z.infer<typeof storeProfileSchema>;

export function StoreProfileDialog() {
  const { data: managerRestaurant } = useQuery({
    queryKey: ["manager-resturant"],
    queryFn: getManagerRestaurant,
    staleTime: Infinity,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managerRestaurant?.name ?? "",
      description: managerRestaurant?.description ?? "",
    },
  });

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
  });

  async function handleUpdateProfile(data: StoreProfileSchema) {
    try {
      await updateProfileFn({ name: data.name, description: data.description });

      toast.success("Perfil atualizado com sucesso!");
    } catch {
      toast.error("Falha ao atualizar o perfil, tente novamente");
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu cliente
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-5 py-5">
          <div className="flex flex-col items-start gap-3">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" {...register("name")} />

            {errors.name && (
              <span className="text-sm text-rose-500 dark:text-rose-400">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="flex flex-col items-start gap-3">
            <Label htmlFor="description">Descrição</Label>
            <Textarea id="description" {...register("description")} />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              Cancelar
            </Button>
          </DialogClose>

          <Button type="submit" variant="success" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
