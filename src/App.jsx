import { useReducer } from 'react';
import Board from './components/Board/Board'
import AppContext from './contexts/Context';
import { reducer } from './reducer/reducer';
import { initGameState } from './constant';

function App() {

  const [appState, dispatch] = useReducer(reducer, initGameState);

  const providerState = {
    appState,
    dispatch
  }
  return (
    <AppContext.Provider value={providerState}>
      <Board />
    </AppContext.Provider>
  );
}

export default App
