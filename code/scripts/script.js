/* Program: script.js
 * Programmer: Leonard Michel
 * Start Date: 11.08.2021
 * Last Change:
 * End Date: /
 * License: /
 * Version: 0.0.0.0
*/

/**** INITIALIZATION ****/

const SCREEN_WIDTH = 1280;
const SCREEN_HEIGHT = 720;

/* Handles for html elements */
let canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = SCREEN_WIDTH;
canvas.height = SCREEN_HEIGHT;

ctx.save();

let texteditor = document.getElementById("texteditor");
let textoutput = document.getElementById("textoutput");
document.body.onkeyup = function(){sbvm.load();};

/* Audio Object Definitions */
let audioButtonPressed = new Audio("audio/audioButtonPressed.mp3");
let audioButtonPressedIsReady = false;
audioButtonPressed.addEventListener("canplaythrough", function () { audioButtonPressedIsReady = true; });

/* Mouse Input */
let mouseX = 0;
let mouseY = 0;
let mouseLeftPressed = false,
    mouseRightPressed = false;

let mouseLeftPressedBefore = false,
    mouseRightPressedBefore = false;

document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("mousedown", mouseDownHandler, false);
document.addEventListener("mouseup", mouseUpHandler, false);

function mouseMoveHandler(e)
{
    mouseX = e.clientX;
    mouseY = e.clientY;
}

function mouseDownHandler(e)
{
    if (e.button == 0) { mouseLeftPressed = true; };
    if (e.button == 2) { mouseRightPressed = true; };
}

function mouseUpHandler(e)
{
    if (e.button == 0) { mouseLeftPressed = false; };
    if (e.button == 2) { mouseRightPressed = false; };
}

/* Key Presses */
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let wPressed = false,
    aPressed = false,
    sPressed = false,
    dPressed = false,
    jPressed = false,
    kPressed = false,
    lPressed = false;

let wPressedBefore = false,
    aPressedBefore = false,
    sPressedBefore = false,
    dPressedBefore = false,
    jPressedBefore = false,
    kPressedBefore = false,
    lPressedBefore = false;

function keyDownHandler(e)
{
    if (e.code == "KeyW") { wPressed = true; }
    if (e.code == "KeyA") { aPressed = true; }
    if (e.code == "KeyS") { sPressed = true; }
    if (e.code == "KeyD") { dPressed = true; }

    if (e.code == "KeyJ") { jPressed = true; }
    if (e.code == "KeyK") { kPressed = true; }
    if (e.code == "KeyL") { lPressed = true; }
}

function keyUpHandler(e)
{
    if (e.code == "KeyW") { wPressed = false; }
    if (e.code == "KeyA") { aPressed = false; }
    if (e.code == "KeyS") { sPressed = false; }
    if (e.code == "KeyD") { dPressed = false; }

    if (e.code == "KeyJ") { jPressed = false; }
    if (e.code == "KeyK") { kPressed = false; }
    if (e.code == "KeyL") { lPressed = false; }
}

/* Class Definitions */
class Button
{
	constructor()
	{
        this.x = 0;
        this.y = 0;
        this.width = 150;
        this.height = 50;
        // Colors
        this.colEdgeNeutral = "#888888";
        this.colFaceNeutral = "#00000044";
        this.colEdgeHover = "#bbbbbb";
        this.colFaceHover = "#00000088";
        this.colEdgePressed = "#ffffff";
        this.colFacePressed = "#000000bb";
        this.colTextFill = "#000000";
        this.colTextShadow = "#ffffff";
        // Color assignment
        this.edgeColor = this.colEdgeNeutral;
        this.faceColor = this.colFaceNeutral;

        this.text = "Button";
        this.isPressed = false;
        this.isVisible = true;
		this.playSound = true;
        // How often can the user click the button.
        this.clickSpeed = 50;
        this.clickTick = Date.now();
	}

    update()
    {
        this.collisionDetection();
		this.onClick();
		this.draw();
		this.playAudio();
    }

    collisionDetection()
    {
        // Only let the user click the button if the wait time has been passed
        if (tp1 - this.clickTick >= this.clickSpeed)
        {
            // If mouse is within button bounds.
            if (mouseX >= this.x && mouseX < this.x + this.width && mouseY >= this.y && mouseY < this.y + this.height)
            {
                // If mouse clicked on button
                if (mouseLeftPressed)
                {
                    if (mouseLeftPressedBefore == false)
                    {
                        this.edgeColor = this.colEdgePressed;
                        this.faceColor = this.colFacePressed;

                        this.isPressed = true;
                        mouseLeftPressedBefore = true;
                    }
                }
                // If mouse is hovering on button
                if (!mouseLeftPressed)
                {
                    this.edgeColor = this.colEdgeHover;
                    this.faceColor = this.colFaceHover;

                    this.isPressed = false;
                    mouseLeftPressedBefore = false;
                }
            }
            // If mouse is out of button bounds.
            else
            {
                this.edgeColor = this.colEdgeNeutral;
                this.faceColor = this.colFaceNeutral;

                this.isPressed = false;
            }

            this.clickTick = Date.now();
        }
    }

