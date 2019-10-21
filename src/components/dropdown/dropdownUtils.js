function checkAlignment({ x, y, xEnd, yEnd }) {
    const alignment = {
        x: 'center',
        y: 'bottom'
    }

    if (x < 10) {
        alignment.x = 'left';
    } else if (xEnd > window.innerWidth - 10) {
        alignment.x = 'right';
    }

    if (yEnd > window.innerHeight - 10) {
        alignment.y = 'top';
    }

    return alignment;
}

function calcMiddlePointFromDom(elm) {
    const coords = elm.getBoundingClientRect();

    return {
        x: coords.left + elm.offsetWidth / 2,
        y: coords.top + elm.offsetHeight / 2
    };
}

function calcDefaultDropdownPosition(elm, middlePoint) {
    return calcPositionFromAlignment(elm, middlePoint, {
        x: 'center',
        y: 'bottom'
    });
}

function calcPositionFromAlignment(elm, refPoint, alignment) {
    const finalCoords = {};

    if (alignment.x === 'left') {
        finalCoords.x = refPoint.x - 5;
    } else if (alignment.x === 'right') {
        finalCoords.x = refPoint.x - elm.offsetWidth + 5;
    } else {
        finalCoords.x = refPoint.x - elm.offsetWidth / 2;
    }

    if (alignment.y === 'top') {
        finalCoords.y = refPoint.y - elm.offsetHeight - 15;
    } else {
        finalCoords.y = refPoint.y + 15;
    }

    finalCoords.xEnd = finalCoords.x + elm.offsetWidth;
    finalCoords.yEnd = finalCoords.y + elm.offsetHeight;

    return finalCoords;
}

function calcDropdownPosition(target, relativeElm) {
    const middlePoint = calcMiddlePointFromDom(relativeElm);
    const dropdownCoords = calcDefaultDropdownPosition(target, middlePoint);
    const alignment = checkAlignment(dropdownCoords);

    return calcPositionFromAlignment(target, middlePoint, alignment);
}

export {
    checkAlignment,
    calcMiddlePointFromDom,
    calcDefaultDropdownPosition,
    calcPositionFromAlignment,
    calcDropdownPosition
};