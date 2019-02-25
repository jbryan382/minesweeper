import React, { Component } from 'react'
import axios from 'axios'

class App extends Component {
  state = {
    game: [[]]
  }

  componentDidMount() {
    axios
      .post('https://minesweeper-api.herokuapp.com/games', { difficulty: 0 })
      .then(resp => {
        this.setState({
          game: resp.data.board
        })
      })
  }

  render() {
    return (
      <main>
        <section>
          <h1>💣 Smelly Bombs! 💣</h1>
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
