import { Heading } from "@chakra-ui/react";

const H3: React.FC = ({ children }) => (
  <Heading as="h3" fontSize="2xl" mt="6">
    {children}
  </Heading>
);

export default H3;
