let spriteSheet;
let spriteSheet2;
let spriteSheet3;
let spriteSheet4;
let spriteSheet5;
let walkSheet;
let jumpSheet;
let pushSheet;
let smileSheet2;
let fallDownSheet2;
let toolSheet;

let animation = [];
let animation2 = [];
let animation3 = [];
let animation4 = [];
let animation5 = [];
let walkAnimation = [];
let jumpAnimation = [];
let pushAnimation = [];
let smileAnimation2 = [];
let fallDownAnimation2 = [];
let toolAnimation = [];

let spriteWidth = 1955;
let spriteHeight = 212;
let numFrames = 14;
let frameWidth;

let spriteWidth2 = 699;
let spriteHeight2 = 190;
let numFrames2 = 8;
let frameWidth2;

let spriteWidth3 = 1955; // 假設角色3圖片寬度與角色1相同
let spriteHeight3 = 212;
let numFrames3 = 8;
let frameWidth3;

let spriteWidth4 = 1955;
let spriteHeight4 = 212;
let numFrames4 = 6;
let frameWidth4;

let spriteWidth5 = 1955;
let spriteHeight5 = 212;
let numFrames5 = 3;
let frameWidth5;

let smileSpriteWidth2 = 585;
let smileSpriteHeight2 = 183;
let smileNumFrames2 = 5;
let smileFrameWidth2;

let fallDownSpriteWidth2 = 2712;
let fallDownSpriteHeight2 = 156;
let fallDownNumFrames2 = 11;
let fallDownFrameWidth2;

let walkSpriteWidth = 1246;
let walkSpriteHeight = 198;
let walkNumFrames = 9;
let walkFrameWidth;

let jumpSpriteWidth = 1913;
let jumpSpriteHeight = 188;
let jumpNumFrames = 14;
let jumpFrameWidth;

let pushSpriteWidth = 1039;
let pushSpriteHeight = 146;
let pushNumFrames = 4;
let pushFrameWidth;

let toolSpriteWidth = 740;
let toolSpriteHeight = 19;
let toolNumFrames = 5;
let toolFrameWidth;

let currentFrame2 = 0;
let currentFrame = 0;
let walkCurrentFrame = 0;
let jumpCurrentFrame = 0;
let pushCurrentFrame = 0;
let smileCurrentFrame2 = 0;
let fallDownCurrentFrame2 = 0;
let animationSpeed = 0.1; // 調整這個值可以改變動畫速度，數字越小越慢
let walkAnimationSpeed = 0.2;
let jumpAnimationSpeed = 0.3;
let pushAnimationSpeed = 0.15;
let smileAnimationSpeed2 = 0.1;
let fallDownAnimationSpeed2 = 0.2;
let animationSpeed2 = 0.1;
let toolAnimationSpeed = 0.3;

let bgImg;
let bgX = 0;

// 角色位置與移動速度
let characterX;
let characterY;
let character2X;
let character2Y;
let moveSpeed = 5;

// 角色狀態
let isJumping = false;
let velocityY = 0; // 垂直速度
let gravity = 0.8; // 重力加速度
let jumpForce = -16; // 跳躍初始速度
let groundY; // 地板 Y 座標
let facingDirection = 1; // 角色面向的方向: 1=右, -1=左
let isPushing = false;
let isSmiling2 = false; // 角色2是否在微笑
let isFallingDown2 = false; // 角色2是否在倒下
let proximityThreshold = 100; // 觸發互動的距離 (改小以模擬"碰到")
let projectileHitThreshold = 100; // 飛行道具擊中判定距離
let recoveryThreshold = 150; // 角色1靠近觸發恢復的距離
let hasFired = false; // 確保每次攻擊只發射一次

// 飛行道具陣列，可以管理多個道具
let projectiles = [];

// --- 新角色變數 ---
let newChar;
let newChar4;
let newChar5;

