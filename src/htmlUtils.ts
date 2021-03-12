namespace HtmlUtils {
    export function cssStylePositionToPixels(xy: string, parent_wh: number) {
        if (xy.endsWith('px')) {
            return parseFloat(xy.substring(0, xy.length-2).trim());
        }

        if (xy.endsWith('%')) {
            return parseFloat(xy.substring(0, xy.length-1).trim())/100 * parent_wh;
        }

        if (xy.startsWith('calc')) {
            let inner = xy.substring(5, xy.length-1).trim();
            let innerPlus = inner.split('+');
            if (innerPlus.length === 2) {
                return cssStylePositionToPixels(innerPlus[0].trim(), parent_wh) + cssStylePositionToPixels(innerPlus[1].trim(), parent_wh);
            }
            let innerMinus = inner.split('-');
            if (innerMinus.length === 2) {
                return cssStylePositionToPixels(innerMinus[0].trim(), parent_wh) - cssStylePositionToPixels(innerMinus[1].trim(), parent_wh);
            }
        }

        return undefined;
    }
}