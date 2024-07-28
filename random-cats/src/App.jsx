import Cat from './component/Cat'
import { DataProvider } from './context/DataContext';

function App() {
  return (
     <DataProvider>
      <div>
        <Cat />
      </div>
    </DataProvider>
  )
}

export default App