// --- 題庫系統 ---
let questionTable;
let questions = [];
let currentQuestion;

// DOM 元素與對話管理
let nameInput;
let nextQuestionButton;
let retryButton;
let character2Dialogue = ""; // 初始對話為空
// 0: 初始, 1: 正在輸入, 2: 答對(顯示下一題按鈕), 3: 答錯(顯示重試按鈕)
let dialogueStep = 0; 
let activeNPC = null; // 記錄目前正在互動的角色 ('char2' 或 'char5')
let score = 0; // 記錄分數


function preload() {
  // 在 preload 函式中載入圖片，確保在 setup() 開始前圖片已完全載入
  // p5.js 會從 index.html 檔案的位置去尋找相對路徑
  spriteSheet = loadImage('1/stop/stop.png');
  spriteSheet2 = loadImage('2/stop/stop_2.png');
  walkSheet = loadImage('1/walk/walk.png');
  jumpSheet = loadImage('1/jump/jump.png');
  pushSheet = loadImage('1/push/push.png');
  smileSheet2 = loadImage('2/smile/smile_2.png');
  fallDownSheet2 = loadImage('2/fall_down/fall_down_2.png');
  toolSheet = loadImage('1/tool/tool.png');
  bgImg = loadImage('City3_pale.png');
  spriteSheet3 = loadImage('3/stop/stop.png');
  spriteSheet4 = loadImage('4/stop/stop.png');
  spriteSheet5 = loadImage('5/stop/stop.png');

  // 載入 CSV 題庫檔案，'csv' 表示檔案格式，'header' 表示第一列是欄位名稱
  questionTable = loadTable('questions.csv', 'csv', 'header');
}

