class ChatController {
    constructor() {
        this.messages = []
        this.listeners = []
    }

    getMessage(index) {
        return this.messages[index];
    }

    addMessage(message) {
        this.messages.push(message);
        this.listeners.forEach((listener) => {
            listener.newMessage(message)
        })
    }

    addListener(listener) {
        this.listeners.push(listener)
    }
}

class ChatItem {
    constructor(scene, x, y, width, height) {
        this.scene = scene
        this.width = width
        this.height = height
        this.container = scene.add.container(x, y);

        // Create background rectangle for the display area
        this.background = scene.add.rectangle(0, 0, width, height)
            .setOrigin(0, 0)
            .setAlpha(0.8);
        this.container.add(this.background);
    }
}

class ChatDisplay extends ChatItem {
    constructor(scene, x, y, width, height, chatController) {
        super(scene, x, y, width, height)
        this.chatController = chatController
        this.chatController.addListener(this)
        this.currentMessageIndex = -1

        this.background.setFillStyle(0x000000, 0.5)
        this.textObject = scene.add.text(width / 2, 10, '', {
            fontSize: '14px',
            fill: '#ffffff',
            wordWrap: { width: width - 20 }
        })
            .setOrigin(0.5, 0)
            .setInteractive()
        this.container.add(this.textObject)

        this.createScrollButtons()
    }

    setButtonVisibilities() {
        // Would be better to gray out button, but since it's an emoji fill has no effect.
        if (this.currentMessageIndex < this.chatController.messages.length - 1) {
            this.downButton.setInteractive();
        } else {
            this.downButton.disableInteractive();
        }

        if (this.currentMessageIndex > 0) {
            this.upButton.setInteractive();
        } else {
            this.upButton.disableInteractive();
        }
    }

    showMessage() {
        const CHARACTERS_PER_SECOND = 30
        const { sender, message } = this.chatController.getMessage(this.currentMessageIndex)
        let displayedMessage = `[${sender}]: ${message}`
        let index = 0;
        this.typingTimer = this.scene.time.addEvent({
            delay: 1000 / CHARACTERS_PER_SECOND,
            callback: () => {
                this.textObject.setText(displayedMessage.substring(0, index + 1));
                index++;

                // If all characters are displayed, stop the timer
                if (index === displayedMessage.length) {
                    this.typingTimer.destroy();
                    this.typingTimer = undefined
                }
            },
            loop: true,
        });
    }

    // scroll Up/Down should be guarded by setButtonVisibilities, which will disable the buttons if out of range
    scrollUp() {
        this.currentMessageIndex -= 1
        this.showMessage()
        this.setButtonVisibilities()
    }

    scrollDown() {
        this.currentMessageIndex += 1
        this.showMessage()
        this.setButtonVisibilities()
    }

    createScrollButtons() {
        const buttonY = this.height - 20; // Place buttons at the bottom of the display
        this.upButton = this.scene.add.text(this.width / 2 - 20, buttonY, '⬆️', {
            fontSize: '20px',
            padding: { x: 10 },
            borderRadius: 5
        }).setOrigin(0.5, 0);
        this.container.add(this.upButton);
        this.upButton.on('pointerdown', () => this.scrollUp());

        this.downButton = this.scene.add.text(this.width / 2 + 20, buttonY, '⬇️', {
            fontSize: '20px',
            padding: { x: 10 },
            borderRadius: 5
        }).setOrigin(0.5, 0);
        this.container.add(this.downButton);
        this.downButton.on('pointerdown', () => this.scrollDown());
        this.setButtonVisibilities();
    }

    newMessage(message) {
        this.currentMessageIndex += 1
        this.showMessage()
        this.setButtonVisibilities()
    }
}

class ChatInput extends ChatItem {
    constructor(scene, x, y, width, height, chatController, userName = 'Player') {
        super(scene, x, y, width, height);
        this.chatController = chatController;
        this.userName = userName;
        this.initialMessage = 'Enter your message...';
        this.message = '';
        this.inputFieldInFocus = false;
        this.caretVisible = true;

        // Set background color for the input area
        this.background.setFillStyle(0xffffff).setInteractive();

        // Create a text object for the submit button
        this.submitButton = scene.add.text(0.9 * width, height / 2, 'Send', {
            fontSize: '16px',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 },
            borderRadius: 5
        }).setOrigin(0.5, 0.5).setInteractive();
        this.container.add(this.submitButton);

        this.submitButton.on('pointerdown', () => this.handleSubmit());

        // Set field focus if clicked inside box
        this.scene.input.on('pointerdown', (pointer) => {
            this.inputFieldInFocus = this.background.getBounds().contains(pointer.x, pointer.y);
            this.updateText()
        });

        // prevent space from scrolling window down
        window.addEventListener('keydown', (e) => {
            if (e.key == ' ' && e.target == document.body && this.inputFieldInFocus) {
                e.preventDefault();
            }
        });


        this.createInputField();
    }

    createInputField() {
        // Create text object for input field placeholder
        this.inputText = this.scene.add.text(10, this.height / 2, this.initialMessage, {
            fontSize: '16px',
            fill: '#000000',
            wordWrap: { width: this.width - 20 }
        }).setOrigin(0, 0.5).setInteractive();
        this.container.add(this.inputText);

        // Keyboard input handler
        this.scene.input.keyboard.on('keydown', (event) => {
            if (!this.inputFieldInFocus) return;

            if (event.key === 'Enter') {
                this.handleSubmit();
            } else if (event.key === 'Backspace') {
                this.message = this.message.substring(0, this.message.length - 1);
                this.updateText();
            } else if (event.key.length === 1) {  // Only handle single character keys
                this.message += event.key;
                this.updateText();
            }
        });
        // this.createCaretBlinking();
    }

    // NOTE: Turn this off when scene is changed?
    // createCaretBlinking() {
    //     this.caretVisible = this.inputFieldInFocus;
    //     this.caretBlink = this.scene.time.addEvent({
    //         delay: 500,  // Blink every 500ms
    //         callback: () => {
    //             if (this.inputFieldInFocus) {
    //                 this.caretVisible = !this.caretVisible;
    //                 this.updateText();
    //             } else {
    //                 this.caretVisible = false;
    //                 this.updateText();
    //             }
    //         },
    //         loop: true,
    //     });
    // }

    // Method to update the text and caret visibility
    updateText() {
        let displayText = this.inputFieldInFocus ? this.message + '|' : this.message || this.initialMessage // add cursor caret at the end
        // displayText = this.caretVisible ? displayText + '|' : displayText
        this.inputText.setText(displayText);
    }

    // Handle submit button click
    handleSubmit() {
        const message = this.message.trim();
        if (message) {
            this.chatController.addMessage({ sender: this.userName, message });
            this.message = '';  // Reset the message after sending
            this.updateText();
        }
    }
}


export class ChatBox extends ChatItem {
    constructor(scene, x, y, width, height) {
        super(scene, x, y, width, height)

        // Create a container to hold all elements (background, text, buttons)
        this.chatController = new ChatController()
        this.chatDisplay = new ChatDisplay(this.scene, x, y, width, height / 2, this.chatController)
        this.chatInput = new ChatInput(this.scene, x, y + height / 2, width, height / 2, this.chatController)

        // Background rectangle for the chat box, centered inside the container
        this.background = scene.add.rectangle(0, 0, width, height, 0x000000)
            .setOrigin(0, 0)
            .setAlpha(0.8);       // Background transparency
        this.container.add(this.background);

    }
}

