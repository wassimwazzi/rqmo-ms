export class ChatListener {
    constructor(onNewMessage) {
        this.onNewMessage = onNewMessage
    }

    newMessage(message) {
        this.onNewMessage(message)
    }
}

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
        super(scene, x, y, width, height);
        this.chatController = chatController;
        this.chatController.addListener(this);
        this.currentMessageIndex = -1;
        this.typingTimer = undefined;  // Ensure the typingTimer is initialized

        this.background.setFillStyle(0x000000, 0.5);
        this.textObject = scene.add.text(width / 2, 10, '', {
            fontSize: '14px',
            fill: '#ffffff',
            wordWrap: { width: width - 20 }
        })
        .setOrigin(0.5, 0)
        .setInteractive();
        this.container.add(this.textObject);

        this.createScrollButtons();
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
        const CHARACTERS_PER_SECOND = 30;
        const { sender, message } = this.chatController.getMessage(this.currentMessageIndex);
        let displayedMessage = `[${sender}]: ${message}`;
        let index = 0;

        // Ensure the previous typing timer is destroyed before creating a new one
        if (this.typingTimer) {
            this.typingTimer.remove(false);  // Safely stop the previous timer if it exists
        }

        this.typingTimer = this.scene.time.addEvent({
            delay: 1000 / CHARACTERS_PER_SECOND,
            callback: () => {
                if (this.textObject) {  // Ensure the textObject exists
                    this.textObject.setText(displayedMessage.substring(0, index + 1));
                    index++;
                }

                // If all characters are displayed, stop the timer
                if (index === displayedMessage.length) {
                    if (this.typingTimer) {
                        this.typingTimer.remove();  // Safely remove the timer
                        this.typingTimer = undefined;
                    }
                }
            },
            loop: true,
        });
    }

    scrollUp() {
        this.currentMessageIndex -= 1;
        this.showMessage();
        this.setButtonVisibilities();
    }

    scrollDown() {
        this.currentMessageIndex += 1;
        this.showMessage();
        this.setButtonVisibilities();
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
        this.currentMessageIndex += 1;
        this.showMessage();
        this.setButtonVisibilities();
    }
}


export class ChatInput extends ChatItem {
    constructor(scene, x, y, width, height, chatController, userName = 'Player', enabled = true) {
        super(scene, x, y, width, height);
        this.chatController = chatController;
        this.userName = userName;
        this.message = '';
        this.inputFieldInFocus = enabled;
        this.enabled = enabled

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

        this.addSubmitListeners();
    }

    addSubmitListeners() {
        this.submitButton.on('pointerdown', () => this.handleSubmit());
        this.scene.input.keyboard.on('keydown', (event) => {
            if (event.key === 'Enter') {
                this.handleSubmit();
            }
        })
    }

    createInputField() {
        // method to create the input field
        throw { name: "NotImplementedError", message: "createInputField must be implemented by subclass" };
    }

    updateText() {
        // method to update the displayed text in input
        // called after submit
        throw { name: "NotImplementedError", message: "updateText must be implemented by subclass" };

    }

    toggleEnabled() {
        this.enabled = !this.enabled
    }

    isEnabled() {
        return this.enabled
    }

    // Handle submit button click
    handleSubmit() {
        if (!this.enabled) return;
        const message = this.message.trim();
        if (message) {
            this.chatController.addMessage({ sender: this.userName, message });
            this.message = '';  // Reset the message after sending
            this.updateText();
        }
    }
}

export class ChattextInput extends ChatInput {
    constructor(scene, x, y, width, height, chatController, userName = 'Player', enabled = true) {
        super(scene, x, y, width, height, chatController, userName, enabled);
        this.initialMessage = 'Enter your message...';
        this.caretVisible = true;
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

            if (event.key === 'Backspace') {
                this.message = this.message.substring(0, this.message.length - 1);
                this.updateText();
            } else if (event.key.length === 1) {  // Only handle single character keys
                this.message += event.key;
                this.updateText();
            }
        });
    }

    // Method to update the text and caret visibility
    updateText() {
        let displayText = this.inputFieldInFocus ? this.message + '|' : this.message || this.initialMessage // add cursor caret at the end
        // displayText = this.caretVisible ? displayText + '|' : displayText
        this.inputText.setText(displayText);
    }
}

