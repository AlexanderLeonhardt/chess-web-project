import styles from './Ranks.module.css';

const Ranks = ({ranks}) => {
  return <div className={styles.ranks}>
    {ranks.map(rank => <span key={rank}>{rank}</span>)}
  </div>
}

export default Ranks;