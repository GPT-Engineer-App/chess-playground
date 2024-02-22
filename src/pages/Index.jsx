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
  // Bishops removed from initial positions
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

  const renderSquare = (piece, rowIndex, colIndex) => {
    const bg = (rowIndex + colIndex) % 2 === 0 ? lightSquareColor : darkSquareColor;
    return (
      <GridItem key={`${rowIndex}-${colIndex}`} bg={bg} w="50px" h="50px">
        <ChessPiece piece={piece} />
      </GridItem>
    );
  };

  return (
    <VStack p={4}>
      <Text fontSize="2xl" fontWeight="bold">
        Chess Game
      </Text>
      <Grid templateColumns={`repeat(${boardSize}, 50px)`} gap={0}>
        {board.map((row, rowIndex) => row.map((piece, colIndex) => renderSquare(piece, rowIndex, colIndex)))}
      </Grid>
    </VStack>
  );
};

export default Index;
