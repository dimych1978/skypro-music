import styles from './Filter.module.css';

const Filter = () => {
  return (
    <div className={styles.centerblockFilter}>
      <div className={styles.filterTitle}>Искать по:</div>
      <div className={`${styles.filterButton} button-author btnText`}>
        исполнителю
      </div>
      <div className={`${styles.filterButton}  button-year btnText`}>
        году выпуска
      </div>
      <div className={`${styles.filterButton}  button-genre btnText`}>
        жанру
      </div>
    </div>
  );
};

export default Filter;
