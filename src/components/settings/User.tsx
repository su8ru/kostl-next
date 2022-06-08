import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { getFirebaseAuth } from "~/utils/firebaseAuth";
import H2 from "~/components/docs/H2";
import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { BsBoxArrowRight } from "react-icons/bs";
import { GoogleIcon } from "~/components/Icons";
import { apiClient } from "~/utils/apiClient";
import { useEffect } from "react";

const auth = getFirebaseAuth();

const User: React.VFC = () => {
  const [user, authLoading, authError] = useAuthState(auth);
  const [signInWithGoogle, userCredential, signInLoading, signInError] =
    useSignInWithGoogle(auth);

  const login = async () => {
    auth.languageCode = "ja";
    await signInWithGoogle();
  };

  const logout = async () => {
    auth.signOut();
    await apiClient.auth.session.$delete({ body: {} });
  };

  useEffect(() => {
    if (userCredential)
      userCredential.user.getIdToken().then((token) =>
        apiClient.auth.session.$post({
          body: { token },
        })
      );
  }, [userCredential]);

  if (user)
    return (
      <Box>
        <Flex mt="6">
          <Avatar name={user.displayName ?? "匿名"} src={user.photoURL ?? ""} />
          <Box ml="3">
            <Text fontSize="md">{user.displayName}</Text>
            <Text fontSize="sm">{user.email}</Text>
          </Box>
        </Flex>
        <Box mt="4">
          <Button
            rightIcon={<BsBoxArrowRight />}
            colorScheme="red"
            size="sm"
            onClick={logout}
          >
            ログアウト
          </Button>
        </Box>
        <Box mt="4">
          <Text fontSize="sm">ID</Text>
          <Text fontSize="md">{user.uid}</Text>
          <Button
            colorScheme="blue"
            size="xs"
            variant="link"
            onClick={() => {
              navigator.clipboard.writeText(user.uid);
            }}
          >
            Copy
          </Button>
        </Box>
      </Box>
    );

  return (
    <Box textAlign="center">
      <Button
        leftIcon={<GoogleIcon />}
        isLoading={authLoading || signInLoading}
        colorScheme="gray"
        onClick={login}
        mt="6"
      >
        Google でログイン
      </Button>
    </Box>
  );
};

export default User;
