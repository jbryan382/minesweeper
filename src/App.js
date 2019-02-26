import React, { Component } from 'react'
import axios from 'axios'

class App extends Component {
  state = {
    id: 0,
    game: [[]],
    difficulty: 0,
    mines: 0
  }

  setIntermediate = event => {
    this.setState({ difficulty: 1 })
  }

  setExpert = event => {
    this.setState({ difficulty: 2 })
  }
  componentDidMount() {
    axios
      .post('https://minesweeper-api.herokuapp.com/games', {
        difficulty: this.state.difficulty
      })
      .then(resp => {
        this.setState({
          game: resp.data.board,
          mines: resp.data.mines
        })
        console.log(this.state.mines)
      })
  }

  render() {
    return (
      <main>
        <section>
          <h1>💣 Smelly Bombs! 💣</h1>
          <select>
            <option>Beginner</option>
            <option onChange={this.setIntermediate}>Intermediate</option>
            <option onChange={this.setExpert}>Expert</option>
          </select>
          <button className="reset">Reset</button>
        </section>
        <section className="game_body">
          <table>
            <tbody>
              {this.state.game.map(row => {
                return (
                  <tr>
                    {row.map(col => {
                      // Put an onClick{} event on td for functionality.
                      return <td>{col}</td>
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