function setup() {
  // 建立一個佔滿整個瀏覽器視窗的畫布
  createCanvas(windowWidth, windowHeight);

  // 計算單一畫格的寬度
  frameWidth = spriteWidth / numFrames;

  // 從圖片精靈中切割出每一幀並存入 animation 陣列
  for (let i = 0; i < numFrames; i++) {
    let frame = spriteSheet.get(i * frameWidth, 0, frameWidth, spriteHeight);
    animation.push(frame);
  }

  // 計算新角色 (角色3) 動畫單一畫格的寬度並存入陣列
  // 改用圖片實際寬度計算，避免因數值設定錯誤導致切出空白畫格(造成閃現)
  frameWidth3 = spriteSheet3.width / numFrames3;
  for (let i = 0; i < numFrames3; i++) {
    let frame = spriteSheet3.get(i * frameWidth3, 0, frameWidth3, spriteSheet3.height);
    animation3.push(frame);
  }

  // 計算新角色 (角色4) 動畫單一畫格的寬度並存入陣列
  frameWidth4 = spriteSheet4.width / numFrames4;
  for (let i = 0; i < numFrames4; i++) {
    let frame = spriteSheet4.get(i * frameWidth4, 0, frameWidth4, spriteSheet4.height);
    animation4.push(frame);
  }

  // 計算新角色 (角色5) 動畫單一畫格的寬度並存入陣列
  frameWidth5 = spriteSheet5.width / numFrames5;
  for (let i = 0; i < numFrames5; i++) {
    let frame = spriteSheet5.get(i * frameWidth5, 0, frameWidth5, spriteSheet5.height);
    animation5.push(frame);
  }

  // 計算新角色動畫單一畫格的寬度並存入陣列
  frameWidth2 = spriteWidth2 / numFrames2;
  for (let i = 0; i < numFrames2; i++) {
    let frame = spriteSheet2.get(i * frameWidth2, 0, frameWidth2, spriteHeight2);
    animation2.push(frame);
  }
  
  // 計算微笑動畫單一畫格的寬度並存入陣列
  smileFrameWidth2 = smileSpriteWidth2 / smileNumFrames2;
  for (let i = 0; i < smileNumFrames2; i++) {
    let frame = smileSheet2.get(i * smileFrameWidth2, 0, smileFrameWidth2, smileSpriteHeight2);
    smileAnimation2.push(frame);
  }

  // 計算倒下動畫單一畫格的寬度並存入陣列
  fallDownFrameWidth2 = fallDownSpriteWidth2 / fallDownNumFrames2;
  for (let i = 0; i < fallDownNumFrames2; i++) {
    let frame = fallDownSheet2.get(i * fallDownFrameWidth2, 0, fallDownFrameWidth2, fallDownSpriteHeight2);
    fallDownAnimation2.push(frame);
  }

  // 計算走路動畫單一畫格的寬度並存入陣列
  walkFrameWidth = walkSpriteWidth / walkNumFrames;
  for (let i = 0; i < walkNumFrames; i++) {
    let frame = walkSheet.get(i * walkFrameWidth, 0, walkFrameWidth, walkSpriteHeight);
    walkAnimation.push(frame);
  }

  // 計算跳躍動畫單一畫格的寬度並存入陣列
  jumpFrameWidth = jumpSpriteWidth / jumpNumFrames;
  for (let i = 0; i < jumpNumFrames; i++) {
    let frame = jumpSheet.get(i * jumpFrameWidth, 0, jumpFrameWidth, jumpSpriteHeight);
    jumpAnimation.push(frame);
  }

  // 計算攻擊動畫單一畫格的寬度並存入陣列
  pushFrameWidth = pushSpriteWidth / pushNumFrames;
  for (let i = 0; i < pushNumFrames; i++) {
    let frame = pushSheet.get(i * pushFrameWidth, 0, pushFrameWidth, pushSpriteHeight);
    pushAnimation.push(frame);
  }

  // 計算飛行道具動畫單一畫格的寬度並存入陣列
  toolFrameWidth = toolSpriteWidth / toolNumFrames;
  for (let i = 0; i < toolNumFrames; i++) {
    let frame = toolSheet.get(i * toolFrameWidth, 0, toolFrameWidth, toolSpriteHeight);
    toolAnimation.push(frame);
  }

  // 設定圖片繪製模式為中心點對齊，方便將圖片置中
  imageMode(CENTER);

  // 初始化角色位置在畫布中央
  characterX = width / 2;
  characterY = height - 150;
  groundY = height - 150; // 設定地板位置

  // 初始化新角色的位置在原本角色的左邊
  character2X = characterX - 200;
  character2Y = height - 150;

  // 初始化新角色 (位置設在主角右側 100 像素處)
  newChar = new Character(width / 2 + 100, height - 150, animation3);
  newChar4 = new Character(width / 2 + 400, height - 150, animation4);
  newChar5 = new Character(width / 2 + 700, height - 150, animation5);

  // --- 建立輸入框 ---
  nameInput = createInput(); // 建立 HTML 輸入框並設定 placeholder
  nameInput.attribute('placeholder', '請回答');
  nameInput.position(-width, -height); // 先將其藏在畫面外
  nameInput.size(100, 20); // 將寬度從 150 改為 100
  nameInput.changed(handleAnswerInput); // 綁定 Enter 事件

  // --- 建立按鈕 ---
  nextQuestionButton = createButton('下一題');
  nextQuestionButton.position(-width, -height); // 初始隱藏
  nextQuestionButton.mousePressed(askNextQuestion);

  retryButton = createButton('再作答一次');
  retryButton.position(-width, -height); // 初始隱藏
  retryButton.mousePressed(retryCurrentQuestion);


  // 將載入的表格資料轉換為物件陣列，方便使用
  for (let row of questionTable.getRows()) {
    questions.push(row.obj);
  }
}

