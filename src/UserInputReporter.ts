export interface UserInputReport {
    downKeys: DownKeys;
    message?: string;
    clicks: ClickReport[];
}

export interface DownKeys {
    [keyCode: number]: boolean;
}

export interface ClickReport {
    x: number;
    y: number;
}

export class UserInputReporter {
    canvas: HTMLCanvasElement;

    message: string;
    sendMessage: boolean;
    downKeys: DownKeys;
    clicks: ClickReport[];

    constructor() {
        this.message = "";
        this.downKeys = {};
    }

    adoptCanvas(canvas:HTMLCanvasElement) {
        if(this.canvas)
            this.releaseCanvas();

        this.canvas = canvas;
        canvas.tabIndex = 0;
        canvas.focus();
        canvas.addEventListener('keydown', this.handleKeyDown.bind(this));
        canvas.addEventListener('keyup', this.handleKeyUp.bind(this));
        canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
    }

    releaseCanvas() {
        this.canvas.removeEventListener('keydown', this.handleKeyDown);
        this.canvas.removeEventListener('keyup', this.handleKeyUp);
        this.canvas.removeEventListener('mousedown', this.handleMouseDown);
    }

    getReport():UserInputReport {
        let report = {
            downKeys:this.downKeys,
            clicks: this.clicks,
            message: this.sendMessage ? this.message : undefined,
        }
        this.clicks = [];
        if(this.sendMessage)
            this.message = '';
        this.sendMessage = false;

        return report;
    }

    handleKeyDown(e:KeyboardEvent) {
        // console.log(`handleKeyDown(${e.key})`)
        this.downKeys[e.keyCode] = true;

        if(!e.metaKey && !e.ctrlKey && !e.altKey) {
            // Add to the message
            if(/^[A-Za-z0-9 .,?!]$/.test(e.key))
                this.message += e.key;
            else if(e.key == 'Backspace')
                this.message = this.message.slice(0, -1)
            else if(e.keyCode == 13)
                this.sendMessage = true;
        }

        e.preventDefault();
    }
    handleKeyUp(e:KeyboardEvent) {
        // console.log(`## handleKeyUp(${e})`)
        this.downKeys[e.keyCode] = false;

        e.preventDefault();
    }
    handleMouseDown(e:MouseEvent) {
        // TODO: Apply camera transformation to the clicks.
        this.canvas.focus();
        this.clicks.push({x: e.clientX, y: e.clientY})

        // e.preventDefault();
    }
}