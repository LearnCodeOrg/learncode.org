import { useEffect, useRef, useState } from 'react';

import styles from '../styles/components/Snake.module.css';

const mapSize = 16; // map grid size
const borderPixels = 1; // pixels in grid border
const updateTime = 200; // update interval in milliseconds

let canvas, ctx;
let snakeX, snakeY;
let appleX, appleY;
let snake = [];
let moves = [];
let direction = 'right';

// screen bounds
let minX = 0, maxX = mapSize - 1;
let minY = 0, maxY = mapSize - 1;

export default function Snake() {
  const canvasRef = useRef();

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  // draws canvas
  function draw() {
    // clear canvas
    ctx.fillStyle = '#eee';
    ctx.fillRect(0, 0, width, height);
    // draw grid
    ctx.fillStyle = 'white';
    const tileSize = (width > height ? width : height) / mapSize;
    const diff = (width > height ? width - height : height - width) / 2;
    for (let x = 0; x < mapSize; x++) {
      for (let y = 0; y < mapSize; y++) {
        const tileX = x * tileSize + borderPixels - (width > height ? 0 : diff);
        const tileY = y * tileSize + borderPixels - (width > height ? diff : 0);
        ctx.fillRect(tileX, tileY, tileSize - borderPixels * 2, tileSize - borderPixels * 2);
      }
    }
    // draw snake
    ctx.fillStyle = 'green';
    for (const tile of snake) {
      const tileX = tile[0] * tileSize - (width > height ? 0 : diff);
      const tileY = tile[1] * tileSize - (width > height ? diff : 0);
      ctx.fillRect(tileX, tileY, tileSize, tileSize);
    }
    // draw apple
    ctx.fillStyle = 'red';
    const tileX = appleX * tileSize - (width > height ? 0 : diff);
    const tileY = appleY * tileSize - (width > height ? diff : 0);
    ctx.fillRect(tileX, tileY, tileSize, tileSize);
  }

  // called on window resize
  function onResize() {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  // moves snake in new direction
  function move(newDirection) {
    const nextDirection = moves.length ? moves[0] : direction;
    if (newDirection === nextDirection) return;
    if (newDirection === 'up' && nextDirection === 'down') return;
    if (newDirection === 'left' && nextDirection === 'right') return;
    if (newDirection === 'down' && nextDirection === 'up') return;
    if (newDirection === 'right' && nextDirection === 'left') return;
    moves.push(newDirection);
  }

  // called on key press
  function onKeydown(e) {
    if (e.repeat) return;
    const key = e.key.toLowerCase();
    if (['w', 'arrowup'].includes(key)) move('up');
    else if (['a', 'arrowleft'].includes(key)) move('left');
    else if (['s', 'arrowdown'].includes(key)) move('down');
    else if (['d', 'arrowright'].includes(key)) move('right');
    else if (key === 'escape') setFade(false);
  }

  // resets game to beginning
  function reset() {
    snakeX = minX;
    snakeY = minY;
    snake = [[snakeX, snakeY]];
    apple();
    moves = [];
    direction = 'right';
    // update high score
    if (score > highScore) {
      highScore = score;
      window.localStorage.setItem('highScore', highScore);
    }
    score = 0;
    caption();
    draw();
  }

  // on start
  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
    // initialize dimensions
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    // set up resize and keydown listeners
    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKeydown);
    // set up touch listeners
    document.addEventListener('touchstart', onTouchStart);
    document.addEventListener('touchmove', onTouchMove);
    // clean up listeners on return
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKeydown);
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
    }
  }, []);

  // gets bounds of screen
  function getBounds() {
    // get viewable dimensions
    const wide = width > height;
    const halfMap = Math.round(mapSize / 2);
    const epsilon = blockEpsilon * 2;
    const tileSize = (wide ? width : height) / mapSize;
    const viewable = (wide ? height : width) / tileSize;
    const halfViewable = Math.floor((viewable - epsilon) / 2);
    // set bounds based on viewable
    minX = wide ? 0 : halfMap - halfViewable - 1;
    maxX = wide ? mapSize - 1 : halfMap + halfViewable;
    minY = wide ? halfMap - halfViewable - 1 : 0;
    maxY = wide ? halfMap + halfViewable : mapSize - 1;
  }

  // on screen change
  useEffect(() => {
    // check window is ready
    if (!width || !height) return;
    // update bounds
    getBounds();
    draw();
    // initialize
    if (!initialized) {
      highScore = window.localStorage.getItem('highScore') ?? 0;
      reset();
      initialized = true;
    }
    // set up update
    const updateInterval = setInterval(update, updateTime);
    return () => {
      clearInterval(updateInterval);
    };
  }, [width, height]);

  // refreshes apple position
  function apple() {
    // get all valid tiles
    let validTiles = [];
    for (let x = minX; x < maxX + 1; x++) {
      for (let y = minY; y < maxY + 1; y++) {
        // if valid tile
        if (
          // in snake
          snakeX !== x && snakeY !== y &&
          // in line with snake
          !snake.some(tile => tile[0] === x && tile[1] === y)
        ) validTiles.push([x, y]);
      }
    }
    // return if no valid tiles for apple
    if (!validTiles.length) {
      [appleX, appleY] = [null, null];
      return;
    }
    // get random apple tile
    const randomIndex = Math.floor(Math.random() * validTiles.length);
    const randomTile = validTiles[randomIndex];
    [appleX, appleY] = randomTile;
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
      />
    </div>
  );
}
