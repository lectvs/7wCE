class CreateGameSection {
    private playersElement: HTMLElement;
    private optionsElement: HTMLElement;

    constructor() {

    }

    create() {
        let TOP_Y = 80;
        let DY = 32;

        this.playersElement = document.getElementById('createsectionplayers');
        this.optionsElement = document.getElementById('createsectionoptions');

        // Players
        let players = LobbyMain.user.friends;

        for (let i = 0; i < players.length; i++) {
            this.playersElement.appendChild(this.checkbox('player', players[i], players[i], 32, TOP_Y + DY*i, false));
        }

        this.playersElement.appendChild(this.botbox(32, TOP_Y + DY*players.length));

        // Options
        this.optionsElement.appendChild(this.checkbox('option', 'Use wonder preferences', 'respect_preferences', 32, TOP_Y, true));
    }

    getOptions() {
        let players: string[] = [LobbyMain.username];
        let flags: string[] = [];

        document.querySelectorAll('input[id^=player_]').forEach(node => {
            let input = <HTMLInputElement>node;
            let player = input.getAttribute('data');
            if (input.checked) {
                players.push(player);
            }
        });

        let bots = <HTMLInputElement>document.querySelector('#bots');
        let numBots = parseInt(bots.value);
        for (let i = 1; i <= numBots; i++) {
            players.push(`BOT${i}`);
        }

        document.querySelectorAll('input[id^=option_]').forEach(node => {
            let input = <HTMLInputElement>node;
            let flag = input.getAttribute('data');
            if (input.checked) {
                flags.push(flag);
            }
        });

        return <API.CreateGameOptions>{
            players,
            flags
        };
    }

    private checkbox(type: 'player' | 'option', label: string, data: string, x: number, y: number, checked: boolean) {
        let element = document.createElement('div');
        element.className = 'createsectiondata';
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;

        let input = document.createElement('input');
        input.id = `${type}_${label}`;
        input.setAttribute('data', data);
        input.className = 'createsectioninput';
        input.type = 'checkbox';
        input.checked = checked;

        let labelE = document.createElement('label');
        labelE.setAttribute('for', `${type}_${label}`);
        labelE.className = 'createsectioninputtext';
        labelE.innerText = label;
        labelE.style.left = '20px';
        labelE.style.top = '-2px';

        element.appendChild(input);
        element.appendChild(labelE);

        return element;
    }

    private botbox(x: number, y: number) {
        let element = document.createElement('div');
        element.className = 'createsectiondata';
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;

        let input = document.createElement('input');
        input.id = 'bots';
        input.className = 'createsectiontextbox';
        input.type = 'text';
        input.value = '0';

        let labelE = document.createElement('label');
        labelE.setAttribute('for', 'bots');
        labelE.className = 'createsectioninputtext';
        labelE.innerText = 'Bots';
        labelE.style.left = '20px';
        labelE.style.top = '0px';

        element.appendChild(input);
        element.appendChild(labelE);

        return element;
    }
}