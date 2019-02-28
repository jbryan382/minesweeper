import React, { Component } from 'react'

class Cell extends Component {
  render() {
    let picture = this.props.col
    let cellType = 'cell'
    switch (picture) {
      case 'F':
        picture = '🚩'
        cellType = 'revealed-cell'
        break
      case '*':
        picture = '💣'
        cellType = 'revealed-cell-bomb'
        break
      case '@':
        picture = '⚑'
        cellType = 'revealed-cell'
        break
      case '_':
        picture = ''
        cellType = 'revealed-cell'
        break
      case 1:
        picture = 1
        cellType = 'one-cell'
        break
      case 2:
        picture = 2
        cellType = 'two-cell'
        break
      case 3:
        picture = 3
        cellType = 'three-cell'
        break
      case 4:
        picture = 4
        cellType = 'four-cell'
        break
      case 5:
        picture = 5
        cellType = 'five-cell'
        break
      case '':
        break
      default:
        cellType = 'hidden-cell'
    }

    return (
      <td
        className={cellType}
        key={this.props.colIndex}
        onClick={() =>
          this.props.playGame(this.props.rowIndex, this.props.colIndex)
        }
        onContextMenu={() =>
          this.props.plantFlag(this.props.rowIndex, this.props.colIndex)
        }
      >
        &nbsp;
        {picture}
      </td>
    )
  }
}

export default Cell
