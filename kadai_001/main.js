// 変数の初期化
let untyped = '';
let typed = '';
let score = 0;

// 必要なHTML要素の取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
// 正タイプ数表示 2024/07/31 add-str
const typedcnt = document.getElementById('typedcnt');
// 正タイプ数表示 2024/07/31 add-end

// 複数のテキストを格納する配列
const textLists = [
  'Hello World','This is my App','How are you?',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming'
];

// ランダムなテキストを表示
const createText = () => {
  //正タイプした文字をクリア
  typed = '';
  typedfield.textContent = typed;

  // 配列のインデックス数からランダムな数値を生成する
  let random = Math.floor(Math.random() * textLists.length);

  untyped = textLists[random];
  untypedfield.textContent = untyped;
};

// キー入力の判定
const keyPress = e => {
  if(e.key !== untyped.substring(0,1)){
    wrap.classList.add('mistyped');
    // 100ms後に背景色を元に戻す
    setTimeout(() => {
    wrap.classList.remove('mistyped');
    }, 100);
    return;
  }

 // 正タイプの場合
 // スコアのインクリメント
 score++;
 // 正タイプ数表示 2024/07/31 add-str
 typedcnt.textContent = score;
 // 正タイプ数表示 2024/07/31 add-end
 wrap.classList.remove('mistyped');
 typed += untyped.substring(0,1);
 untyped = untyped.substring(1);
 typedfield.textContent = typed;
 untypedfield.textContent = untyped;

 // テキストが無くなったら新しいテキストを生成
 if (untyped === '') {
   createText();
 }
};
 
// タイピングスキルのランクを判定
const rankCheck = score => {

  // テキストを格納する変数
  let text = '';

  // スコアに応じて異なるメッセージを変数textに格納する
  if(score < 100) {
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
  } else if(score < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
  } else if(score < 300) {
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;  
  } else if(score >= 300) {
    text = `あなたのランクはSです。\nおめでとうございます!`;
  }

  // 生成したメッセージと一緒に文字列を返す
  return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};
 
// ゲームを終了
const gameOver = id => {
  clearInterval(id);
  // console.log('ゲーム終了');
  const result = confirm(rankCheck(score));
  // OKボタンが押されたらリロード
  if(result == true) {
     window.location.reload();
     }
};
 
// カウントダウンタイマー
const timer = () => {

 // タイマー部分のHTML要素（p要素）を取得する
 let time = count.textContent;

 const id = setInterval(() => {

   // カウントダウンする
   time--;
   count.textContent = time;
   
   // カウントがゼロになったらタイマー停止
   if(time <= 0) {
    gameOver(id);
   }
 }, 1000);
};

// ゲームスタート時の処理
start.addEventListener('click',() => {

  // カウントダウンタイマーを開始する
  timer();

  // ランダムなテキストを表示する。 
  createText();

  // 正タイプ数表示 2024/07/31 add-str
  typedcnt.style.display = 'block';
  typedcnt.textContent = 0;
  // 正タイプ数表示 2024/07/31 add-end

  // スタートボタンを非表示にする。
  start.style.display = 'none';

  // キーボードのイベント処理
  document.addEventListener('keypress', keyPress);
});
untypedfield.textContent = 'スタートボタンで開始';
