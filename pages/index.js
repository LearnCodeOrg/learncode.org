import styles from '../styles/pages/Index.module.css';

export default function Index() {
  const [fade, setFade] = useState(false);

  return (
    <div className={styles.container}>
      <Snake fade={fade} setFade={setFade} />
      <div
        className={styles.center}
        style={fade ? { opacity: 0.5 } : {}}
      >
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
