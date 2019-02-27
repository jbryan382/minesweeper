import React, { Component } from 'react'
import axios from 'axios'

// Try and get to play minesweeper by tonight 2/26

class App extends Component {
  state = {
    id: 0,
    game: [[]],
    difficulty: 0,
    mines: 0,
    // Need to add function that tracks the state of the game in axois request.
    // "gameStatus: resp.data.state" and it will respond with a string of "new", "playing", "won", "lost"
    gameStatus: ''
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
      .post('https://minesweeper-api.herokuapp.com/games', {
        difficulty: this.state.difficulty
      })
      .then(resp => {
        this.setState({
          id: resp.data.id,
          game: resp.data.board,
          mines: resp.data.mines,
          gameStatus: resp.data.state
        })
      })
  }
  //       const token = localStorage.getItem('saved-game')
  //       if (token) {
  //         this.setState(
  //           {
  //           id: token
  //         },
  //         () => {
  //           this.componentDidMount()
  //         }
  //      )
  //     }
  //   }
  // }

  setDifficulty = event => {
    console.log(event.target.value)
    this.setState({
      difficulty: event.target.value
    })
  }

  setGame = () => {
    axios
      .post('https://minesweeper-api.herokuapp.com/games', {
        difficulty: this.state.difficulty
      })
      .then(resp => {
        this.setState({
          id: resp.data.id,
          game: resp.data.board,
          gameStatus: resp.data.state
        })
        console.log(this.state.mines)
      })
  }

  playGame = (x, y) => {
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
          game: resp.data.board,
          gameStatus: resp.data.state
        })
      })
  }

  resetGame = () => {
    axios
      .post('https://minesweeper-api.herokuapp.com/games', {
        difficulty: 0
      })
      .then(resp => {
        this.setState({
          id: resp.data.id,
          game: resp.data.board,
          gameStatus: resp.data.state
        })
      })

    localStorage.setItem('saved-game', this.state.id)
  }

  plantFlag = (x, y) => {
    axios
      .post(
        `https://minesweeper-api.herokuapp.com/games/${this.state.id}/flag`,
        {
          id: this.state.id,
          row: x,
          col: y
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
        <section className="game_header">
          <h1>💣 Smelly Bombs! 💣</h1>
          {/* Need to have checked I doubt the viablity of my value from the select box */}
          <select onChange={this.setDifficulty} value={this.state.difficulty}>
            <option value="0">Beginner</option>
            <option value="1"> Intermediate</option>
            <option value="2">Expert</option>
          </select>
          <button className="reset" onClick={() => this.setGame()}>
            Set Difficulty
          </button>
          <h1>{this.state.gameStatus}</h1>
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
                          onClick={() => this.playGame(x, y)}
                          onContextMenu={() => this.plantFlag(x, y)}
                        >
                          &nbsp;
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
