import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Cell from './cell/Cell'
import { build, resetBoard, setVector, move, end } from '../store/board/actions';
import { checkMoves } from '../store/board/functions';

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
            return null
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [board.vector, board.board])

    const handleMove = (e) => {
        e.preventDefault()
        dispatch(setVector(e))
    }

    const cellTemplate = board.board.map((row, rowIndex) =>
        row.map((cell, key) => {
            return !!cell ? <Cell key={`${rowIndex}-${key}`} cell={cell} /> : null
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
