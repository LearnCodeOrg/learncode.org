import { useEffect, useRef, useState } from 'react';

import styles from '../styles/components/Snake.module.css';

let canvas, ctx;

export default function Snake() {
  const canvasRef = useRef();

  // on start
  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
      />
    </div>
  );
}
