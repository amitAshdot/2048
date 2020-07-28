import React, { useEffect, useState } from 'react'
const Cell = (props) => {
    // const cell = useSelector(state => state.cell);
    const { cell } = props;
    let cellClass, styleIndex

    const [className, setClassName] = useState(null)
    const [styleName, setStyleName] = useState(null)
    useEffect(() => {
        if (cell.previousPosition)
            //NEED TO ADD REF TO STOP THE WARNING
            cellClass = cell ? `cell cell__position--${cell.previousPosition.x}-${cell.previousPosition.y}` :
                cell.isNew ? `cell cell__position--${cell.position.x}-${cell.position.y}` :
                    `cell cell__position--${cell.position.x}-${cell.position.y} empty`
        setClassName(cellClass)

        styleIndex = cell.previousPosition ? cell.previousPosition.x * 4 + cell.previousPosition.y :
            props.x * 4 + props.y

        setStyleName(styleIndex)  // check cell class values after render (OLD POSITION)
        return () => null

        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [props])

    const styleMap = {
        0: 'translate(0px, 0px)', 1: 'translate(12rem, 0px)', 2: 'translate(24rem, 0px)', 3: 'translate(36rem, 0px)',
        4: 'translate(0px, 12rem)', 5: 'translate(12rem, 12rem)', 6: 'translate(24rem, 12rem)', 7: 'translate(36rem, 12rem)',
        8: 'translate(0px, 24rem)', 9: 'translate(12rem, 24rem)', 10: 'translate(24rem, 24rem)', 11: 'translate(36rem, 24rem)',
        12: 'translate(0, 36rem)', 13: 'translate(12rem, 36rem)', 14: 'translate(24rem, 36rem)', 15: 'translate(36rem, 36rem)'
    }

    styleIndex = setTimeout(() => {//check index of the position (in styleMap object)
        setStyleName(cell.position.x * 4 + cell.position.y)
        return cell.position.x * 4 + cell.position.y
    }, 0);


    cellClass = setTimeout(() => { // check cell class values after render (NEW POSITION)
        let tempReturn = cell.value ? `cell__position--${cell.position.x}-${cell.position.y} value-${cell.value}` :
            `cell__position--${cell.position.x}-${cell.position.y} empty`
        setClassName(tempReturn)
        return tempReturn
    }, 0);

    const animationClass = () => {
        let temp = cell.isNew ? 'cell new' : cell.isMerge ? "cell merged" : "cell"
        temp += ` value-${cell.value}`

        return temp
    } //check if cell merged, new or normal
    return (
        <div className={className} style={{ transform: styleMap[styleName] }}>
            <div className={animationClass()}>
                <div className="cell__value">
                    {cell.value}
                </div>
            </div>
        </div>
    )
}

export default Cell
