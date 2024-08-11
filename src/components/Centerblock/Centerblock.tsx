import styles from './Centerblock.module.css';
import Content from './Content/Content';
import Filter from './Filter/Filter';
import Search from './Search/Search';

const Centerblock = () => {
  return (
    <div className={styles.mainCenterblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <Filter />
      <Content />
    </div>
  );
};

export default Centerblock;
