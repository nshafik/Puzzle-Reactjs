export const TILE_COUNT = 16;
export const GRID_SIZE = 4;
export const BOARD_SIZE = 320;
export const imgUrl = "https://static.independent.co.uk/2021/07/01/23/SEI85370452.jpg?width=990&auto=webp&quality=75";

export function shuffle(tiles) {
  const shuffledTiles = [
    ...tiles
      .filter((t) => t !== tiles.length - 1)
      .sort(() => Math.random() - 0.5),
    tiles.length - 1,
  ];
  return shuffledTiles;
}


// Get the row/col pair from a linear index.
export function Position(index) {
  return {
    row: Math.floor(index / GRID_SIZE),
    col: index % GRID_SIZE,
  };
}

export function getVisualPosition(row, col, width, height) {
  return {
    x: col * width,
    y: row * height,
  };
}

export function Won(tiles){
  
  for(var i =0; i< TILE_COUNT ; i++){
    if(tiles[i] !== i )
      return false;
  }
  return true;
  }
  


export function canSwap(srcIndex, destIndex) {
  const { row: srcRow, col: srcCol } = Position(srcIndex);
  const { row: destRow, col: destCol } = Position(destIndex);
  return Math.abs(srcRow - destRow) + Math.abs(srcCol - destCol) === 1;
}

export function swap(tiles, src, dest) {
  const tilesResult = [...tiles];
  [tilesResult[src], tilesResult[dest]] = [tilesResult[dest], tilesResult[src]];
  return tilesResult;
}

export function updateURLParameter(url, param, paramVal) {
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";
    if (additionalURL) {
      tempArray = additionalURL.split("&");
      for (var i = 0; i < tempArray.length; i++) {
        if (tempArray[i].split("=")[0] !== param) {
          newAdditionalURL += temp + tempArray[i];
          temp = "&";
        }
      }
    }
  
    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
  }