function draw() {
  // 設定畫布背景顏色（淡藍）
  background('#add8e6');
  
  // 繪製捲動背景 (左、中、右三張拼接)
  push();
  imageMode(CORNER);
  image(bgImg, bgX, 0, width, height);
  image(bgImg, bgX - width, 0, width, height);
  image(bgImg, bgX + width, 0, width, height);
  pop();
  if (bgX <= -width) bgX += width;
  if (bgX >= width) bgX -= width;

  // 處理並繪製所有飛行道具
  // 從後往前遍歷，方便安全地從陣列中移除元素
  for (let i = projectiles.length - 1; i >= 0; i--) {
    let p = projectiles[i];
    p.x += p.speed * p.direction;
    
    if (p.direction === 1) {
      image(toolAnimation[floor(p.currentFrame)], p.x, p.y);
    } else {
      push();
      translate(p.x, p.y);
      scale(-1, 1);
      image(toolAnimation[floor(p.currentFrame)], 0, 0);
      pop();
    }
    
    // --- 飛行道具碰撞偵測 ---
    let projectileDistance = dist(p.x, p.y, character2X, character2Y);
    if (projectileDistance < projectileHitThreshold && !isFallingDown2) {
      isFallingDown2 = true; // 觸發倒下
      isSmiling2 = false; // 停止微笑
      dialogueStep = 0; // 重置對話
      nameInput.position(-width, -height); // 隱藏輸入框
      fallDownCurrentFrame2 = 0; // 從第一幀開始播放
      projectiles.splice(i, 1); // 移除擊中的飛行道具
      continue; // 繼續下一個迴圈，避免後續的越界判斷
    }

    p.currentFrame = (p.currentFrame + toolAnimationSpeed) % toolNumFrames;

    // 如果飛行道具完全離開畫布的可視範圍，就將其從陣列中移除
    // 判斷條件為：物件中心點 超出 畫布邊界 + 物件寬度的一半
    if (p.x > width + (toolFrameWidth / 2) || p.x < -(toolFrameWidth / 2)) {
      projectiles.splice(i, 1);
    }
  }

  // --- 角色2互動邏輯 ---
  // 計算兩個角色之間的距離
  let d = dist(characterX, characterY, character2X, character2Y);

  // 如果角色1進入範圍，且不在互動中(dialogueStep === 0)，則觸發互動
  if (d < proximityThreshold && dialogueStep === 0 && !isFallingDown2) {
    activeNPC = 'char2'; // 設定目前互動對象為角色2
    askNewQuestion();
  }

  // --- 繪製新角色 ---
  if (isFallingDown2) {
    // 播放倒下動畫
    push();
    translate(character2X, character2Y);
    // 根據角色1的位置決定倒下時的朝向
    if (characterX < character2X) {
      scale(-1, 1);
    }
    image(fallDownAnimation2[floor(fallDownCurrentFrame2)], 0, 0);
    pop();

    // 動畫播放一次後停在最後一幀
    if (fallDownCurrentFrame2 < fallDownNumFrames2 - 1) {
      fallDownCurrentFrame2 += fallDownAnimationSpeed2;
    }

    // 如果角色1靠近，則恢復
    if (d < recoveryThreshold) {
      isFallingDown2 = false;
    }
  } else if (isSmiling2) {
    // 播放微笑動畫
    push();
    translate(character2X, character2Y);
    // 根據角色1的位置決定微笑時的朝向
    if (characterX < character2X) {
      scale(-1, 1);
    }
    image(smileAnimation2[floor(smileCurrentFrame2)], 0, 0);
    pop();

    // 持續播放微笑動畫
    smileCurrentFrame2 = (smileCurrentFrame2 + smileAnimationSpeed2);
    // 如果動畫播完，就停在最後一幀
    if (smileCurrentFrame2 >= smileNumFrames2) smileCurrentFrame2 = smileNumFrames2 - 1;

    // --- 在角色2上方顯示對話框 ---
    push(); // 儲存當前的繪圖設定
    textSize(20); // 設定字體大小
    let dialogue = character2Dialogue;
    let textPadding = 10;
    let boxWidth = textWidth(dialogue) + textPadding * 2;
    let boxHeight = 40; // 調整高度以適應較大的字體
    let boxX = character2X - boxWidth / 2;
    let boxY = character2Y - 160;

    // 根據對話狀態，決定按鈕的位置
    if (dialogueStep === 2) { // 答對
      nextQuestionButton.position(boxX + (boxWidth - nextQuestionButton.width) / 2, boxY - 30);
    } else if (dialogueStep === 3) { // 答錯
      retryButton.position(boxX + (boxWidth - retryButton.width) / 2, boxY - 30);
    }

    fill(255, 255, 255, 220); // 半透明白色背景
    stroke(0); // 黑色邊框
    rect(boxX, boxY, boxWidth, boxHeight, 5); // 繪製圓角矩形

    fill(0); // 黑色文字
    noStroke(); // 文字不需要邊框
    textAlign(CENTER, CENTER); // 文字置中對齊
    text(dialogue, boxX + boxWidth / 2, boxY + boxHeight / 2);
    pop(); // 恢復原本的繪圖設定

    // 如果玩家移開，則重置所有互動
    if (d >= proximityThreshold) {
      isSmiling2 = false;
      dialogueStep = 0;
      character2Dialogue = ""; // 重置對話內容
      activeNPC = null; // 清除互動對象
      hideAllInputs();
    }
  } else {
    // 播放待機動畫，並根據角色1位置轉向
    // 移除此處的強制重置，因為這會導致與其他角色 (char3, char4, char5) 互動時，
    // 因為 char2 處於待機狀態而錯誤地關閉對話框。
    if (characterX < character2X) {
      // 角色1在左邊，角色2朝左
      push();
      translate(character2X, character2Y);
      scale(-1, 1); // 水平翻轉
      image(animation2[floor(currentFrame2)], 0, 0);
      pop();
    } else {
      // 角色1在右邊，角色2恢復正常朝向 (朝右)
      image(animation2[floor(currentFrame2)], character2X, character2Y);
    }
    // 更新待機動畫的畫格
    currentFrame2 = (currentFrame2 + animationSpeed2) % numFrames2;
  }

  // 優先處理跳躍狀態
  if (isPushing) {
    // 播放攻擊動畫
    if (facingDirection === 1) {
      image(pushAnimation[floor(pushCurrentFrame)], characterX, characterY);
    } else {
      push();
      translate(characterX, characterY);
      scale(-1, 1);
      image(pushAnimation[floor(pushCurrentFrame)], 0, 0);
      pop();
    }

    pushCurrentFrame += pushAnimationSpeed;

    // 在動畫的特定幀產生飛行道具
    if (floor(pushCurrentFrame) === 3 && !hasFired) {
      let newProjectile = {
        x: characterX + (50 * facingDirection), // 在角色前方產生
        y: characterY - 20, // 調整Y軸位置
        direction: facingDirection,
        speed: 12,
        currentFrame: 0
      };
      projectiles.push(newProjectile); // 將新道具加入陣列
      hasFired = true; // 標記本次攻擊已發射
    }

    // 動畫結束後，返回待機
    if (pushCurrentFrame >= pushNumFrames) {
      isPushing = false;
      pushCurrentFrame = 0;
    }
  } else if (isJumping) {
    // 物理運算：套用重力與速度
    characterY += velocityY;
    velocityY += gravity;

    // 著地偵測
    if (characterY >= groundY) {
      characterY = groundY;
      isJumping = false;
      velocityY = 0;
      jumpCurrentFrame = 0;
    }

    // 限制動畫畫格，避免超過範圍
    let displayFrame = floor(jumpCurrentFrame);
    if (displayFrame >= jumpNumFrames) displayFrame = jumpNumFrames - 1;

    // 根據角色方向繪製跳躍動畫
    if (facingDirection === 1) {
      // 面向右
      image(jumpAnimation[displayFrame], characterX, characterY);
    } else {
      // 面向左，翻轉圖片
      push();
      translate(characterX, characterY);
      scale(-1, 1);
      image(jumpAnimation[displayFrame], 0, 0);
      pop();
    }

    // 更新跳躍動畫畫格
    if (jumpCurrentFrame < jumpNumFrames - 1) {
      jumpCurrentFrame += jumpAnimationSpeed;
    }
  } else {
    // 非跳躍狀態下，檢查左右移動
    if (keyIsDown(RIGHT_ARROW)) {
      facingDirection = 1; // 更新方向為右
      // 更新背景位置 (角色不移動，背景往左)
      bgX -= moveSpeed;
      // 讓 NPC 與飛行道具相對移動，保持在世界座標中
      character2X -= moveSpeed;
      for (let p of projectiles) p.x -= moveSpeed;
      if (newChar) newChar.x -= moveSpeed;
      if (newChar4) newChar4.x -= moveSpeed;
      if (newChar5) newChar5.x -= moveSpeed;
      // 顯示走路動畫
      image(walkAnimation[floor(walkCurrentFrame)], characterX, characterY);
      // 更新走路動畫的畫格
      walkCurrentFrame = (walkCurrentFrame + walkAnimationSpeed) % walkNumFrames;
    } else if (keyIsDown(LEFT_ARROW)) {
      facingDirection = -1; // 更新方向為左
      // 更新背景位置 (角色不移動，背景往右)
      bgX += moveSpeed;
      // 讓 NPC 與飛行道具相對移動
      character2X += moveSpeed;
      for (let p of projectiles) p.x += moveSpeed;
      if (newChar) newChar.x += moveSpeed;
      if (newChar4) newChar4.x += moveSpeed;
      if (newChar5) newChar5.x += moveSpeed;
      
      // 透過 translate 和 scale(-1, 1) 來水平翻轉圖片
      push(); // 儲存目前的繪圖設定
      translate(characterX, characterY); // 將原點移動到角色位置
      scale(-1, 1); // 水平翻轉座標系
      image(walkAnimation[floor(walkCurrentFrame)], 0, 0); // 在新的原點繪製圖片
      pop(); // 恢復原本的繪圖設定

      // 更新走路動畫的畫格
      walkCurrentFrame = (walkCurrentFrame + walkAnimationSpeed) % walkNumFrames;
    } else {
      // 顯示待機動畫
      image(animation[floor(currentFrame)], characterX, characterY);
      // 更新待機動畫的畫格
      currentFrame = (currentFrame + animationSpeed) % numFrames;
    }
  }
  
  // 顯示新角色
  if (newChar) newChar.show();
  if (newChar4) newChar4.show();
  if (newChar5) newChar5.show();

  // --- 角色3 互動邏輯 ---
  if (newChar) {
    let d3 = dist(characterX, characterY, newChar.x, newChar.y);
    
    // 觸發互動
    if (d3 < proximityThreshold && dialogueStep === 0 && activeNPC === null) {
      activeNPC = 'char3';
      askNewQuestion();
    }

    // 如果正在跟角色3互動，繪製對話框
    if (activeNPC === 'char3') {
      push();
      textSize(20); // 設定字體大小
      let dialogue = character2Dialogue;
      let textPadding = 10;
      let boxWidth = textWidth(dialogue) + textPadding * 2;
      let boxHeight = 40; // 調整高度以適應較大的字體
      let boxX = newChar.x - boxWidth / 2;
      let boxY = newChar.y - 160;

      // 更新按鈕位置
      if (dialogueStep === 2) nextQuestionButton.position(boxX + (boxWidth - nextQuestionButton.width) / 2, boxY - 30);
      else if (dialogueStep === 3) retryButton.position(boxX + (boxWidth - retryButton.width) / 2, boxY - 30);

      fill(224, 255, 255, 220); stroke(0); // 淡藍色背景 (LightCyan)
      rect(boxX, boxY, boxWidth, boxHeight, 5);
      fill(0); noStroke(); textAlign(CENTER, CENTER);
      text(dialogue, boxX + boxWidth / 2, boxY + boxHeight / 2);
      pop();

      // 離開範圍重置
      if (d3 >= proximityThreshold) {
        dialogueStep = 0; character2Dialogue = ""; activeNPC = null;
        hideAllInputs();
      }
    }
  }

  // --- 角色4 互動邏輯 ---
  if (newChar4) {
    let d4 = dist(characterX, characterY, newChar4.x, newChar4.y);
    
    // 觸發互動
    if (d4 < proximityThreshold && dialogueStep === 0 && activeNPC === null) {
      activeNPC = 'char4';
      askNewQuestion();
    }

    // 如果正在跟角色4互動，繪製對話框
    if (activeNPC === 'char4') {
      push();
      textSize(20); // 設定字體大小
      let dialogue = character2Dialogue;
      let textPadding = 10;
      let boxWidth = textWidth(dialogue) + textPadding * 2;
      let boxHeight = 40; // 調整高度以適應較大的字體
      let boxX = newChar4.x - boxWidth / 2;
      let boxY = newChar4.y - 160;

      // 更新按鈕位置
      if (dialogueStep === 2) nextQuestionButton.position(boxX + (boxWidth - nextQuestionButton.width) / 2, boxY - 30);
      else if (dialogueStep === 3) retryButton.position(boxX + (boxWidth - retryButton.width) / 2, boxY - 30);

      fill(255, 255, 224, 220); stroke(0); // 淡黃色背景 (LightYellow)
      rect(boxX, boxY, boxWidth, boxHeight, 5);
      fill(0); noStroke(); textAlign(CENTER, CENTER);
      text(dialogue, boxX + boxWidth / 2, boxY + boxHeight / 2);
      pop();

      // 離開範圍重置
      if (d4 >= proximityThreshold) {
        dialogueStep = 0; character2Dialogue = ""; activeNPC = null;
        hideAllInputs();
      }
    }
  }

  // --- 角色5 互動邏輯 ---
  if (newChar5) {
    let d5 = dist(characterX, characterY, newChar5.x, newChar5.y);
    
    // 觸發互動
    if (d5 < proximityThreshold && dialogueStep === 0 && activeNPC === null) {
      activeNPC = 'char5';
      askNewQuestion();
    }

    // 如果正在跟角色5互動，繪製對話框
    if (activeNPC === 'char5') {
      push();
      textSize(20); // 設定字體大小
      let dialogue = character2Dialogue;
      let textPadding = 10;
      let boxWidth = textWidth(dialogue) + textPadding * 2;
      let boxHeight = 40; // 調整高度以適應較大的字體
      let boxX = newChar5.x - boxWidth / 2;
      let boxY = newChar5.y - 160;

      // 更新按鈕位置
      if (dialogueStep === 2) nextQuestionButton.position(boxX + (boxWidth - nextQuestionButton.width) / 2, boxY - 30);
      else if (dialogueStep === 3) retryButton.position(boxX + (boxWidth - retryButton.width) / 2, boxY - 30);

      fill(255, 192, 203, 220); stroke(0); // 改為粉紅色背景 (Pink)
      rect(boxX, boxY, boxWidth, boxHeight, 5);
      fill(0); noStroke(); textAlign(CENTER, CENTER);
      text(dialogue, boxX + boxWidth / 2, boxY + boxHeight / 2);
      pop();

      // 離開範圍重置
      if (d5 >= proximityThreshold) {
        dialogueStep = 0; character2Dialogue = ""; activeNPC = null;
        hideAllInputs();
      }
    }
  }

  // --- 顯示計分板 ---
  push();
  textSize(24); // 先設定字體大小
  let scoreText = "得分: " + score;
  let scoreTextWidth = textWidth(scoreText);
  
  fill(255, 255, 255, 200); // 背景框顏色 (半透明白)
  stroke(0); strokeWeight(2); // 黑色邊框
  rect(15, 15, scoreTextWidth + 20, 40, 10); // 繪製圓角矩形背景
  
  fill(0); noStroke(); // 文字顏色
  textAlign(LEFT, CENTER);
  text(scoreText, 25, 35); // 文字位置 (垂直置中)
  pop();

  // 確保輸入框一直跟隨在角色1頭上 (如果正在輸入狀態)
  if (dialogueStep === 1) {
    nameInput.position(characterX - nameInput.width / 2, characterY - 120);
  }
}

