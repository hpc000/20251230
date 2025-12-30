class Character {
  constructor(x, y, img) {
    this.x = x || 100;
    this.y = y || 100;
    this.img = img; // 接收圖片或是動畫陣列
    this.currentFrame = 0;
  }

  show() {
    push();
    // 判斷是動畫陣列還是單張圖片
    if (Array.isArray(this.img)) {
      let index = floor(this.currentFrame) % this.img.length;
      image(this.img[index], this.x, this.y);
      this.currentFrame += 0.1; // 動畫播放速度
    } else if (this.img) {
      image(this.img, this.x, this.y);
    } else {
      fill('red');
      circle(this.x, this.y, 50);
    }
    pop();
  }

  move(x, y) {
    this.x = x;
    this.y = y;
  }
}