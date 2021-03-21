/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
//Global constants

const cluePauseTime = 333 //how long to pause in between clues
const nextClueWaitTime = 1000 //how long to wait before starting playback of the clue sequence
//Global Variables
var pattern = [2, 2, 4, 5, 2, 1, 6, 4]
var progress = 0
var gamePlaying = false
var tonePlaying = false
var volume = 0.5
var guessCounter = 0
var clueHoldTime = 1000
var mistakes = 0
var guessTimer = 3000 //3 seconds
var timer
var context
var o
var g
function startGame() {
  //Page Initialization
  // Init Sound Synthesizer
  context = new AudioContext()
  o = context.createOscillator()
  g = context.createGain()
  g.connect(context.destination)
  g.gain.setValueAtTime(0, context.currentTime)
  o.connect(g)
  o.start(0)
  //initialize game variables
  progress = 0
  gamePlaying = true
  mistakes = 0
  guessCounter = 0
  //Swap start and stop buttons
  document.getElementById('startBtn').classList.add('hidden')
  document.getElementById('stopBtn').classList.remove('hidden')
  document.getElementById('timeleft').innerHTML = ''
  //generate pattern
  // for (let i = 0; i < pattern.length; i++) {
  //   pattern[i] = Math.floor(Math.random() * 6) + 1 //generate random number from 1 to 6
  // }
  playClueSequence()
}

function stopGame() {
  //initialize game variables
  gamePlaying = false
  clearInterval(timer)
  document.getElementById('mistake').innerHTML = '3 mistakes left'
  document.getElementById('timeleft').innerHTML = ''
  //Swap start and stop buttons
  document.getElementById('startBtn').classList.remove('hidden')
  document.getElementById('stopBtn').classList.add('hidden')
}

function lightButton(btn) {
  document.getElementById('button' + btn).classList.add('lit')
}
function clearButton(btn) {
  document.getElementById('button' + btn).classList.remove('lit')
}

function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn)
    playTone(btn, clueHoldTime)
    setTimeout(clearButton, clueHoldTime, btn)
  }
}

function playClueSequence() {
  guessCounter = 0
  //disable all buttons
  let buttons = document.getElementsByTagName('button')
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.add('disable-btn')
  }

  let delay = nextClueWaitTime //set delay to initial wait time
  document.getElementById('timeleft').innerHTML = '3000 ms'
  for (let i = 0; i <= progress; i++) {
    // for each clue that is revealed so far
    console.log('play single clue: ' + pattern[i] + ' in ' + delay + 'ms')
    setTimeout(playSingleClue, delay, pattern[i]) // set a timeout to play that clue
    delay += clueHoldTime
    delay += cluePauseTime
  }
  //play sequence complete
  setTimeout(timerFunction, delay) //wait for the pattern to finish playing
  clueHoldTime -= 75 //Speed it up
}
function timerFunction() {
  //play sequence complete (enable all buttons)
  let buttons = document.getElementsByTagName('button')
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('disable-btn')
  }
  timer = setInterval(function () {
    document.getElementById('timeleft').innerHTML = guessTimer + ' ms'
    guessTimer += -1
    if (guessTimer < 0) {
      clearInterval(timer)

      mistakes++
      document.getElementById('mistake').innerHTML =
        3 - mistakes + ' mistakes left'
      if (mistakes == 3) {
        clearInterval(timer)
        document.getElementById('timeleft').innerHTML = '3000 ms'
        document.getElementById('mistake').innerHTML = '0 mistakes left'
        loseGame()
      } else {
        progress++
        guessTimer = 3000 //reset the timer to 10 seconds
        playClueSequence()
      }
    }
  }, 1)
}

function guess(btn) {
  console.log('user guessed:' + btn)
  if (!gamePlaying) {
    return
  }

  if (pattern[guessCounter] == btn) {
    //Guess was correct!
    if (guessCounter == progress) {
      if (progress == pattern.length - 1) {
        //GAME OVER: WIN!
        clearInterval(timer)
        document.getElementById('timeleft').innerHTML = '3000 ms'
        winGame()
      } else {
        //Pattern correct. Add next segment
        clearInterval(timer)
        guessTimer = 3000 //reset the timer to 3 seconds
        document.getElementById('timeleft').innerHTML = guessTimer + ' ms'
        progress++
        playClueSequence()
      }
    } else {
      //so far so good... check the next guess
      guessCounter++
    }
  } else {
    //Guess was incorrect
    //GAME OVER: LOSE!
    mistakes++
    document.getElementById('mistake').innerHTML =
      3 - mistakes + ' mistakes left'
    if (mistakes == 3) {
      clearInterval(timer)
      document.getElementById('timeleft').innerHTML = '3000 ms'
      document.getElementById('mistake').innerHTML = '0 mistakes left'
      loseGame()
    } else {
      progress++
      clearInterval(timer)
      guessTimer = 3000 //reset the timer to 10 seconds
      document.getElementById('timeleft').innerHTML = guessTimer + ' ms'
      playClueSequence()
    }
  }
}

function loseGame() {
  stopGame()
  alert('Game Over. You lost.')
}

function winGame() {
  stopGame()
  alert('Game Over. You won.')
}

// Sound Synthesis Functions
const freqMap = {
  1: 261.6,
  2: 329.6,
  3: 392,
  4: 466.2,
  5: 541.2,
  6: 615.2,
}
function playTone(btn, len) {
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025)
  tonePlaying = true
  setTimeout(function () {
    stopTone()
  }, len)
}
function startTone(btn) {
  if (!tonePlaying) {
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025)
    tonePlaying = true
  }
}
function stopTone() {
  g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025)
  tonePlaying = false
}
