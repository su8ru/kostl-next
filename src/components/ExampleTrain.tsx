import { Flex } from "@chakra-ui/react";
import Train from "~/components/Train";

const ExampleTrain: React.VFC = () => (
  <Flex alignItems="center" gap="2">
    <Train
      train={{
        id: "1800",
        type: "2",
        dest: "120",
        direction: "East",
        delay: 0,
        carCount: 10,
        unitId: "9730F",
        operationId: "69K",
        typeChanges: [
          {
            type: "6",
            sta: "033",
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
        dest: "032",
        direction: "West",
        delay: 1,
        carCount: 10,
        unitId: "8712F",
        operationId: "No.1",
        typeChanges: [
          {
            type: "6",
            sta: "027",
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
