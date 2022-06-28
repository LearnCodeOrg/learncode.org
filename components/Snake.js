import { useEffect, useRef, useState } from 'react';

import styles from '../styles/components/Snake.module.css';

let canvas, ctx;

export default function Snake() {
  const canvasRef = useRef();

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

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
