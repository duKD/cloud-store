import type { fileDto } from "~/server/type/file";
import { useUserStore } from "~/store/user";

export default function useCreateFileTree() {
  const { accessToken } = useUserStore();
}