    draw()
    {
		if (this.isVisible)
		{
			// Draw fill
			ctx.fillStyle = this.faceColor;
			ctx.fillRect(this.x, this.y, this.width, this.height);

			// Draw border
			ctx.strokeStyle = this.edgeColor;
			ctx.strokeRect(this.x, this.y, this.width, this.height);

			// Draw text
			let textPosX = this.x + (this.width / 2),
				textPosY = this.y + (this.height / 1.5),
				textSize = this.height/1.5;

			ctx.textAlign = "center";
			ctx.font = this.height / 2 + "px sans-serif";

			// Text shadow
			ctx.fillStyle = this.colTextShadow;
			ctx.fillText(this.text, textPosX + textSize/128, textPosY + textSize/128);

			// Actual text
			ctx.fillStyle = this.colTextFill;
			ctx.fillText(this.text, textPosX, textPosY);
		}

    }

	playAudio()
	{
		if (this.playSound)
		{
			if (this.isPressed)
			{
				if (audioButtonPressedIsReady) { audioButtonPressed.play(); };
			}
		}
	}

	onClick(f)
	{
		if (this.isPressed)
		{
			f;
		}
	}
}

class SBVM
{
	constructor()
	{
		this.dev = true;
		this.memory = new Array(64);
		this.S = new Array();
		this.PC = this.saLow;
		this.saLow = 0x0;
		this.saHigh = 0x4f;
		// How many cycles the chip executes per second. So about 5Hz.
		this.clockSpeed = 1000 / 500;
		this.lastCycle = Date.now();
		// The delay timer. When greater than zero, the program waits the specified number of milliseconds before proceeding execution.
		this.DT = 0;
		this.audio = new Audio("audio/sbvm-tone.mp3");
		this.audioIsReady = false;
		this.audio.addEventListener("canplaythrough", function () { this.audioIsReady = true; });
	}

	execute(cycles)
	{
		// Only execute cycle if delay timer is 0
		if (this.DT == 0)
		{
			while (cycles > 0)
			{
				let instruction = this.memory[this.PC];
				if (this.dev)
				{
					console.clear();
					console.log("Memory Address Instruction");
					for (let i = 0; i < this.memory.length; i++)
					{
						if (this.memory[i] != null && this.memory[i] != 0)
						{
							console.log(i.toString().padStart(14, " ") + " " + this.memory[i].toString().toUpperCase());
						}
					}
					console.log("Stack");
					if (this.S.length > 0)
					{
						for (let i = 0; i < this.S.length; i++)
						{
							if (this.S[i] != null)
							{
								console.log("Stack.\n");
								console.log(this.S[i]);
								//console.log(i.toString().padStart(5, " "));
							}
						}

						for (let i = 0; i < this.S.length; i++)
						{
							if (this.S[i] != null)
							{
								//console.log(this.S[i].toString().toUpperCase().padStart(5, " "));
							}
						}
					}
				}

				if (instruction == null || instruction == 0)
				{
					if (this.dev) { console.log("No instruction.\n"); };
					this.movePC(1);
				}
				else if (instruction.toString().slice(0, 2) == "//")
				{
					if (this.dev) { console.log("Comment.\n"); };
					this.movePC(1);
				}
				else
				{
					let token = instruction.toString().toUpperCase().split(" ");
					//console.log(token[0]);
					switch (token[0])
					{
						case "PUSH":
							{
								this.S.push(parseInt(token[1]));
								this.movePC(1);
								if (this.dev) { console.log("Pushed " + token[1] + " onto the Stack.\n"); };
							}
							break;
						case "POP":
							{
								if (this.S.length > 0)
								{
									let n = this.S.pop();
									if (this.dev) {console.log("Popped " + n + " off the Stack.\n");};
								}
								this.movePC(1);
							}
							break;
						case "ADD":
							{
								// If the stack has at least 2 items
								if (this.S.length > 1)
								{
									let a = parseInt(this.S.pop());
									let b = parseInt(this.S.pop());

									this.S.push(a+b);
								}
								this.movePC(1);
							}
							break;
						case "IFEQ":
							{
								// If the stack is empty or the top-most item is 0.
								if (this.S.length == 0 || this.S[this.S.length-1] == 0)
								{
									this.movePC(1);
								}
								else
								{
									this.PC = parseInt(token[1]);
								}
							}
							break;
						case "JUMP":
							{
								if (parseInt(token[1]) >= this.saLow && parseInt(token[1]) <= this.saHigh)
								{
									// Move the program counter by difference of the address to goto and the current address. e.g. pc:10 address to goto:5 = 5-10 = -5
									// So the program counter will go 5 lines back.
									this.movePC(parseInt(token[1])-this.PC)
								}
								else
								{
									if (this.dev) {console.log("Unable to jump to memory address 0x" + token[1].toString(16).toUpperCase() + ".\n");};
								}
								this.movePC(1);
							}
							break;
						case "PRINT":
							{
								if (this.S.length > 0)
								{
									let i = this.S.length-1;

									// Print ascii char corresponding to supplied value.
									let asciicode = this.S[i];
									//console.log(asciicode);
									// This code corresponds to the bell so a sound is played when "printing" this char
									// instead of actually printing it to the screen.
									if (parseInt(asciicode) == 7)
									{
										this.audio.play();
										/* This if never becomes true for some reason...
										// play audio
										if (this.audioIsReady == true)
										{
											this.audio.play();
										}
										*/
									}
									else
									{
										this.audio.pause();
										textoutput.value += String.fromCharCode(asciicode);
									}
									if (this.dev) { console.log("print statement output.\n"); };
								}
								this.movePC(1);
							}
							break;
						case "DUP":
							{
								if (this.S.length > 0)
								{
									let a = this.S[this.S.length-1];
									this.S.push(a);
								}
								else
								{
									this.S.push(0);
								}
								this.movePC(1);
							}
							break;
						case "WAIT":
							{
								this.DT = parseInt(token[1]);
							}
						default:
							break;
					}
				}
				cycles--;
			}
		}
		else
		{
			// Decrease the delay timer until it is zero.
			if (this.DT > 0)
			{
				this.DT -= tp1 - sbvm.lastCycle;
				//console.log(this.DT);
			}
			else
			{
				this.DT = 0;
				this.movePC(1);
			}
		}
	}

