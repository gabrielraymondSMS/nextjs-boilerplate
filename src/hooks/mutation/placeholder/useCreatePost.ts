import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/lib/api/placeholderService";

export const useCreatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            // Invalidate and refetch the Pokemon list after mutation
            queryClient.invalidateQueries({ queryKey: ["userList"] })
        }
    })
}