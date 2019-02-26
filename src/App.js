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

  setDifficulty = event => {
    console.log(event)
    if (
      event.target.value === 'Intermediate' &&
      event.target.value !== 'Beginner'
    ) {
      this.setState({ difficulty: 1 })
    } else {
      this.setState({ difficulty: 2 })
    }
  }
  componentDidMount() {
    axios
      .post('https://minesweeper-api.herokuapp.com/games', { setDifficulty() })
      .then(resp => {
        this.setState({
          game: resp.data.board,
          mines: resp.data.mines
        })
        console.log(this.state.mines)
      })
  }

  // Call to API everytime the gameboard if clicked to update the gmae. 

  render() {
    return (
      <main>
        <section>
          <h1>💣 Smelly Bombs! 💣</h1>
          <select>
            <option>Beginner</option>
            {/* onChange or onSelect */}
            <option onSelect={this.setDifficulty}>Intermediate</option>
            <option onSelect={this.setDifficulty}>Expert</option>
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
                      // Put an onClick{} event on td for functionality. Open Context Menu
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
