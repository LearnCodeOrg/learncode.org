import styles from '../styles/pages/Index.module.css';

export default function Index() {
  return (
    <div className={styles.container}>
      <div className={styles.center}>
        <p>
          {
            'CodeWithGames'.split('').map((char, i) =>
              <span
                className={styles.char}
                style={{ animationDelay: `${0.1 * i}s` }}
                key={i}
              >
                {char}
              </span>
            )
          }
        </p>
        <span>coming soon</span>
      </div>
    </div>
  );
}
