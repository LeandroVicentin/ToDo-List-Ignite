import styles from './App.module.css';
import { Header } from './components/Header';
import { NewTask } from './components/NewTask';
import './global.css';

function App() {
  return (
    <div className={styles.body}>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <NewTask />
        </div>
      </div>
    </div>
  )
}

export default App
