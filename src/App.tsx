import useItems from './api/useItems'
import parseItems from './utils/parseItems'
import Canvas from './features/canvas'

function App() {
  const items = parseItems(useItems())
  return (
    <div className='App'>
      <header>
        <h2>Items: {items.length}</h2>
      </header>
      <Canvas items={items} />
    </div>
  )
}

export default App
