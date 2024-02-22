import React from "react";
import { Flex } from "@chakra-ui/react";
import { FaChessPawn, FaChessRook, FaChessKnight, FaChessBishop, FaChessQueen, FaChessKing } from "@react-icons/fa";

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

  return (
    <Flex justify="center" align="center" height="100%">
      {icons[type.toLowerCase()]}
    </Flex>
  );
};

export default ChessPiece;
