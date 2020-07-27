import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Cell from './cell/Cell'
import { build, resetBoard, setVector, move, createRandomCell } from '../store/board/actions';
import { CSSTransitionGroup } from 'react-transition-group' // ES6

import ScoreAndTime from './scoreAndTime/ScoreAndTime'
const Board = () => {
    const board = useSelector(state => state.boardReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(build())
        document.addEventListener("keydown", handleMove, false);

        return () => null
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!(board.vector.x === 0 && board.vector.y === 0))
            dispatch(move(board.board, board.vector))
        return () => {

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [board.vector])

    const handleMove = (e) => {
        e.preventDefault()
        dispatch(setVector(e))
    }

    const cellTemplate = board.board.map((row, rowIndex) =>
        row.map((cell, key) => {
            if (!!cell) {
                let tempStyle = null
                if (!!board.previousBoard[rowIndex][key]) {
                    tempStyle = board.previousBoard[rowIndex][key].position.x * 4 + board.previousBoard[rowIndex][key].position.y
                }
                return <Cell key={`${rowIndex}-${key}`} cell={cell} />
            }
            else
                return null
        })
    )

    const boardTemplate = board.board.map((row, rowIndex) =>
        row.map((cell, key) => {
            return (
                <div className={`cell cell__position--${rowIndex}-${key} empty`}>
                </div>
            )
        })
    )

    return (
        <>
            <ScoreAndTime />
            <div className="board" >
                <div className="board__empty__cells">
                    {boardTemplate}
                </div>
                <div className="board__exist__cells">
                    {cellTemplate}
                </div>
            </div>
        </>
    )
}

export default Board
