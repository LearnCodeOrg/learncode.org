import { useEffect, useRef, useState } from 'react';

import styles from '../styles/components/Snake.module.css';

const mapSize = 16; // map grid size
const borderPixels = 1; // pixels in grid border

let canvas, ctx;
let snakeX, snakeY;
let appleX, appleY;
let snake = [];

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

  // on start
  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
    // initialize dimensions
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    // set up resize listener
    window.addEventListener('resize', onResize);
    // clean up listeners on return
    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, []);

  // on screen change
  useEffect(() => {
    // check window is ready
    if (!width || !height) return;
    // update bounds
    getBounds();
    draw();
  }, [width, height]);

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
