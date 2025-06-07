import { api } from "@/shared";

export async function logout(): Promise<boolean> {
  return api
    .post("logout")
    .then((res) => {
      if (res.status === 200) {
        return true;
      }
      return false;
    })
    .catch(() => false);
}
