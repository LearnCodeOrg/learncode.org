import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';
import Snake from '../components/Snake';
import Link from '../components/Link';

import { useState } from 'react';

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
        <div className={styles.icons}>
          <Link to="https://github.com/codewithgames">
            <GitHubIcon />
          </Link>
          <Link to="mailto:hi@codewith.games">
            <EmailIcon />
          </Link>
          <Link to="https://twitter.com/CodeWGames">
            <TwitterIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}
