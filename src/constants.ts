class C {
    public static readonly Z_INDEX_DISCARD_PILE = -10;
    public static readonly Z_INDEX_DISCARD_CARDS = -9;
    public static readonly Z_INDEX_CARD_HAND = 0;
    public static readonly Z_INDEX_CARD_FLANK = 0;
    public static readonly Z_INDEX_CARD_WONDER = 9;
    public static readonly Z_INDEX_WONDER = 10;
    public static readonly Z_INDEX_CARD_PLAYED = 11;
    public static readonly Z_INDEX_CARD_MOVING = 12;
    public static readonly Z_INDEX_CARD_DRAGGING = 100;
    public static readonly Z_INDEX_MILITARY_OVERLAY = 101;
    public static readonly Z_INDEX_MILITARY_TOKEN = 102;
    public static readonly Z_INDEX_GOLD_COIN = 102;
    public static readonly Z_INDEX_PAYMENT_DIALOG = 1000;
    public static readonly Z_INDEX_CARD_POPUP = 1001;

    public static readonly GAME_HEIGHT_PADDING_3P = 400;
    public static readonly GAME_HEIGHT_PADDING_4567P = 200;

    public static readonly ANIMATION_TURN_REVEAL_TIME = 1;
    public static readonly ANIMATION_TURN_PLAY_TIME = 1;
    public static readonly ANIMATION_MILITARY_FADE_TIME = 0.5;
    public static readonly ANIMATION_MILITARY_WAIT_TIME = 1;
    public static readonly ANIMATION_TOKEN_DISTRIBUTE_TIME = 1;
    public static readonly ANIMATION_GOLD_COIN_MOVE_TIME = 1;

    public static readonly ERROR_BG_COLOR = '#FF0000';
    public static readonly OK_BG_COLOR = '#FFFFFF';
    public static readonly ERROR_TEXT_COLOR = '#FFFFFF';
    public static readonly OK_TEXT_COLOR = '#000000';

    public static readonly ACTION_BUTTON_Y = 220;
    public static readonly ACTION_BUTTON_WIDTH = 100;
    public static readonly ACTION_BUTTON_HEIGHT = 40;
    public static readonly ACTION_BUTTON_CORNER_RADIUS = 8;

    public static readonly CARD_WIDTH = 100;
    public static readonly CARD_HEIGHT = 150;
    public static readonly CARD_CORNER_RADIUS = 8;
    public static readonly CARD_BORDER = 3;
    public static readonly CARD_TITLE_HEIGHT = 8;
    public static readonly CARD_TITLE_Y = 3.75;
    public static readonly CARD_TITLE_SCALE = 0.08;
    public static readonly CARD_TITLE_COLOR = 0xFFFFFF;
    public static readonly CARD_BANNER_HEIGHT = 42;
    public static readonly CARD_EFFECT_SCALE = 0.24;
    public static readonly CARD_EFFECT_CLIP_PADDING = 4.5;
    public static readonly CARD_EFFECT_HEIGHT = 24;
    public static readonly CARD_COST_X = 12.375;
    public static readonly CARD_COST_Y = C.CARD_TITLE_HEIGHT + C.CARD_BANNER_HEIGHT;
    public static readonly CARD_COST_SCALE = 0.13;
    public static readonly CARD_COST_PADDING = 6;
    public static readonly CARD_PAYMENT_HEIGHT = 24;
    public static readonly CARD_PAYMENT_SCALE = 0.15;
    public static readonly CARD_PAYMENT_OFFSET_X = -8.25;
    public static readonly CARD_DISCARD_COUNT_TEXT_SIZE = 36;
    public static readonly CARD_CENTER_OFFSET_Y = 45;

    public static readonly HAND_Y = 64;
    public static readonly HAND_CARD_DX = C.CARD_WIDTH + 3;
    public static readonly HAND_FLANK_DX = 40;
    public static readonly HAND_FLANK_DY = -100;
    public static readonly HAND_FLANK_SCALE = 0.5;

    public static readonly WONDER_TOP_Y = 440;
    public static readonly WONDER_OTHERS_Y = 500;
    public static readonly WONDER_OTHERS_Y_4P = 720;
    public static readonly WONDER_OTHERS_DX = 470;
    public static readonly WONDER_OTHERS_DY = 330;
    public static readonly WONDER_OTHERS_DX_LAST_7P = 270;
    public static readonly WONDER_LAST_Y_4P = 1040;
    public static readonly WONDER_LAST_Y_6P = 1120;
    public static readonly WONDER_BOARD_WIDTH = 450;
    public static readonly WONDER_BOARD_HEIGHT = 225;
    public static readonly WONDER_BOARD_CORNER_RADIUS = 22.5;
    public static readonly WONDER_BOARD_BORDER = 3;
    public static readonly WONDER_STARTING_EFFECTS_SCALE = 0.24;
    public static readonly WONDER_STARTING_EFFECTS_PADDING = 6;
    public static readonly WONDER_STAGE_MIDDLE_2 = 300;
    public static readonly WONDER_STAGE_MIDDLE_134 = 225;
    public static readonly WONDER_STAGE_DX_4 = 110;
    public static readonly WONDER_STAGE_DX_123 = 144;
    public static readonly WONDER_STAGE_WIDTH = 108;
    public static readonly WONDER_STAGE_HEIGHT = 48;
    public static readonly WONDER_STAGE_CORNER_RADIUS = 13.5;
    public static readonly WONDER_STAGE_EFFECT_SCALE = 0.21;
    public static readonly WONDER_STAGE_COST_OFFSET_X = 7.5;
    public static readonly WONDER_STAGE_COST_OFFSET_Y = 45;
    public static readonly WONDER_STAGE_COST_PADDING = 4.5;
    public static readonly WONDER_STAGE_COST_BORDER = 2.25;
    public static readonly WONDER_STAGE_COST_SCALE = 0.08;
    public static readonly WONDER_STAGE_PAYMENT_OFFSET_X = -7.5;
    public static readonly WONDER_STAGE_PAYMENT_OFFSET_Y = -22;
    public static readonly WONDER_STAGE_PAYMENT_SCALE = 0.12;
    public static readonly WONDER_BUILT_STAGE_OFFSET_Y = -100;
    public static readonly WONDER_PAYMENT_HEIGHT = 24;
    public static readonly WONDER_RESOURCE_ROLL_OFFSET_Y = 22.5;
    public static readonly WONDER_RED_ROLL_X = -150;
    public static readonly WONDER_RED_ROLL_Y = C.WONDER_BOARD_BORDER + C.CARD_EFFECT_CLIP_PADDING + C.CARD_EFFECT_HEIGHT/2;
    public static readonly WONDER_RED_ROLL_MAX_X = 110;
    public static readonly WONDER_YELLOW_ROLL_Y = -18;
    public static readonly WONDER_PURPLE_ROLL_Y = 18;
    public static readonly WONDER_BLUE_ROLL_Y = -18;
    public static readonly WONDER_GREEN_ROLL_Y = 18;
    public static readonly WONDER_OVERFLOW_ROLL_OFFSET_Y = C.WONDER_RESOURCE_ROLL_OFFSET_Y + 38;
    public static readonly WONDER_SIDEBAR_NAME_X = -13.5;
    public static readonly WONDER_SIDEBAR_NAME_Y = 18;
    public static readonly WONDER_SIDEBAR_NAME_SIZE = 15;
    public static readonly WONDER_SIDEBAR_GOLD_COIN_SCALE = 0.15;
    public static readonly WONDER_SIDEBAR_GOLD_COIN_X = -21;
    public static readonly WONDER_SIDEBAR_GOLD_COIN_Y = 42;
    public static readonly WONDER_SIDEBAR_GOLD_TEXT_X = -33;
    public static readonly WONDER_SIDEBAR_GOLD_TEXT_Y = 42;
    public static readonly WONDER_SIDEBAR_GOLD_TEXT_SIZE = 15;
    public static readonly WONDER_SIDEBAR_POINTS_WREATH_SCALE = 0.15;
    public static readonly WONDER_SIDEBAR_POINTS_WREATH_X = -66;
    public static readonly WONDER_SIDEBAR_POINTS_WREATH_Y = 42;
    public static readonly WONDER_SIDEBAR_POINTS_TEXT_X = -78;
    public static readonly WONDER_SIDEBAR_POINTS_TEXT_Y = 42;
    public static readonly WONDER_SIDEBAR_POINTS_TEXT_SIZE = 15;
    public static readonly WONDER_SIDEBAR_CHECKMARK_SCALE = 0.15;
    public static readonly WONDER_SIDEBAR_CHECKMARK_X = -108;
    public static readonly WONDER_SIDEBAR_CHECKMARK_Y = 39;
    public static readonly WONDER_SIDEBAR_TOKENS_X = -21;
    public static readonly WONDER_SIDEBAR_TOKENS_DX = -18;
    public static readonly WONDER_SIDEBAR_TOKENS_Y = 63;

    public static readonly WONDER_SIDE_CHOICE_DY = C.WONDER_BOARD_HEIGHT + 10;
    public static readonly WONDER_SIDE_CHOICE_TOP_ADJUST_DY = -C.WONDER_SIDE_CHOICE_DY;
    public static readonly WONDER_SIDE_CHOICE_GROUP_ADJUST_DY = -50;

    public static readonly WONDER_OVERLAY_COLOR_NEUTRAL = 0xFFFFFF;
    public static readonly WONDER_OVERLAY_COLOR_VICTORY = 0x80FF80;
    public static readonly WONDER_OVERLAY_COLOR_DEFEAT = 0xFF8080;
    public static readonly WONDER_OVERLAY_ALPHA = 0.7;
    public static readonly WONDER_OVERLAY_SHIELD_X = -57;
    public static readonly WONDER_OVERLAY_SHIELD_SCALE = 0.75;
    public static readonly WONDER_OVERLAY_TEXT_SIZE = 75;
    public static readonly WONDER_OVERLAY_TEXT_COLOR = '#FF0000';

    public static readonly CARD_INFO_TEXT_COLOR = '#000000';
    public static readonly CARD_INFO_TEXT_SIZE = 12;
    public static readonly CARD_INFO_EFFECT_DESCRIPTION_SIZE = 10;

    public static readonly TOKEN_SCALE = 0.15;
    public static readonly GOLD_COIN_SCALE = 0.225;

    public static readonly DISCARD_PILE_X = 0;
    public static readonly DISCARD_PILE_Y = 720;
    public static readonly DISCARD_PILE_AREA_WIDTH = 200;
    public static readonly DISCARD_PILE_AREA_HEIGHT = 240;
    public static readonly DISCARD_PILE_AREA_CORNER_RADIUS = 8;
    public static readonly DISCARD_PILE_AREA_BORDER = 3;
    public static readonly DISCARD_PILE_TITLE_Y = 20;
    public static readonly DISCARD_PILE_TITLE_SCALE = 0.2;
    public static readonly DISCARD_PILE_TITLE_TEXT = "Discard";

    public static readonly PAYMENT_DIALOG_OFFSET_X = -512;
    public static readonly PAYMENT_DIALOG_OFFSET_Y = -330;
    public static readonly PAYMENT_DIALOG_WIDTH = 375;
    public static readonly PAYMENT_DIALOG_EXTRA_HEIGHT = 60;
    public static readonly PAYMENT_DIALOG_CORNER_RADIUS = 8;
    public static readonly PAYMENT_DIALOG_COLOR = '#FFFFFF';
    public static readonly PAYMENT_DIALOG_TITLE = "Payment";
    public static readonly PAYMENT_DIALOG_TITLE_SIZE = 18;
    public static readonly PAYMENT_DIALOG_TITLE_PADDING = 12;
    public static readonly PAYMENT_DIALOG_PAYMENTS_MID_DIV_WIDTH_PERCENT = 20;
    public static readonly PAYMENT_DIALOG_PAYMENTS_DY = 37.5;
    public static readonly PAYMENT_DIALOG_PAYMENTS_TEXT_SIZE = 12;
    public static readonly PAYMENT_DIALOG_PAY_BUTTON_WIDTH = 36;
    public static readonly PAYMENT_DIALOG_PAY_BUTTON_HEIGHT = 24;
    public static readonly PAYMENT_DIALOG_PAY_BUTTON_COLOR = '#000088';
    public static readonly PAYMENT_DIALOG_CLOSE_BUTTON_OFFSET_X = 15;
    public static readonly PAYMENT_DIALOG_CLOSE_BUTTON_OFFSET_Y = 15;
    public static readonly PAYMENT_DIALOG_CLOSE_BUTTON_COLOR = 0x000000;
    public static readonly PAYMENT_DIALOG_CLOSE_BUTTON_SCALE = 0.15;

    public static readonly END_SCREEN_PLACEMENTS_Y = 50;
    public static readonly END_SCREEN_NAMES_Y = 80;
    public static readonly END_SCREEN_POINTS_Y = 130;
    public static readonly END_SCREEN_POINTS_DX = 110;
    public static readonly END_SCREEN_POINTS_DY = 37.5;
    public static readonly END_SCREEN_SYMBOL_SIZE = 24;
    public static readonly END_SCREEN_TEXT_SIZE = 18;
    public static readonly END_SCREEN_TEXT_COLOR = '#FFFFFF';

    public static readonly CARD_LIST_HEADER_TEXT_SIZE = 24;
    public static readonly CARD_LIST_HEADER_TEXT_COLOR = '#FFFFFF';
    public static readonly CARD_LIST_CARD_WIDTH = 96;
    public static readonly CARD_LIST_CARD_HEIGHT = 40;
    public static readonly CARD_LIST_EFFECT_SCALE = 0.24;
    public static readonly CARD_LIST_CARD_DX = 400;
    public static readonly CARD_LIST_CARD_DY = C.CARD_LIST_CARD_HEIGHT;

    public static readonly SORT_CMP_RESOURCES = (card1: Card, card2: Card) => {
        if (card1.apiCard.color === 'brown' && card2.apiCard.color === 'grey') return -1;
        if (card1.apiCard.color === 'grey' && card2.apiCard.color === 'brown') return 1;
        return 0;
    }

    public static readonly SORT_CMP_SCIENCE = (card1: Card, card2: Card) => {
        let symbol1 = API.getScienceSymbol(card1.apiCard);
        let symbol2 = API.getScienceSymbol(card2.apiCard);
        if (symbol1 === symbol2) return 0;
        if (symbol1 === 'compass') return -1;
        if (symbol2 === 'compass') return 1;
        if (symbol1 === 'gear') return -1;
        if (symbol2 === 'gear') return 1;
        return 0;
    }
}