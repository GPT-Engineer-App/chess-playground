import React, { useState } from "react";
import { Box, Grid, GridItem, useColorModeValue, VStack, Text, Center, Icon } from "@chakra-ui/react";
import { FaChessPawn, FaChessRook, FaChessKnight, FaChessBishop, FaChessQueen, FaChessKing } from "react-icons/fa";

const ChessPiece = ({ piece }) => {
  if (!piece) {
    return null;
  }

  const { type, color } = piece;
  const pieceColor = color === "w" ? "white" : "black";

  const icons = {
    p: <FaChessPawn color={pieceColor} />,
    r: <FaChessRook color={pieceColor} />,
    n: <FaChessKnight color={pieceColor} />,
    b: <FaChessBishop color={pieceColor} />,
    q: <FaChessQueen color={pieceColor} />,
    k: <FaChessKing color={pieceColor} />,
  };

  return icons[type.toLowerCase()];
};

const boardSize = 8; // 8x8 chess board

// Helper function to create an initial board state
const initialPositions = {
  p: ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7", "a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"],
  r: ["a8", "h8", "a1", "h1"],
  n: ["b8", "g8", "b1", "g1"],
  b: ["c8", "f8", "c1", "f1"],
  q: ["d8", "d1"],
  k: ["e8", "e1"],
};

const createInitialBoard = () => {
  const board = Array(boardSize)
    .fill(null)
    .map(() => Array(boardSize).fill(null));

  for (const [piece, positions] of Object.entries(initialPositions)) {
    const pieceType = piece.toLowerCase();
    for (const pos of positions) {
      const x = boardSize - 1 - (pos.charCodeAt(0) - "a".charCodeAt(0));
      const y = boardSize - parseInt(pos[1], 10);
      board[y][x] = { type: pieceType, color: y >= boardSize / 2 ? "w" : "b" };
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
