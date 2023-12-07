class CreateGameSection {
    private playersElement: HTMLElement;
    private optionsElement: HTMLElement;

    constructor() {

    }

    create() {
        let TOP_Y = 60;

        this.playersElement = document.getElementById('createsectionplayers');
        this.optionsElement = document.getElementById('createsectionoptions');

        // Players
        let players = LobbyMain.user.friends;

        for (let i = 0; i < players.length; i++) {
            let preChecked = players[i] === 'Dartm' || players[i] === 'jamesn' || players[i] === 'pittmang';
            this.playersElement.appendChild(this.checkbox('player', players[i], players[i], 32, TOP_Y + 32*i, preChecked));
        }

        this.playersElement.appendChild(this.textbox('bots', 32, TOP_Y + 32*players.length));

        // Options
        this.optionsElement.appendChild(this.checkbox('option', 'Vanilla wonders', 'vanilla_wonders', 32, TOP_Y, false));
        this.optionsElement.appendChild(this.checkbox('option', 'Cities expansion', 'cities', 32, TOP_Y + 32, true));
        this.optionsElement.appendChild(this.checkbox('option', 'Use wonder preferences', 'respect_preferences', 32, TOP_Y + 64, true));
        this.optionsElement.appendChild(this.checkbox('option', 'Use elo for draft', 'draft_by_elo', 32, TOP_Y + 116, true))
            .style.visibility = 'hidden';
        this.optionsElement.appendChild(this.checkbox('option', 'Hide deck', 'hide_deck', 32, TOP_Y + 96, false));
        this.optionsElement.appendChild(this.textbox('extra_cards', 32, TOP_Y + 128));

        this.optionsElement.appendChild(this.checkbox('option', '7 Blunders', 'blunders', 32, TOP_Y + 230, false));
        this.optionsElement.appendChild(this.checkbox('option', 'Randomizer', 'randomizer', 32, TOP_Y + 262, false));

        if (window.location.href.includes('localhost')) {
            this.optionsElement.appendChild(this.checkbox('option', 'Test game', 'test', 32, TOP_Y + 310, true));
        }
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

        let extraCardsInput = <HTMLInputElement>document.querySelector('#extra_cards');
        let extraCards = parseInt(extraCardsInput.value);

        return <API.CreateGameOptions>{
            players,
            flags,
            extraCards,
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
        labelE.style.width = '400px';

        element.appendChild(input);
        element.appendChild(labelE);

        return element;
    }

    private textbox(type: 'bots' | 'extra_cards', x: number, y: number) {
        let element = document.createElement('div');
        element.className = 'createsectiondata';
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;

        let input = document.createElement('input');
        input.id = type;
        input.className = 'createsectiontextbox';
        input.type = 'text';
        input.value = '0';

        let labelE = document.createElement('label');
        labelE.setAttribute('for', type);
        labelE.className = 'createsectioninputtext';
        labelE.innerText = { 'bots': 'Bots', 'extra_cards': 'Extra cards in starting hand' }[type];
        labelE.style.left = '20px';
        labelE.style.top = '0px';
        labelE.style.width = '400px';

        element.appendChild(input);
        element.appendChild(labelE);

        return element;
    }
}