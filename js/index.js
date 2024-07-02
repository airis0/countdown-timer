//変数の定義
let hours;
let minutes;
let seconds;
let initial = true;
let running = false;
let timeUp = false;
let display = document.getElementById("display");
let start = document.getElementById("start");
let stop = document.getElementById("stop");
let reset = document.getElementById("reset");
let addHours = document.getElementById("addHours");
let addMinutes = document.getElementById("addMinutes");
let addSeconds = document.getElementById("addSeconds");
let subtractHours = document.getElementById("subtractHours");
let subtractMinutes = document.getElementById("subtractMinutes");
let subtractSeconds = document.getElementById("subtractSeconds");
const startmusic = new Audio('./sound/start.mp3');
const stopmusic = new Audio('./sound/stop.mp3');
const resetmusic = new Audio('./sound/reset.mp3');
const add_subtractmusic = new Audio('./sound/add-subtract.mp3');
const time_upmusic = new Audio('./sound/time-up.mp3');

function resetTime() {
  hours = 0;
  minutes = 0;
  seconds = 0;
}

function displayTime() {
  display.textContent = `${("0" + hours).slice(-2)}:${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;
  //文字列「0」に変数「hours」に代入されている数値をつなげて文字列にする。
  //その文字列の末尾から数えて２番目の文字から末尾の文字までを切り取る。
  //そうすることで、２桁の数値を表示させる。
  //「minutes」や「seconds」についても同様。
}

//カウントダウン関数
function countDown() {
  //setTimeout()を用いて、変数「running」がfalseであれば「return」で関数を終了。
  //そうでなければ、1000ミリ秒(=1秒)毎にcountDown()を実行させる。
  setTimeout(()=>{
    if(!running) {
      return;
    } else if(seconds > 0) {
      //「seconds」が0より大きい場合
      //「seconds」から1をマイナス
      seconds--;
      displayTime();
    } else if(seconds === 0) {
        if(minutes > 0) {
          //「seconds」が0で「minutes」が0より大きい場合
          //「minutes」から1をマイナスし、「seconds」に59を代入
          minutes--;
          seconds = 59;
          displayTime();
        } else if(minutes === 0) {
          if(hours > 0) {
            //「seconds」と「minutes」が0で、「hours」が0より大きい場合
            //「hours」から1を減算し、「seconds」と「minutes」に59を代入
            hours--;
            minutes = 59;
            seconds = 59;
            displayTime();
          } else if(hours === 0) {
            //「seconds」と「minutes」と「hours」が0の場合
            //「タイムアップ」と表示。
            stopped = true;
            timeUp = true;
            display.textContent = "TIME UP!";
            audio_start(time_upmusic);
          }
        }
    }
    countDown();
  }, 1000);
}

//「start」ボタンをクリックしたとき
start.addEventListener("click", () => {
  //「start」ボタンを押した時、もし変数「initial」が「true」であれば「return」を用いて処理を終了させる。
  //変数「running」が「true」であれば、同様に「return」を用いて処理を終了させる。
  //どちらにも当てはまらない場合は、「running」を「true」にして「stop」ボタン以外を半透明にしたうえでcountDown()を開始(もしくは再開)させる。
  if(initial) {
    return;
  } else if(running) {
    return;
  } else {
    running = true;
    audio_start(startmusic);
    start.classList.add("inactive");
    stop.classList.remove("inactive");
    reset.classList.add("inactive");
    addHours.classList.add("inactive");
    addMinutes.classList.add("inactive");
    addSeconds.classList.add("inactive");
    subtractHours.classList.add("inactive");
    subtractMinutes.classList.add("inactive");
    subtractSeconds.classList.add("inactive");
    countDown();
  }
});

//「stop」ボタンをクリックしたとき
stop.addEventListener("click", () => {
  //「stop」ボタンを押した時、もし変数「running」が「true」である場合は「running」を「false」にして「stop」ボタン以外のボタンを不透明にする。
  //そうでなければ、「return」で処理を終了させる。
  if(running) {
    running = false;
    stop.classList.add("inactive");
    start.classList.remove("inactive");
    reset.classList.remove("inactive");
    addHours.classList.remove("inactive");
    addMinutes.classList.remove("inactive");
    addSeconds.classList.remove("inactive");
    subtractHours.classList.remove("inactive");
    subtractMinutes.classList.remove("inactive");
    subtractSeconds.classList.remove("inactive");
    audio_start(stopmusic);
  } else {
    return;
  }
});

//「reset」ボタンをクリックしたとき
reset.addEventListener("click", () => {
  //「reset」ボタンを押した時、もし変数「running」が「true」である場合は「return」で処理を終了させる。
  //そうでなければ、変数「initial」を「true」にし、resetTime()で変数「hours」「minutes」「seconds」の値を全て0にし、「start」「reset」ボタンを半透明にし、「addHours」「addMinutes」「addSeconds」ボタンを不透明にする。
  if(running) {
    return;
  } else if(hours !==0 || minutes !== 0 || seconds !== 0) {
    initial = true;
    resetTime();
    displayTime();
    start.classList.add("inactive");
    reset.classList.add("inactive");
    addHours.classList.remove("inactive");
    addMinutes.classList.remove("inactive");
    addSeconds.classList.remove("inactive");
    subtractHours.classList.remove("inactive");
    subtractMinutes.classList.remove("inactive");
    subtractSeconds.classList.remove("inactive");
    audio_start(resetmusic);
  }
});

//「addHours」ボタンをクリックしたとき
addHours.addEventListener("click", () => {
  //もし変数「running」が「true」である場合は「return」で処理を終了させる。
  //そうでない場合、変数「hours」に1を加算し、displayTime()でディスプレイに時間を表示させ、もし変数「hours」「minutes」「seconds」のどれかが0でない場合は、「start」ボタンと「reset」ボタンを不透明にする。
  if(running) {
    return;
  } else {
    if(hours == 99){
      return;
    }else{
      hours++;
      displayTime();
      audio_start(add_subtractmusic);
      if(hours !== 0 || minutes !== 0 || seconds !== 0) {
        initial = false;
        start.classList.remove("inactive");
        reset.classList.remove("inactive");
      }
    }
  }
});

//「subtractHours」ボタンをクリックしたとき
subtractHours.addEventListener("click", () => {
  //もし変数「running」が「true」である場合は「return」で処理を終了させる。
  //そうでない場合で、「hours」が0の時、処理を終了する。（マイナスにならないように）
  //「hours」が0以外の場合、変数「hours」に1を減算し、displayTime()でディスプレイに時間を表示させる。。
  if(running) {
    return;
  } else {
    if(hours == 0){
      return;
    }else{
      hours--;
      displayTime();
      audio_start(add_subtractmusic);
      if(hours == 0 & minutes == 0 & seconds == 0) {
        initial = true;
        start.classList.add("inactive");
        reset.classList.add("inactive");
      }
    }
  }
});

//「addMinutes」ボタンをクリックしたとき
addMinutes.addEventListener("click", () => {
  //もし変数「running」が「true」であれば、「return」で処理を終了させる。
  //それ以外の場合で、変数「minutes」が59よりも小さい場合は「minutes」に1を加算。
  //そうでない場合は、「minutes」に0を代入し、「hours」に1を加算。
  if(running) {
    return;
  } else if(hours == 99 & minutes == 59){
    return;
  } else if(minutes < 59) {
    minutes++;
    audio_start(add_subtractmusic);
  } else {
    minutes = 0;
    hours++;
    audio_start(add_subtractmusic);
  }
  displayTime();
  //displayTime()でディスプレイに時間を表示させます。
  if(hours !== 0 || minutes !== 0 || seconds !== 0) {
    //変数「hours」「minutes」「seconds」のどれかが0でない場合は、「start」ボタンと「reset」ボタンを不透明にする。
    initial = false;
    start.classList.remove("inactive");
    reset.classList.remove("inactive");
  }
});

//「subtractMinutes」ボタンをクリックしたとき
subtractMinutes.addEventListener("click", () => {
  //もし変数「running」が「true」であれば、「return」で処理を終了させる。
  //それ以外の場合で、変数「minutes」が0よりも大きい場合は「minutes」に1を減算。
  //そうでない場合は、「minutes」に0を代入。（マイナスにならないように）
  if(running) {
    return;
  } else if(minutes > 0) {
    minutes--;
    audio_start(add_subtractmusic);
  } else {
    minutes = 0;
  }
  displayTime();
  //displayTime()でディスプレイに時間を表示させます。
  if(hours == 0 & minutes == 0 & seconds == 0) {
    initial = true;
    start.classList.add("inactive");
    reset.classList.add("inactive");
  }
});

//「addSeconds」ボタンをクリックしたとき
addSeconds.addEventListener("click", () => {
  if(running) {
    //「running」が「true」であれば、処理を終了。
    return;
  } else if(hours == 99 & minutes == 59 & seconds == 59){
    return;
  } else if(seconds < 59) {
    //「seconds」が59よりも小さい場合は「seconds」に1を加算。
    seconds++;
    audio_start(add_subtractmusic);
  } else {
    if(minutes < 59) {
      //「seconds」が59以上である場合で「minutes」が59よりも小さい場合
      //「seconds」に0を代入し、「minutes」に1を加算。
      seconds = 0;
      minutes++;
      audio_start(add_subtractmusic);
    } else {
      //「minutes」が59以上である場合
      //「seconds」と「minutes」に0を代入し「hours」に1を加算。
      seconds = 0;
      minutes = 0;
      hours++;
      audio_start(add_subtractmusic);
    }
  }
  
  displayTime();
  //ディスプレイに時間を表示
  if(hours !== 0 || minutes !== 0 || seconds !== 0) {
    //変数「hours」「minutes」「seconds」のどれかが0でない場合は、「start」ボタンと「reset」ボタンを不透明に。
    initial = false;
    start.classList.remove("inactive");
    reset.classList.remove("inactive");
  }
});


//「subtractSeconds」ボタンをクリックしたとき
subtractSeconds.addEventListener("click", () => {
  if(running) {
    //「running」が「true」であれば、処理を終了。
    return;
  } else if(seconds > 0) {
    //「seconds」が0よりも大きい場合は「seconds」に1を減算。
    seconds--;
    audio_start(add_subtractmusic);
  }else if(seconds == 0){ 
    //「seconds」が0の場合は処理を終了。
    return;
  }
  
  displayTime();
  //ディスプレイに時間を表示
  if(hours == 0 & minutes == 0 & seconds == 0) {
    initial = true;
    start.classList.add("inactive");
    reset.classList.add("inactive");
  }
});


//効果音の再生
function audio_start (music_sound) {
  music_sound.pause();
  music_sound.currentTime = 0;
  music_sound.play();
}

//関数の実行
//最初にページが表示されたときに行われる処理を指定。
resetTime();
displayTime();

