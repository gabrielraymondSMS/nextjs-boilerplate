'use client'
import { usePokemonDetails } from "@/hooks/pokemon/fetch/usePokemonDetails";

export const PokemonDetails = ({ id }: { id: string }) => {
  const { data, isLoading, error } = usePokemonDetails(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{data?.name}</h1>
      <img src={data?.sprites.front_default} alt={data?.name} />
      <p>Types: {data?.types.map((type) => type.type.name).join(", ")}</p>
    </div>
  );
};
