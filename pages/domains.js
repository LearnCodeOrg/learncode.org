import styles from '../styles/pages/Domains.module.css';

export default function Domains() {
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div />
      </div>
      <div className={styles.content}>
        <div className={styles.center}>
          <h1>LearnCode.org Domains</h1>
          <div className={styles.listings}>
          </div>
          <p id="questions"><b>Questions?</b></p>
          <a
            href="mailto:hi@learncode.org?subject=Domain Inquiry"
            className={styles.contactUs}
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