	// Move the Program Counter forwards (+n) or backwards (-n).
	movePC(n)
	{
		// If program counter has reached end of program load the program and start again.
		if (this.PC == this.programEndAddress)
		{
			this.PC = this.programStartAddress;
			this.load();
		}
		else if (this.PC+n <= this.programEndAddress && this.PC+n >= this.programStartAddress) { this.PC += n; };
		/*
		if (this.PC+n <= this.saHigh)
		{
			this.PC += n;
		}
		else
		{
			//this.PC = this.saLow;//console.warn("  > Reached end of memory.\n");
		}
		*/
	}

	load()
	{
		this.reset();

		if (this.dev) {console.log("Loading\n");};
		let lines = texteditor.value.split("\n");

		// Remove any empty lines
		for (let i = 0; i < lines.length; i++)
		{
			// || lines[i].slice(0, 2).toString() == "//"
			if (lines[i] == null || lines[i] == "" || lines[i].slice(0, 2) == "//")
			{
				//console.log(lines[i].slice(0, 2));
				lines.splice(i, 1);
				i--;
				//console.log(lines);
			}
		}

		// Store the command from each line in memory. Excluding any line numbers written by the user.
		for (let i = 0; i < lines.length; i++)
		{
			let token = lines[i].toString().toUpperCase().split(" ");
			//console.log(token);
			this.memory[this.saLow+parseInt(token[0])] = token[1] + " " + token[2];

			if (i == 0)
			{
				this.PC = this.saLow+parseInt(token[0]);
				this.programStartAddress = this.PC;
			}
			if (i == lines.length-1)
			{
				this.programEndAddress = this.saLow+parseInt(token[0]);
			}
		}
		//console.log(this.memory);
	}

	reset()
	{
		this.memory = new Array(64);
		this.memory.fill(0);
		this.S = new Array();
		this.PC = this.saLow;
		this.saLow = 0x0;
		this.saHigh = 0x4f;
		// How many cycles the chip executes per second. So about 5Hz.
		this.clockSpeed = 1000 / 500;
		this.lastCycle = Date.now();

		textoutput.value = "";
	}
}
/* Function definitions */
function getRandomIntInclusive(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    // The maximum and minimum are inclusive
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Time variables
let tp1 = Date.now();
let tp2 = Date.now();
let elapsedTime = 0;

let sbvm = new SBVM;
sbvm.dev = false;

/*
sbvm.memory[0x0] = "push 5";
sbvm.memory[0x1] = "push 0";
sbvm.memory[0x2] = "print";
sbvm.memory[0x3] = "pop";
sbvm.memory[0x4] = "print";
*/

// The game loop
window.main = function ()
{
    window.requestAnimationFrame(main);
    // Get elapsed time for last tick.
    tp2 = Date.now();
    elapsedTime = tp2 - tp1;
    //console.log("elapsedTime:" + elapsedTime + "\n");
    tp1 = tp2;

	if (tp1 - sbvm.lastCycle >= sbvm.clockSpeed)
	{
		sbvm.execute(1);
		sbvm.lastCycle = Date.now();
	}
}

// Start the game loop
main();