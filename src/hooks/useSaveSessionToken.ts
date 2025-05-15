import { useAuth } from "@clerk/clerk-expo";
import { useEffect } from "react";
import { useSessionTokenStore } from "../store/sessionTokenStore";

const useSaveSessionToken = () => {
  const { isSignedIn, getToken } = useAuth();
  const { setSessionToken, getValidToken } = useSessionTokenStore();
  console.log("refresh out");

  useEffect(() => {
    if (!getValidToken() && isSignedIn) {
      console.log("refresh");
      getToken().then((sessionToken) => {
        setSessionToken(sessionToken)
      });
    }
  }, [isSignedIn])

}

export default useSaveSessionToken;
