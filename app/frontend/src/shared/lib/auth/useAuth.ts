import { useEffect, useState } from "react";
import api from "@/shared/api/api";

export function useAuth(): { loading: boolean; isAuthenticated: boolean } {
  const [state, setState] = useState({ loading: true, isAuthenticated: false });

  useEffect(() => {
    api
      .get("me")
      .then((res) =>
        setState({ loading: false, isAuthenticated: res.status === 200 })
      )
      .catch(() => setState({ loading: false, isAuthenticated: false }));
  }, []);

  return state;
}