// 當瀏覽器視窗大小改變時，自動調整畫布大小
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
  // 當視窗改變大小時，重新計算角色位置，使其保持在畫面中央
  let oldCharX = characterX;
  characterX = width / 2;
  characterY = height - 150;
  groundY = height - 150; // 更新地板位置
  character2X = characterX + (character2X - oldCharX); // 保持相對距離
  character2Y = height - 150;
  if (newChar) newChar.x = characterX + (newChar.x - oldCharX);
  if (newChar4) newChar4.x = characterX + (newChar4.x - oldCharX);
  if (newChar5) newChar5.x = characterX + (newChar5.x - oldCharX);
}

// 偵測單次按鍵事件來觸發跳躍
function keyPressed() {
  if (keyCode === UP_ARROW && !isJumping) {
    isJumping = true;
    velocityY = jumpForce; // 給予向上速度
  } else if (keyCode === DOWN_ARROW && !isJumping && !isPushing) { // DOWN_ARROW 是往下鍵
    isPushing = true;
    hasFired = false; // 重置發射旗標
  }
}

// 處理玩家答案輸入的函式
function handleAnswerInput() {
  let playerAnswer = nameInput.value();

  // 檢查答案是否正確
  if (playerAnswer === currentQuestion.答案) {
    character2Dialogue = currentQuestion.答對回饋;
    dialogueStep = 2; // 更新為答對狀態
    score++; // 答對加分
  } else {
    // 如果是角色5，答錯時顯示提示，否則顯示一般答錯回饋
    if (activeNPC === 'char5') {
      character2Dialogue = "提示: " + currentQuestion.提示;
    } else {
      character2Dialogue = currentQuestion.答錯回饋;
    }
    dialogueStep = 3; // 更新為答錯狀態
  }

  nameInput.value(''); // 清空輸入框
  nameInput.position(-width, -height); // 再次隱藏輸入框
}

