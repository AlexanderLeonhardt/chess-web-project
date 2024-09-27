import { useAppContext } from '../../../contexts/Context';
import { Status } from '../../../constant';
import styles from './GameEnds.module.css';
import { setupNewGame } from '../../../reducer/actions/game';

const GameEnds = ({onClosePopup}) => {
  const { appState : {status}, dispatch } = useAppContext();

  if (status === Status.ongoing || status === Status.promoting) return null;

  const isWin = status.endsWith('wins');

  const newGame = () => dispatch(setupNewGame());
  
  return <div id={styles.popupInner}>
    <h1>{isWin ? status : 'Draw'}</h1>
    <p>{!isWin && status}</p>
    <button onClick={newGame}>New Game</button>
  </div>
}

export default GameEnds;