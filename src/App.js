import React, { useEffect } from "react";
import "./App.css";

function App() {
  let mouse = {
    x: null,
    y: null,
    mr: 60
  };
  let mouseMoveEvent = e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  };
  useEffect(() => {
    window.addEventListener("resize", () => {
      headerCanvas.width = window.innerWidth;
      headerCanvas.height = window.innerHeight;
    });
    let headerCanvas = document.querySelector(".headerCanvas");
    headerCanvas.width = window.innerWidth;
    headerCanvas.height = window.innerHeight;
    let c = headerCanvas.getContext("2d");
    let colorArr = ["#2D2926", "#E94B3C", "#F0D0A4", "#9FC4A6", "#619F87"];
    class Figure {
      constructor(x, y, dx, dy, r) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.r = r;
        this.rd = r;
        this.mr = r * 6;
        this.color = colorArr[Math.floor(Math.random() * colorArr.length)];
      }
      draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
      };
      update = () => {
        if (this.x + this.r > headerCanvas.width || this.x - this.r < 0) {
          this.dx = -this.dx;
        }
        if (this.y + this.r > headerCanvas.height || this.y - this.r < 0) {
          this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        if (
          mouse.x - this.x < mouse.mr &&
          mouse.x - this.x > -mouse.mr &&
          mouse.y - this.y < mouse.mr &&
          mouse.y - this.y > -mouse.mr
        ) {
          if (this.r < this.mr) {
            this.r += 6;
          }
        } else if (this.r > this.rd) {
          this.r -= 0.5;
        }
        this.draw();
      };
    }
    let figureArr = [];
    for (let i = 0; i < headerCanvas.width / 3; i++) {
      let r = 7 + Math.random() * 5;
      let x = Math.random() * (headerCanvas.width - r * 2) + r;
      let y = Math.random() * (headerCanvas.height - r * 2) + r;
      let dx = Math.random() * 1 + 0.1;
      let dy = Math.random() * 1 + 0.1;
      if (Math.random() > 0.5) {
        dx = -dx;
      }
      if (Math.random() > 0.5) {
        dy = -dy;
      }
      figureArr.push(new Figure(x, y, dy, dy, r));
      figureArr[i].draw();
    }
    let animate = () => {
      requestAnimationFrame(animate);
      c.clearRect(0, 0, headerCanvas.width, headerCanvas.height);
      for (let i = 0; i < figureArr.length; i++) {
        figureArr[i].update();
      }
    };
    animate();
    // eslint-disable-next-line
  }, []);
  return <canvas onMouseMove={mouseMoveEvent} className="headerCanvas" />;
}

export default App;
