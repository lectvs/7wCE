/// <reference path="gameElement.ts" />

class WonderBoardForChoose extends GameElement {

    private scene: ChooseWonderScene;
    private wonder: API.Wonder;
    private side: number;
    private player: string;

    wonderResource: WonderResource;
    selection: HTMLCanvasElement;

    constructor(scene: ChooseWonderScene, wonder: API.Wonder, side: number, player: string) {
        super();

        this.scene = scene;
        this.wonder = wonder;
        this.side = side;
        this.player = player;
        this.create();
    }

    create() {
        this.wonderResource = Resources.getWonder(this.wonder.name, this.wonder.side);

        let boardDiv = this.div.appendChild(document.createElement('div'));
        boardDiv.appendChild(this.wonderResource.board);

        // Starting effects popup
        let popupDiv = this.div.appendChild(document.createElement('div'));
        popupDiv.style.position = 'absolute';
        popupDiv.style.left = `${-C.WONDER_BOARD_WIDTH/2 + this.wonderResource.startingEffectsRect.left}px`;
        popupDiv.style.top = `${-C.WONDER_BOARD_HEIGHT/2 + this.wonderResource.startingEffectsRect.top}px`;
        popupDiv.style.width = `${this.wonderResource.startingEffectsRect.width}px`;
        popupDiv.style.height = `${this.wonderResource.startingEffectsRect.height}px`;

        popupDiv.onmousemove = () => {
            if (Main.scene.isCurrentlyDragging()) {
                Main.scene.stopPopup(this.wonder);
                return;
            }
            Main.scene.updatePopup(this.wonder, this.x - C.WONDER_BOARD_WIDTH/2 + this.wonderResource.startingEffectsRect.left,
                                                this.y - C.WONDER_BOARD_HEIGHT/2 + this.wonderResource.startingEffectsRect.top + this.wonderResource.startingEffectsRect.height);
        };

        popupDiv.onmouseleave = () => {
            Main.scene.stopPopup(this.wonder);
        };

        // Stage popups
        for (let i = 0; i < this.wonder.stages.length; i++) {
            let stageX = this.wonderResource.stageXs[i];
            let wonderStage = this.wonder.stages[i];

            let popupDiv = this.div.appendChild(document.createElement('div'));
            popupDiv.style.position = 'absolute';
            popupDiv.style.left = `${-C.WONDER_BOARD_WIDTH/2 + stageX - C.WONDER_STAGE_WIDTH/2}px`;
            popupDiv.style.top = `${C.WONDER_BOARD_HEIGHT/2 - C.WONDER_STAGE_HEIGHT}px`;
            popupDiv.style.width = `${C.WONDER_STAGE_WIDTH}px`;
            popupDiv.style.height = `${C.WONDER_STAGE_HEIGHT}px`;

            popupDiv.onmousemove = () => {
                if (Main.scene.isCurrentlyDragging()) {
                    Main.scene.stopPopup(wonderStage);
                    return;
                }
                Main.scene.updatePopup(wonderStage, this.x - C.WONDER_BOARD_WIDTH/2 + stageX - C.WONDER_STAGE_WIDTH/2, this.y + C.WONDER_BOARD_HEIGHT/2);
            };
    
            popupDiv.onmouseleave = () => {
                Main.scene.stopPopup(wonderStage);
            };
        }

        // Selection
        if (this.player === Main.player) {
            this.selection = this.drawSelection();
            this.selection.style.visibility = 'hidden';
            this.div.appendChild(this.selection);

            this.div.style.cursor = 'pointer';
            this.div.onclick = (event: MouseEvent) => {
                if (event.button !== 0) return;
                Main.chooseSide(this.side);
                this.scene.selectSide(this.side);
            };
        }

        this.zIndex = C.Z_INDEX_WONDER;
    }

    destroy() {
        while (this.div.firstChild) {
            this.div.removeChild(this.div.firstChild);
        }
        Resources.returnWonder(this.wonder.name, this.wonder.side, this.wonderResource);
        this.wonderResource = null;
    }
    
    select() {
        this.selection.style.visibility = 'visible';
    }

    deselect() {
        this.selection.style.visibility = 'hidden';
    }

    private drawSelection() {
        let graphics = new PIXI.Graphics();
        graphics.beginFill(ArtCommon.selectionColor, 1);
        graphics.drawRoundedRect(0, 0, C.WONDER_BOARD_WIDTH, C.WONDER_BOARD_HEIGHT, C.WONDER_BOARD_CORNER_RADIUS);
        graphics.endFill();
        graphics.beginHole();
        graphics.drawRoundedRect(C.WONDER_BOARD_BORDER, C.WONDER_BOARD_BORDER,
                                 C.WONDER_BOARD_WIDTH - 2*C.WONDER_BOARD_BORDER, C.WONDER_BOARD_HEIGHT - 2*C.WONDER_BOARD_BORDER,
                                 C.WONDER_BOARD_CORNER_RADIUS - C.WONDER_BOARD_BORDER);
        graphics.endHole();
        return render(graphics, C.WONDER_BOARD_WIDTH, C.WONDER_BOARD_HEIGHT);
    }
}