// 提問一個新問題
function askNewQuestion() {
  // 從題庫中隨機選一題
  currentQuestion = random(questions);
  character2Dialogue = currentQuestion.題目; // 將對話設定為題目

  if (activeNPC === 'char2') {
    isSmiling2 = true;
    smileCurrentFrame2 = 0; // 從第一幀開始播放
  }
  dialogueStep = 1; // 進入輸入步驟
  
  // 顯示輸入框在角色1頭上
  nameInput.position(characterX - nameInput.width / 2, characterY - 120);
}

// 按下「下一題」按鈕時觸發
function askNextQuestion() {
  nextQuestionButton.position(-width, -height); // 隱藏按鈕
  askNewQuestion(); // 提問新問題
}

// 按下「再作答一次」按鈕時觸發
function retryCurrentQuestion() {
  retryButton.position(-width, -height); // 隱藏按鈕
  character2Dialogue = currentQuestion.題目; // 重新顯示題目
  dialogueStep = 1; // 回到輸入狀態
  
  // 顯示輸入框在角色1頭上
  nameInput.position(characterX - nameInput.width / 2, characterY - 120);
}

// 隱藏所有輸入相關的 DOM 元素
function hideAllInputs() {
  nameInput.position(-width, -height);
  nextQuestionButton.position(-width, -height);
  retryButton.position(-width, -height);
}
