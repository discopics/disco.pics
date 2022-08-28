import React from "react";
import { UserType } from "../types/Types";

const useRedisUser = () => {
  const [user, setUser] = React.useState<UserType | undefined>();

  React.useEffect(() => {
    (async () => {
      const response = await fetch("/api/user");
      const user = await response.json();
      setUser(user.data);
    })();
  }, [user]);

  return { user, refetchUser: () => setUser(undefined) };
};

export default useRedisUser;
