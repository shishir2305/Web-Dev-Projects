const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let tool = canvas.getContext("2d");
tool.beginPath();
tool.moveTo(10, 10);
tool.lineTo(100, 150);
tool.stroke();
