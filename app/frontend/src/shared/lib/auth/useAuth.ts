import { useEffect, useState } from "react";
import api from "@/shared/api/api";
import User from "@/shared/lib/auth/User.type";

export default function useAuth(): {
  loading: boolean;
  isAuthenticated: boolean;
  user: User | null;
} {
  const [state, setState] = useState({
    loading: true,
    isAuthenticated: false,
    user: null as User | null,
  });

  useEffect(() => {
    api
      .get("me")
      .then((res) =>
        setState({
          loading: false,
          isAuthenticated: res.status === 200,
          user: res.data as User,
        })
      )
      .catch(() =>
        setState({ loading: false, isAuthenticated: false, user: null })
      );
  }, []);

  return state;
}
