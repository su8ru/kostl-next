import { Heading } from "@chakra-ui/react";

const H2: React.FC = ({ children }) => (
  <Heading as="h2" fontSize="3xl" align="center">
    {children}
  </Heading>
);

export default H2;
