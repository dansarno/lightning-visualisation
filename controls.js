function keyPressed() {
  if (key == 'p' || key == 'P') {
    paused = !paused;
    if (paused) noLoop();
    else loop();
  }

  if (key == 'h' || key == 'H') {
    showHide = !showHide;
  }

  if (key == 'r' || key == 'R') {
    reset = !reset;
  }
}