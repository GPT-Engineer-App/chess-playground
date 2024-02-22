import React, { useState } from "react";
import { Box, Grid, GridItem, useColorModeValue, VStack, Text, Center } from "@chakra-ui/react";

const boardSize = 8; // 8x8 chess board

// Helper function to create an initial board state
const createInitialBoard = () => {
  const board = [];
  for (let i = 0; i < boardSize; i++) {
    const row = [];
    for (let j = 0; j < boardSize; j++) {
      row.push(null); // Replace with actual chess pieces
    }
    board.push(row);
  }
  return board;
};

const Index = () => {
  const [board, setBoard] = useState(createInitialBoard());
  const lightSquareColor = useColorModeValue("gray.200", "gray.600");
  const darkSquareColor = useColorModeValue("gray.500", "gray.800");

  return (
    <VStack p={4}>
      <Text fontSize="2xl" fontWeight="bold">
        Chess Game
      </Text>
      <Center>
        <Grid templateColumns={`repeat(${boardSize}, 1fr)`} gap={0}>
          {board.map((row, rowIndex) =>
            row.map((cell, columnIndex) => (
              <GridItem w="50px" h="50px" bg={(rowIndex + columnIndex) % 2 === 0 ? lightSquareColor : darkSquareColor} key={`${rowIndex}-${columnIndex}`}>
                {/* TODO: Render chess piece */}
              </GridItem>
            )),
          )}
        </Grid>
      </Center>
    </VStack>
  );
};

export default Index;
