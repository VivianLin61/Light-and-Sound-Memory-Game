SITE Pre-Work Submission
Name: [Vivian Lin]

### Win Game GIF 
### PART 1
<img src="https://media.giphy.com/media/RvO2aIyAeHIQ84fEOl/giphy.gif" width=500>

### PART 2

<img src="https://media.giphy.com/media/QoYcn29SGp7HkIzNTv/giphy.gif" width=500>

### PART 3
<img src="https://media.giphy.com/media/ICKKPARyorHb1z6vtI/giphy.gif" width=500>

### Lose Game GIF 

<img src="https://i.imgur.com/u4vZ2wt.gif" width=500>

Optional Features Completed
[x] More than 4 game buttons
[x] Speed it up
[x] Use a random secret pattern
[x] Give the player 3 strikes
[x] Add a ticking clock




1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here.
   https://www.w3schools.com/
   https://www.w3schools.com/js/js_random.asp
   https://www.w3schools.com/jsref/met_win_settimeout.asp
   https://www.w3schools.com/js/js_timing.asp

2) What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words)
   [One challenge I encountered was using the Math.random function. 
I was not sure how to generate a random number from 1-6 since math.Random returns a number between 0-1. However, I needed it to generate integers from 1-6. I overcame this challenge by using resources like w3schools to better understand how the function works. After doing some research I applied what I learned for my specific case. I also I struggled to get the timer working. I used w3schools to understand how a setInterval and a clearInterval works. But, I had difficulty figuring out where to start the timer. I wanted to start my timer right  after the play sequence has completed. Thus I placed my timer at the end of the playClueSequence() function.  The timer started at the same time the sequence started playing. This is happening  because javascript is asynchronous so it continues to process code even though a previous method has not returned yet. To overcome this issue I used an another setTimeout at the end of the playClueSequence() which will call a timerFunction which will start the setInterval. In the setTimeout I set the number of milliseconds to wait before executing  the timerFunction to be delay - clueHoldTime so the setInterval will start immediately after the end of a play clue sequence.]
3) What questions about web development do you have after completing your submission? (recommended 100 - 300 words)
   [After struggling with clearInterval and setInterval functions I would like to learn more about timing events. 
   I would like to learn more about how javascript works. Specifically when working the adding a timer I would like to know why when I placed the setInterval
   at the end of the playClueSequence function it executed before the whole play sequence finished. In addition I would like to 
   know how the web works and how computer can communicate with each other through the web. I am interested in learning about 
   how client and servers work together to display information on a user's web browser. After completing this activity
   I got to learn a lot about how front end development works however I would like to learn more about the backend side of
   web development. What technologies are needed to connect the client and server side of an web application?
   ]

4) If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words)
   [If I had a few more hours to work on this project I would work on creating infinite levels.
   Instead having a fixed end to the game the player would be to play forever
   until they made 3 mistakes. This means the program would have dynamically add more clues to the pattern array.
   In addition I would also implement a score system so the user can see how many patterns they recoginzed. 
   In addition I would spend more time redesigning this application to make if more user-friendly. 
   For example I would center the start button and make it larger. Instead having a alert to let the user know they lost the game I would work on creating another page
   that the user will be directed to when they lose the game. On that page the user will have the option
   to click "Play Again" which will direct them back to the game page where they can start the game again. An addition I would also
   add a feature that prevents the user from clicking on the buttons while the pattern is being played. The buttons should
   only be enabled from user clicking once the pattern has been completed.]

