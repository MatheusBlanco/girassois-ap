import { Box, Flex, Text } from "@chakra-ui/react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export type ShowMoreButtonType = {
  show: boolean;
  handleSetShow: () => void;
};

export function ShowMoreButton({ handleSetShow, show }: ShowMoreButtonType) {
  return (
    <Box>
      <Flex
        fontSize="14px"
        cursor="pointer"
        color="#838383"
        onClick={handleSetShow}
        align="center"
        gap={3}
        mt={4}
      >
        <Text>{show ? "Ocultar" : "Ver mais"}</Text>
        {show ? <FiChevronUp /> : <FiChevronDown />}
      </Flex>
    </Box>
  );
}