export class ChatDropdownInput extends ChatInput {
    constructor(scene, x, y, width, height, chatController, userName = 'Player', enabled = false) {
        super(scene, x, y, width, height, chatController, userName, enabled);
        this.selectedOptionIndex = -1;
        this.optionsVisible = false; // Track whether dropdown is open
        this.initialMessage = 'Click here to select an option';
        this.noOptionsMessage = 'There are no available options'
        this.visibleOptions = 3; // Number of options to show at a time
        this.currentStartIndex = 0; // Track the starting index for visible options
        this.scrollEventCounter = 0; // Count scroll events
        this.scrollTriggerCount = 5; // Number of scroll events needed to trigger scroll. Increase to slow down scroll speed

        // Dropdown options and container
        this.dropdownText = scene.add.text(10, height / 2, `Select: ${this.initialMessage}`, {
            fontSize: '16px',
            fill: '#000000',
            wordWrap: { width: width - 20 }
        }).setOrigin(0, 0.5).setInteractive();
        this.container.add(this.dropdownText);

        this.optionsContainer = scene.add.container(0, 0);
        this.container.add(this.optionsContainer);

        this.scene.input.on('pointerdown', (pointer) => {
            if (this.background.getBounds().contains(pointer.x, pointer.y)) {
                this.toggleDropdown()
            } else {
                this.hideDropdownOptions();
            }
        });

        // Add mouse wheel scroll support
        this.scene.input.on('wheel', (pointer, gameObjects, deltaX, deltaY) => {
            if (this.optionsVisible) this.handleScroll(deltaY);
        });

        window.addEventListener('keydown', (e) => {
            if (e.key == 'keydown-DOWN' && e.target == document.body && this.inputFieldInFocus) {
                e.preventDefault();
            }
        });

        window.addEventListener('keydown', (e) => {
            e.preventDefault()
            if ((e.key == 'ArrowUp' || e.key == 'ArrowDown') && e.target == document.body && this.inputFieldInFocus) {
                e.preventDefault();
            } else {
                return
            }
            if (e.key == 'ArrowUp' && this.optionsVisible) {
                this.scrollUp();
            }
            if (e.key == 'ArrowDown' && this.optionsVisible) {
                this.scrollDown();
            }
        });
    }

    toggleDropdown() {
        if (this.optionsVisible) {
            this.hideDropdownOptions();
        } else {
            this.showDropdownOptions();
        }
    }

    showDropdownOptions() {
        if (!this.options || !this.options.length) {
            this.message = this.noOptionsMessage;
            this.updateText();
            return;
        }

        this.optionsContainer.removeAll(true); // Clear any existing options
        this.updateVisibleOptions();
        this.optionsVisible = true;
    }

    hideDropdownOptions() {
        this.optionsContainer.removeAll(true); // Clear options when hiding the dropdown
        this.optionsVisible = false;
    }

    handleScroll(deltaY) {
        // Increment the scroll event counter
        this.scrollEventCounter++;

        // Check if the counter has reached the trigger count
        if (this.scrollEventCounter >= this.scrollTriggerCount) {
            if (deltaY > 0) {
                this.scrollDown(); // Scroll down
            } else {
                this.scrollUp(); // Scroll up
            }
            this.scrollEventCounter = 0; // Reset the counter after scrolling
        }
    }

    scrollDown() {
        if (this.currentStartIndex + this.visibleOptions < this.options.length) {
            this.currentStartIndex++; // Scroll down
            this.updateVisibleOptions(); // Update the visible options
        }
    }

    scrollUp() {
        if (this.currentStartIndex > 0) {
            this.currentStartIndex--; // Scroll up
            this.updateVisibleOptions(); // Update the visible options
        }
    }

    updateVisibleOptions() {
        this.optionsContainer.removeAll(true); // Clear any existing options

        for (let i = 0; i < this.visibleOptions; i++) {
            const optionIndex = this.currentStartIndex + i;
            if (optionIndex < this.options.length) {
                const optionText = this.scene.add.text(0, i * 30, this.options[optionIndex], {
                    fontSize: '14px',
                    fill: '#000000',
                    backgroundColor: '#f0f0f0',
                    padding: { x: 5, y: 5 },
                    fixedWidth: this.width - 20
                }).setInteractive();

                optionText.on('pointerdown', () => {
                    this.selectedOptionIndex = optionIndex;
                    this.message = this.options[this.selectedOptionIndex];
                    this.updateText();
                    this.hideDropdownOptions();
                    this.enabled = true; // Enable input after selection
                });

                this.optionsContainer.add(optionText);
            }
        }
    }

    setOptions(options) {
        this.options = options;
        this.selectedOptionIndex = -1;
        this.message = this.initialMessage;
        this.enabled = false;
        this.currentStartIndex = 0; // Reset to the first option
        this.scrollEventCounter = 0; // Reset scroll event counter
        this.hideDropdownOptions(); // Ensure dropdown is hidden initially
    }

    updateText() {
        const displayText = this.message ? this.message : this.initialMessage
        this.dropdownText.setText(`Select: ${displayText}`);
    }
}

export class ChatBox extends ChatItem {
    constructor(scene, x, y, width, height, ChatInputType) {
        super(scene, x, y, width, height)

        // Create a container to hold all elements (background, text, buttons)
        this.chatController = new ChatController()
        this.chatDisplay = new ChatDisplay(this.scene, x, y, width, height / 2, this.chatController)
        this.chatInput = new ChatInputType(this.scene, x, y + height / 2, width, height / 2, this.chatController)

        // Background rectangle for the chat box, centered inside the container
        this.background = scene.add.rectangle(0, 0, width, height, 0x000000)
            .setOrigin(0, 0)
            .setAlpha(0.8);       // Background transparency
        this.container.add(this.background);

    }
}

