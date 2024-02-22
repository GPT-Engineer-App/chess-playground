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
  const board = Array(boardSize)
    .fill(null)
    .map(() => Array(boardSize).fill(null));

  board[1] = [...initialPositions.p];
  board[0][0] = board[0][7] = initialPositions.r[0];
  board[0][1] = board[0][6] = initialPositions.n[0];
  board[0][2] = board[0][5] = initialPositions.b[0];
  board[0][3] = initialPositions.q[0];
  board[0][4] = initialPositions.k[0];

  // Set up black pieces by mirroring white
  for (let i = 0; i < 8; i++) {
    if (board[0][i]) {
      board[7][i] = { ...board[0][i], color: "b" };
    }
    if (board[1][i]) {
      board[6][i] = { ...board[1][i], color: "b" };
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
                <ChessPiece piece={cell} />
              </GridItem>
            )),
          )}
        </Grid>
      </Center>
    </VStack>
  );
};

export default Index;
