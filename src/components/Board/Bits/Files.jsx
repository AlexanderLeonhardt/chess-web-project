import styles from './Files.module.css';

const Files = ({files}) => {
  return <div className={styles.files}>
    {files.map(file => <span key={file}>{file}</span>)}
  </div>
}

export default Files;