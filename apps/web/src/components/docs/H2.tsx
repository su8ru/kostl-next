import { Heading } from "@chakra-ui/react";

type Props = React.PropsWithChildren;

const H2 = ({ children }: Props) => (
  <Heading as="h2" fontSize="3xl" textAlign="center">
    {children}
  </Heading>
);

export default H2;
