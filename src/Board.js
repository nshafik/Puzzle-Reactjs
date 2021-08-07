import React, { useState } from "react";
import Tile from "./Tile";
import { TILE_COUNT, GRID_SIZE, BOARD_SIZE,SHUFFLE_NUM, Won,canSwap, swap  } from "./helpers"

function Board({imgUrl}) {
  const [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()]);
 
  const hasWon = Won(tiles)
  
  const swapTiles = (tileIndex) => {
    if (canSwap(tileIndex, tiles.indexOf(tiles.length - 1)) && !hasWon) {
      const swappedTiles = swap(tiles, tileIndex, tiles.indexOf(tiles.length - 1))
      setTiles(swappedTiles)
    }
  }

  const shuffle = () => {
    var rand = Math.round(Math.random()*10) ; 
    while ( !(canSwap(tiles.length-rand, tiles.indexOf(tiles.length - 1)))) {
      rand = Math.round(Math.random()*10) ;
    }
      const swappedTiles = swap(tiles, rand, tiles.indexOf(tiles.length - 1))
      setTiles(swappedTiles)
    }
  
 
  const handleTileClick = (index) => {
    swapTiles(index)
  }

  const shuffleTiles = () => {
    for(var i=0; i<SHUFFLE_NUM;i++){
    const shuffledTiles = shuffle(tiles)
    setTiles(shuffledTiles);
    }
  }

  const pieceWidth = Math.round(BOARD_SIZE / GRID_SIZE);
  const pieceHeight = Math.round(BOARD_SIZE / GRID_SIZE);
  const style = {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
  };

  return (
    <>
      <ul style={style} className="board">
      <button onClick={() => shuffleTiles() }>New game</button>

        {tiles.map((tile, index) => (
          <Tile
            key={tile}
            index={index}
            imgUrl={imgUrl}
            tile={tile}
            width={pieceWidth}
            height={pieceHeight}
            handleTileClick={handleTileClick}
          />
        ))}
      </ul>

    </>

  );
}

export default Board;