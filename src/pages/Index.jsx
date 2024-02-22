import React, { useState } from "react";
import { Box, Grid, GridItem, useColorModeValue, VStack, Text, Center, Icon } from "@chakra-ui/react";
import { FaChessPawn } from "react-icons/fa";

const ChessPiece = ({ piece }) => {
  // Returning null if there is no piece, removing the placeholder
  return piece ? <Icon as={FaChessPawn} /> : null;
};

const boardSize = 8; // 8x8 chess board

// Helper function to create an initial board state
const initialPositions = {
  p: ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2", "a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"],
  r: ["a1", "h1", "a8", "h8"],
  n: ["b1", "g1", "b8", "g8"],
  b: ["c1", "f1", "c8", "f8"],
  q: ["d1", "d8"],
  k: ["e1", "e8"],
};

const createInitialBoard = () => {
  const board = Array(boardSize)
    .fill(null)
    .map(() => Array(boardSize).fill(null));

  for (const [piece, positions] of Object.entries(initialPositions)) {
    const pieceType = piece.toLowerCase();
    for (const pos of positions) {
      const x = pos.charCodeAt(0) - "a".charCodeAt(0);
      const y = boardSize - parseInt(pos[1], 10);
      board[y][x] = { type: pieceType, color: y < boardSize / 2 ? "w" : "b" };
    }
  }

  return board;
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
