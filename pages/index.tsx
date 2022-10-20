import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import TwitterIcon from '@mui/icons-material/Twitter';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from 'next/image';
import { useState } from 'react';
import Background from '../components/Background';
import KofiButton from '../components/KofiButton';
import Link from '../components/Link';
import styles from '../styles/pages/Index.module.scss';

const theme = createTheme({
  typography: {
    fontFamily: "'Montserrat', sans-serif"
  }
});

export default function Index() {
  const [menuAnchor, setMenuAnchor] = useState<null | Element>(null);

  return (
    <div className={styles.container}>
      <Background />
      <div className={styles.logo}>
        <Image
          width="48"
          height="48"
          src="/img/logo.svg"
          alt="logo"
        />
      </div>
      <div className={styles.links}>
        <div className={styles.kofiButton}>
          <KofiButton text="Support LearnCode.org" />
        </div>
      </div>
      <div className={styles.menu}>
        <IconButton onClick={e => setMenuAnchor(e.currentTarget)}>
          {menuAnchor ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
        <ThemeProvider theme={theme}>
          <Menu
            anchorEl={menuAnchor}
            open={!!menuAnchor}
            onClose={() => setMenuAnchor(null)}
          >
            <MenuItem onClick={() => {
              window.open('https://ko-fi.com/csaye');
              setMenuAnchor(null);
            }}>
              Support LearnCode.org
            </MenuItem>
          </Menu>
        </ThemeProvider>
      </div>
      <div className={styles.icons}>
        <Link to="https://github.com/LearnCodeOrg">
          <GitHubIcon />
        </Link>
        <Link to="mailto:hi@learncode.org">
          <EmailIcon />
        </Link>
        <Link to="https://twitter.com/LearnCodeOrg">
          <TwitterIcon />
        </Link>
      </div>
      <div className={styles.content}>
        <div className={styles.center}>
          <h1>
            {
              'LearnCode.org™'.split('').map((char, i) =>
                <span
                  className={styles.char}
                  style={{ animationDelay: `${0.1 * (i + 1)}s` }}
                  key={i}
                >
                  {char}
                </span>
              )
            }
          </h1>
          <p><i>Learn to code and unleash your inner creativity.</i></p>
          <p>
            <a
              href="https://www.codecreatively.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              CodeCreatively
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
