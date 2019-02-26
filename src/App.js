import React, { Component } from 'react'
import axios from 'axios'

// Try and get to play minesweeper by tonight 2/26

class App extends Component {
  state = {
    id: 0,
    game: [[]],
    difficulty: 0,
    mines: 0
  }

  // setDifficulty = event => {
  //   console.log(event)
  //   if (
  //     event.target.value === 'Intermediate' &&
  //     event.target.value !== 'Beginner'
  //   ) {
  //     this.setState({ difficulty: 1 })
  //   } else {
  //     this.setState({ difficulty: 2 })
  //   }
  // }
  componentDidMount() {
    axios
      .post('https://minesweeper-api.herokuapp.com/games', { difficulty: 0 })
      .then(resp => {
        this.setState({
          id: resp.data.id,
          game: resp.data.board,
          mines: resp.data.mines
        })
        console.log(this.state.mines)
      })
  }

  startGame = (x, y) => {
    axios
      .post(
        `https://minesweeper-api.herokuapp.com/games/${this.state.id}/check`,
        {
          id: this.state.id,
          row: x,
          col: y,
          mines: 0
        }
      )
      .then(resp => {
        console.log(resp)
        this.setState({
          game: resp.data.board
        })
      })
  }

  resetGame = () => {
    axios
      .post('https://minesweeper-api.herokuapp.com/games', { difficulty: 0 })
      .then(resp => {
        this.setState({
          id: resp.data.id,
          game: resp.data.board,
          mines: resp.data.mines
        })
        console.log(this.state.mines)
      })
  }

  plantFlag = (x, y) => {
    axios
      .post(
        `https://minesweeper-api.herokuapp.com/games/${this.state.id}/flag`,
        {
          id: this.state.id,
          row: x,
          col: y,
          mines: 0
        }
      )
      .then(resp => {
        console.log(resp)
        this.setState({
          game: resp.data.board
        })
      })
  }

  // Call to API every time the game board if clicked to update the game.

  render() {
    return (
      <main>
        <section>
          <h1>💣 Smelly Bombs! 💣</h1>
          <select>
            <option>Beginner</option>
            {/* onChange or onSelect */}
            {/* <option onSelect={this.setDifficulty}>Intermediate</option> */}
            {/* <option onSelect={this.setDifficulty}>Expert</option> */}
          </select>
          <button className="reset" onClick={() => this.resetGame()}>
            😀
          </button>
        </section>
        <section className="game_body">
          <table>
            <tbody>
              {this.state.game.map((row, x) => {
                return (
                  <tr key={x}>
                    {row.map((col, y) => {
                      return (
                        <td
                          key={y}
                          onClick={() => this.startGame(x, y)}
                          onContextMenu={() => this.plantFlag(x, y)}
                        >
                          {col}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </section>
      </main>
    )
  }
}

export default App
