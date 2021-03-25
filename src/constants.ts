class C {
    public static readonly Z_INDEX_DISCARD_PILE = -10;
    public static readonly Z_INDEX_DISCARD_CARDS = -9;
    public static readonly Z_INDEX_CARD_HAND = 0;
    public static readonly Z_INDEX_CARD_WONDER = 9;
    public static readonly Z_INDEX_WONDER = 10;
    public static readonly Z_INDEX_CARD_PLAYED = 11;
    public static readonly Z_INDEX_CARD_MOVING = 12;
    public static readonly Z_INDEX_CARD_DRAGGING = 100;
    public static readonly Z_INDEX_MILITARY_OVERLAY = 101;
    public static readonly Z_INDEX_MILITARY_TOKEN = 102;
    public static readonly Z_INDEX_PAYMENT_DIALOG = 1000;

    public static readonly ANIMATION_TURN_REVEAL_TIME = 1;
    public static readonly ANIMATION_TURN_PLAY_TIME = 1;
    public static readonly ANIMATION_MILITARY_FADE_TIME = 0.5;
    public static readonly ANIMATION_MILITARY_WAIT_TIME = 1;
    public static readonly ANIMATION_TOKEN_DISTRIBUTE_TIME = 1;

    public static readonly ERROR_BG_COLOR = '#FF0000';
    public static readonly OK_BG_COLOR = '#FFFFFF';
    public static readonly ERROR_TEXT_COLOR = '#FFFFFF';
    public static readonly OK_TEXT_COLOR = '#000000';

    public static readonly ACTION_BUTTON_Y = 360;
    public static readonly ACTION_BUTTON_WIDTH = 100;
    public static readonly ACTION_BUTTON_HEIGHT = 50;
    public static readonly ACTION_BUTTON_CORNER_RADIUS = 8;

    public static readonly CARD_WIDTH = 133;
    public static readonly CARD_HEIGHT = 200;
    public static readonly CARD_CORNER_RADIUS = 12;
    public static readonly CARD_BORDER = 4;
    public static readonly CARD_TITLE_HEIGHT = 12;
    public static readonly CARD_TITLE_Y = 5;
    public static readonly CARD_TITLE_SCALE = 0.12;
    public static readonly CARD_TITLE_COLOR = 0xFFFFFF;
    public static readonly CARD_BANNER_HEIGHT = 56;
    public static readonly CARD_EFFECT_SCALE = 0.32;
    public static readonly CARD_EFFECT_CLIP_PADDING = 6;
    public static readonly CARD_EFFECT_HEIGHT = 32;
    public static readonly CARD_COST_X = 16.5;
    public static readonly CARD_COST_Y = C.CARD_TITLE_HEIGHT + C.CARD_BANNER_HEIGHT;
    public static readonly CARD_COST_SCALE = 0.174;
    public static readonly CARD_COST_PADDING = 8;
    public static readonly CARD_PAYMENT_HEIGHT = 32;
    public static readonly CARD_PAYMENT_SCALE = 0.2;
    public static readonly CARD_PAYMENT_OFFSET_X = -11;
    public static readonly CARD_DISCARD_COUNT_TEXT_SIZE = 48;
    public static readonly CARD_CENTER_OFFSET_Y = 60;

    public static readonly HAND_Y = 150;
    public static readonly HAND_LAST_DX = 400;
    public static readonly HAND_CARD_DX = 137;
    public static readonly HAND_FLANK_DX = 845;
    public static readonly HAND_FLANK_DY = -130;
    public static readonly HAND_FLANK_SCALE = 0.5;
    public static readonly HAND_FLANK_MOVED_DX = 70;

    public static readonly WONDER_START_Y = 650;
    public static readonly WONDER_DX = 500;
    public static readonly WONDER_DY = 500;
    public static readonly WONDER_BOARD_WIDTH = 600;
    public static readonly WONDER_BOARD_HEIGHT = 300;
    public static readonly WONDER_BOARD_CORNER_RADIUS = 30;
    public static readonly WONDER_BOARD_BORDER = 4;
    public static readonly WONDER_STARTING_EFFECTS_SCALE = 0.32;
    public static readonly WONDER_STARTING_EFFECTS_PADDING = 8;
    public static readonly WONDER_STAGE_MIDDLE_2 = 396;
    public static readonly WONDER_STAGE_MIDDLE_134 = 300;
    public static readonly WONDER_STAGE_DX_4 = 147;
    public static readonly WONDER_STAGE_DX_123 = 192;
    public static readonly WONDER_STAGE_WIDTH = 144;
    public static readonly WONDER_STAGE_HEIGHT = 63;
    public static readonly WONDER_STAGE_CORNER_RADIUS = 18;
    public static readonly WONDER_STAGE_EFFECT_SCALE = 0.29;
    public static readonly WONDER_STAGE_COST_OFFSET_X = 10;
    public static readonly WONDER_STAGE_COST_OFFSET_Y = 60;
    public static readonly WONDER_STAGE_COST_PADDING = 6;
    public static readonly WONDER_STAGE_COST_BORDER = 3;
    public static readonly WONDER_STAGE_COST_SCALE = 0.12;
    public static readonly WONDER_STAGE_PAYMENT_OFFSET_X = -10;
    public static readonly WONDER_STAGE_PAYMENT_OFFSET_Y = -13;
    public static readonly WONDER_STAGE_PAYMENT_SCALE = 0.15;
    public static readonly WONDER_BUILT_STAGE_OFFSET_Y = -130;
    public static readonly WONDER_RESOURCE_ROLL_OFFSET_Y = 30;
    public static readonly WONDER_RED_ROLL_X = -200;
    public static readonly WONDER_RED_ROLL_Y = C.WONDER_BOARD_BORDER + 22;
    public static readonly WONDER_RED_ROLL_MAX_X = 150;
    public static readonly WONDER_YELLOW_ROLL_Y = -24;
    public static readonly WONDER_PURPLE_ROLL_Y = 24;
    public static readonly WONDER_BLUE_ROLL_Y = -24;
    public static readonly WONDER_GREEN_ROLL_Y = 24;
    public static readonly WONDER_OVERFLOW_ROLL_START_Y = -288;
    public static readonly WONDER_OVERFLOW_ROLL_DY = -54;
    public static readonly WONDER_SIDEBAR_WIDTH = 600;
    public static readonly WONDER_SIDEBAR_NAME_X = -18;
    public static readonly WONDER_SIDEBAR_NAME_Y = 25;
    public static readonly WONDER_SIDEBAR_NAME_SIZE = 20;
    public static readonly WONDER_SIDEBAR_GOLD_COIN_SCALE = 0.2;
    public static readonly WONDER_SIDEBAR_GOLD_COIN_X = -28;
    public static readonly WONDER_SIDEBAR_GOLD_COIN_Y = 55;
    public static readonly WONDER_SIDEBAR_GOLD_TEXT_X = -43;
    public static readonly WONDER_SIDEBAR_GOLD_TEXT_Y = 55;
    public static readonly WONDER_SIDEBAR_GOLD_TEXT_SIZE = 20;
    public static readonly WONDER_SIDEBAR_POINTS_WREATH_SCALE = 0.2;
    public static readonly WONDER_SIDEBAR_POINTS_WREATH_X = -88;
    public static readonly WONDER_SIDEBAR_POINTS_WREATH_Y = 55;
    public static readonly WONDER_SIDEBAR_POINTS_TEXT_X = -103;
    public static readonly WONDER_SIDEBAR_POINTS_TEXT_Y = 55;
    public static readonly WONDER_SIDEBAR_POINTS_TEXT_SIZE = 20;
    public static readonly WONDER_SIDEBAR_CHECKMARK_SCALE = 0.2;
    public static readonly WONDER_SIDEBAR_CHECKMARK_X = -145;
    public static readonly WONDER_SIDEBAR_CHECKMARK_Y = 52;
    public static readonly WONDER_SIDEBAR_TOKENS_X = -28;
    public static readonly WONDER_SIDEBAR_TOKENS_DX = -24;
    public static readonly WONDER_SIDEBAR_TOKENS_Y = 85;

    public static readonly WONDER_OVERLAY_COLOR_NEUTRAL = 0xFFFFFF;
    public static readonly WONDER_OVERLAY_COLOR_VICTORY = 0x80FF80;
    public static readonly WONDER_OVERLAY_COLOR_DEFEAT = 0xFF8080;
    public static readonly WONDER_OVERLAY_ALPHA = 0.7;
    public static readonly WONDER_OVERLAY_TEXT_SIZE = 100;
    public static readonly WONDER_OVERLAY_TEXT_COLOR = '#FF0000';

    public static readonly TOKEN_SCALE = 0.2;

    public static readonly DISCARD_PILE_AREA_WIDTH = 250;
    public static readonly DISCARD_PILE_AREA_HEIGHT = 300;
    public static readonly DISCARD_PILE_AREA_CORNER_RADIUS = 10;
    public static readonly DISCARD_PILE_AREA_BORDER = 4;
    public static readonly DISCARD_PILE_TITLE_Y = 25;
    public static readonly DISCARD_PILE_TITLE_SCALE = 0.25;
    public static readonly DISCARD_PILE_TITLE_TEXT = "Discard";

    public static readonly PAYMENT_DIALOG_OFFSET_X = -600;
    public static readonly PAYMENT_DIALOG_OFFSET_Y = -100;
    public static readonly PAYMENT_DIALOG_WIDTH = 500;
    public static readonly PAYMENT_DIALOG_EXTRA_HEIGHT = 80;
    public static readonly PAYMENT_DIALOG_CORNER_RADIUS = 10;
    public static readonly PAYMENT_DIALOG_COLOR = '#FFFFFF';
    public static readonly PAYMENT_DIALOG_TITLE = "Payment";
    public static readonly PAYMENT_DIALOG_TITLE_SIZE = 24;
    public static readonly PAYMENT_DIALOG_TITLE_PADDING = 16;
    public static readonly PAYMENT_DIALOG_PAYMENTS_MID_DIV_WIDTH_PERCENT = 20;
    public static readonly PAYMENT_DIALOG_PAYMENTS_DY = 50;
    public static readonly PAYMENT_DIALOG_PAYMENTS_TEXT_SIZE = 16;
    public static readonly PAYMENT_DIALOG_PAY_BUTTON_WIDTH = 48;
    public static readonly PAYMENT_DIALOG_PAY_BUTTON_HEIGHT = 32;
    public static readonly PAYMENT_DIALOG_PAY_BUTTON_COLOR = '#000088';

    public static readonly END_SCREEN_POSITIONS_Y = 50;
    public static readonly END_SCREEN_NAMES_Y = 80;
    public static readonly END_SCREEN_POINTS_Y = 130;
    public static readonly END_SCREEN_POINTS_DX = 150;
    public static readonly END_SCREEN_POINTS_DY = 50;
}