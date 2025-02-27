// hooks/usePokemonDetails.ts
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonDetails } from "@/lib/api/pokemonService";
import { PokemonDetails } from "@/types/api/pokemon";

export const usePokemonDetails = (id: string) => {
  return useQuery<PokemonDetails>({
    queryKey: ["pokemonDetails", id],
    queryFn: () => fetchPokemonDetails(id),
  });
};
