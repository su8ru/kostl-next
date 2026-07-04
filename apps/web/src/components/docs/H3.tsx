import { Heading } from "@chakra-ui/react";

type Props = React.PropsWithChildren;

const H3 = ({ children }: Props) => (
  <Heading as="h3" fontSize="2xl" mt="6">
    {children}
  </Heading>
);

export default H3;
