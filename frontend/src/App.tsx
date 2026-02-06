import { useEffect, useState } from 'react'
import './App.css'
import { GameMap } from './components/GameMap'
import DayView from './components/DayView'

function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    window.addEventListener('pushstate', onPop as EventListener);
    return () => {
      window.removeEventListener('popstate', onPop);
      window.removeEventListener('pushstate', onPop as EventListener);
    };
  }, []);

  if (path.startsWith('/day/')) {
    return <DayView />;
  }

  return <GameMap />;
}

export default App
