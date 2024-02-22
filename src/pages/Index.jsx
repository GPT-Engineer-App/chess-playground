import React, { useState } from "react";
import { Box, Grid, GridItem, useColorModeValue, VStack, Text, Center, Icon } from "@chakra-ui/react";
import { FaChessPawn } from "react-icons/fa";

const ChessPiece = ({ piece }) => {
  // For now, we'll use a pawn icon as a placeholder for all pieces
  return <Icon as={FaChessPawn} />;
};

const boardSize = 8; // 8x8 chess board

// Helper function to create an initial board state
const initialPositions = {
  p: Array(8).fill({ type: "p", color: "w" }),
  r: [
    { type: "r", color: "w" },
    { type: "r", color: "w" },
  ],
  n: [
    { type: "n", color: "w" },
    { type: "n", color: "w" },
  ],
  b: [
    { type: "b", color: "w" },
    { type: "b", color: "w" },
  ],
  q: [{ type: "q", color: "w" }],
  k: [{ type: "k", color: "w" }],
};

const createInitialBoard = () => {
  // Create an empty 8x8 board
  return Array(boardSize)
    .fill(null)
    .map(() => Array(boardSize).fill(null));
};

const Index = () => {
  const [board, setBoard] = useState(createInitialBoard());

  const movePiece = (fromRow, fromCol, toRow, toCol) => {
    const newBoard = [...board];
    const pieceToMove = newBoard[fromRow][fromCol];
    newBoard[fromRow][fromCol] = null;
    newBoard[toRow][toCol] = pieceToMove;
    setBoard(newBoard);
  };
  const lightSquareColor = useColorModeValue("gray.200", "gray.600");
  const darkSquareColor = useColorModeValue("gray.500", "gray.800");

  return (
    <VStack p={4}>
      <Text fontSize="2xl" fontWeight="bold">
        Chess Game
      </Text>
      {/* Board image has been removed as per request */}
    </VStack>
  );
};

export default Index;
