import { Scene } from './components/Scene';
import { UI } from './components/UI';

function App() {
  return (
    <div className="relative w-full h-screen bg-black">
      <Scene />
      <UI />
    </div>
  );
}

export default App;