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
        let players = ["Dartm", "jamesn", "pittmang", "djbfox1115", "CuongManh", "TonyWu-", "LaterGator", "BOT1", "BOT2", "BOT3", "BOT4", "BOT5", "BOT6"];
        players.splice(players.indexOf(LobbyMain.username), 1);

        for (let i = 0; i < players.length; i++) {
            this.playersElement.appendChild(this.checkbox('player', players[i], players[i], 32, TOP_Y + DY*i, false));
        }

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
        element.className = 'createsectioncheckbox';
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;

        let input = document.createElement('input');
        input.id = `${type}_${label}`;
        input.setAttribute('data', data);
        input.className = 'createsectioncheckboxbox';
        input.type = 'checkbox';
        input.checked = checked;

        let labelE = document.createElement('label');
        labelE.setAttribute('for', `${type}_${label}`);
        labelE.className = 'createsectioncheckboxtext';
        labelE.innerText = label;

        element.appendChild(input);
        element.appendChild(labelE);

        return element;
    }
}