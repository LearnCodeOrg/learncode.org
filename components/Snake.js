import { useEffect, useRef, useState } from 'react';

import styles from '../styles/components/Snake.module.css';

const mapSize = 16; // map grid size
const borderPixels = 1; // pixels in grid border

let canvas, ctx;
let snakeX, snakeY;
let appleX, appleY;
let snake = [];

export default function Snake() {
  const canvasRef = useRef();

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  // draws canvas
  function draw() {
    // clear canvas
    ctx.fillStyle = '#eee';
    ctx.fillRect(0, 0, width, height);
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
