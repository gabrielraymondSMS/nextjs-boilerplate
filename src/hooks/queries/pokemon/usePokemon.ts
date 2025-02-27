import { useQuery } from "@tanstack/react-query";
import { fetchPokemonList } from "@/lib/api/pokemonService";
import { PokemonListResponse } from "@/types/api/pokemon";

export const usePokemonList = (limit: number = 20, offset: number = 0) => {
  return useQuery<PokemonListResponse>({
    queryKey: ["pokemonList", limit, offset],
    queryFn: () => fetchPokemonList(limit, offset),
  });
};
