import { Flex } from "@chakra-ui/react";
import Train from "~/components/Train";

const ExampleTrain: React.VFC = () => (
  <Flex alignItems="center" gap="2">
    <Train
      train={{
        id: "1800",
        type: "2",
        dest: "033",
        direction: "East",
        delay: 0,
        length: 10,
        operationId: "69K",
        typeChanges: [
          {
            type: "6",
            dest: "120",
          },
        ],
        section: {
          id: 1,
          type: "Sta",
          track: 3,
        },
      }}
    />
    <Train
      train={{
        id: "3203",
        type: "4",
        dest: "027",
        direction: "West",
        delay: 1,
        length: 10,
        operationId: "No.1",
        typeChanges: [
          {
            type: "6",
            dest: "032",
          },
        ],
        section: {
          id: 1,
          type: "Sta",
          track: 3,
        },
      }}
    />
  </Flex>
);

export default ExampleTrain;
