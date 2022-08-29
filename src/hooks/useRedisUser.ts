import { useEffect, useState } from "react";
import { UserType } from "../types/Types";

const useRedisUser = () => {
  const [user, setUser] = useState<UserType | undefined>();
  const [refetch, setRefetch] = useState(0);
  useEffect(() => {
    (async () => {
      console.log("RUN");
      const response = await fetch("/api/user");
      const user = await response.json();
      setUser(user.data);
    })();
  }, [refetch]);

  return { user, refetchUser: () => setRefetch(refetch + 1) };
};

export default useRedisUser;
