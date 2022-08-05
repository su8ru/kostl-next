import { useEffect } from "react";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { BsBoxArrowRight } from "react-icons/bs";
import { Avatar, Box, Button, Flex, Spacer, Text } from "@chakra-ui/react";
import CopyButton from "~/components/CopyButton";
import { GoogleIcon } from "~/components/Icons";
import { apiClient } from "~/utils/apiClient";
import { getFirebaseAuth } from "~/utils/firebaseAuth";

const auth = getFirebaseAuth();

const User: React.VFC = () => {
  const [user, authLoading] = useAuthState(auth);
  const [signInWithGoogle, userCredential, signInLoading] =
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

          <Flex>
            <Text fontSize="md">{user.uid}</Text>
            <Spacer />
            <CopyButton value={user.uid} />
          </Flex>
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
