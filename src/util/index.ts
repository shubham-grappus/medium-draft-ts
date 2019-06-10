/**
 * Returns the `boundingClientRect` of the passed selection.
 */
export function getSelectionRect(selected: Selection): (ClientRect | null) {
    const _rect = selected.getRangeAt(0).getBoundingClientRect();

    let rect = _rect && _rect.top ? _rect : selected.getRangeAt(0).getClientRects()[0];
    if (!rect) {
        if (selected.anchorNode && (selected.anchorNode as Element).getBoundingClientRect) {
            rect = (selected.anchorNode as Element).getBoundingClientRect();
        } else {
            return null;
        }
    }

    return rect;
}

/**
 * Returns the native selection node.
 */
export function getSelection(root: Window): Selection {
    let t = null;
    if (root.getSelection) {
        t = root.getSelection();
    } else if (root.document.getSelection) {
        t = root.document.getSelection();
    }

    return t;
}

/**
 * Recursively finds the DOM Element of the block where the cursor is currently present.
 * If not found, returns null.
 */
export function getSelectedBlockNode(root: Window): HTMLElement | null {
    const selection = root.getSelection();
    if (selection.rangeCount === 0) {
        return null;
    }
    let node = selection.getRangeAt(0).startContainer;

    do {
        if ((node as Element).getAttribute && (node as Element).getAttribute('data-block') === 'true') {
            return (node as HTMLElement);
        }
        node = node.parentNode;

    } while (node !== null);

    return null;
}
