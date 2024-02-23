import React, { useState } from "react";
import { Flex, Grid, GridItem, useColorModeValue, VStack, Text, HStack } from "@chakra-ui/react";
import { FaChessPawn, FaChessRook, FaChessKnight, FaChessBishop, FaChessQueen, FaChessKing } from "react-icons/fa";

const ChessPiece = ({ piece }) => {
  if (!piece) {
    return null;
  }

  const { type, color } = piece;
  const pieceColor = color === "w" ? "white" : "black";

  const icons = {
    p: <FaChessPawn color={pieceColor} size="2em" />,
    r: <FaChessRook color={pieceColor} size="2em" />,
    n: <FaChessKnight color={pieceColor} size="2em" />,
    b: <FaChessBishop color={pieceColor} size="2em" />,
    q: <FaChessQueen color={pieceColor} size="2em" />,
    k: <FaChessKing color={pieceColor} size="2em" />,
  };

  return (
    <Flex justify="center" align="center" height="100%">
      {icons[type.toLowerCase()]}
    </Flex>
  );
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

const CurrentTurnIndicator = ({ turn }) => {
  return (
    <HStack>
      <Text fontSize="md" fontWeight="bold">
        {turn === "w" ? "White's turn" : "Black's turn"}
      </Text>
      <FaChessKing color={turn === "w" ? "white" : "black"} />
    </HStack>
  );
};

const Index = () => {
  const [board, setBoard] = useState(createInitialBoard());
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [currentTurn, setCurrentTurn] = useState("w");

  const movePiece = (fromRow, fromCol, toRow, toCol) => {
    const newBoard = [...board];
    const pieceToMove = newBoard[fromRow][fromCol];
    newBoard[fromRow][fromCol] = null;
    newBoard[toRow][toCol] = pieceToMove;
    setBoard(newBoard);
  };
  const lightSquareColor = useColorModeValue("gray.200", "gray.600");
  const darkSquareColor = useColorModeValue("gray.500", "gray.800");

  const handleSquareClick = (rowIndex, colIndex) => {
    const isPawn = selectedPiece && board[selectedPiece.row][selectedPiece.col].type === "p";
    const isVerticalMove = selectedPiece && selectedPiece.col === colIndex;
    const isOneStepMove = (currentTurn === "w" && selectedPiece.row === rowIndex + 1) || (currentTurn === "b" && selectedPiece.row === rowIndex - 1);

    if (selectedPiece && (!board[rowIndex][colIndex] || board[rowIndex][colIndex].color !== currentTurn) && (!isPawn || (isPawn && isVerticalMove && isOneStepMove))) {
      movePiece(selectedPiece.row, selectedPiece.col, rowIndex, colIndex);
      setSelectedPiece(null); // Deselect after move
      setCurrentTurn(currentTurn === "w" ? "b" : "w"); // Switch turns
    } else if (board[rowIndex][colIndex] && board[rowIndex][colIndex].color === currentTurn) {
      setSelectedPiece({ row: rowIndex, col: colIndex });
    }
  };

  const renderSquare = (piece, rowIndex, colIndex) => {
    const isSelected = selectedPiece && selectedPiece.row === rowIndex && selectedPiece.col === colIndex;
    const bg = isSelected ? "blue.200" : (rowIndex + colIndex) % 2 === 0 ? lightSquareColor : darkSquareColor;
    return (
      <GridItem key={`${rowIndex}-${colIndex}`} bg={bg} w="50px" h="50px" onClick={() => handleSquareClick(rowIndex, colIndex)}>
        <ChessPiece piece={piece} isSelected={isSelected} />
      </GridItem>
    );
  };

  return (
    <VStack p={4} spacing={4}>
      <CurrentTurnIndicator turn={currentTurn} />
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
