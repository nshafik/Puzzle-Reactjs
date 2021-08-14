import React, { useState } from "react";
import Tile from "./Tile";
import { TILE_COUNT, GRID_SIZE, BOARD_SIZE,SHUFFLE_NUM, Won,canSwap, swap  } from "./helpers"
var count =0;
let listOfTiles= [];

function Board({imgUrl}) {
  const [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()]);
  listOfTiles.splice(count, count, tiles);



  const hasWon = Won(tiles)
  
  const swapTiles = (tileIndex) => {
    if (canSwap(tileIndex, tiles.indexOf(tiles.length - 1)) && !hasWon) {
      const swappedTiles = swap(tiles, tileIndex, tiles.indexOf(tiles.length - 1));
      setTiles(swappedTiles)
      count ++;
      listOfTiles.splice(count, count, swappedTiles);
    }
  }


  const undo = () => {
    if(listOfTiles[count-1] ){
    count= count -1;
    setTiles(listOfTiles[count])
    }
  }

  const shuffle = (tiles) => {
    var rand = tiles[Math.floor(Math.random()*tiles.length)];

    while ( !(canSwap( rand, tiles.indexOf(tiles.length - 1)))) {
      rand = tiles[Math.floor(Math.random()*tiles.length)];
    }
    if (canSwap(rand, tiles.indexOf(tiles.length - 1))) {
      const swappedTiles = swap(tiles, rand, tiles.indexOf(tiles.length - 1));
      return(swappedTiles);
    }
    
  }
  
 
  const handleTileClick = (index) => {
    swapTiles(index)
  }



  const shuffleTiles = () => {
    let swappedTiles= [...Array(TILE_COUNT).keys()];

    for(var i = 0; i< SHUFFLE_NUM ; i++ ){
      swappedTiles = shuffle(swappedTiles);
    }
    setTiles(swappedTiles);
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
      <button onClick={() => undo() }>undo</button>

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