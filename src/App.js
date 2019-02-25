import React, { Component } from 'react'
import Mine from './components/Mine'

class App extends Component {
  render() {
    return (
      <>
        <main>
          <section>
            <h1>Smelly Bombs!</h1>
            <button className="reset">Reset</button>
          </section>
          <section>
            <Mine />
          </section>
        </main>
      </>
    )
  }
}

export default App
