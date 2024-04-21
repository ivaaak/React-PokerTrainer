import './App.css'
import CardGenerator from './CardGenerator'
import ThreeColumnComponent from './ThreeColumnComponent';

function App() {
  return (
    <div className="flex">
      <div className="icon-text-container">
        <img
          src="https://images.squarespace-cdn.com/content/v1/58a75073e6f2e1c1d5b36630/1488404317297-5E43DEVKZ1G24Q9ZWH8A/DS.png?format=750w"
          alt="Generate"
        />
        <h1>Poker Theory Trainer</h1>
      </div>

      <ThreeColumnComponent>
      </ThreeColumnComponent>


      <CardGenerator></CardGenerator>
    </div>
  )
}

export default App
