import { Status } from '../../constant';
import { useAppContext } from '../../contexts/Context';
import { closePopup } from '../../reducer/actions/popup';
import styles from './Popup.module.css';
import PromotionBox from './PromotionBox/PromotionBox';

const Popup = () => {

  const {appState, dispatch} = useAppContext();

  if (appState.status === Status.ongoing) return null;

  const onClosePopup = () => {
    dispatch(closePopup());
  }

  return <div id={styles.popup}>
    <PromotionBox onClosePopup={onClosePopup} />
  </div>
}

export default Popup;