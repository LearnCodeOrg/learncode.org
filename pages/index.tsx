import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import TwitterIcon from '@mui/icons-material/Twitter';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from 'next/image';
import NextLink from 'next/link';
import Router from 'next/router';
import { useState } from 'react';
import KofiButton from '../components/KofiButton';
import Link from '../components/Link';
import Snake from '../components/Snake';
import styles from '../styles/pages/Index.module.scss';

const theme = createTheme({
  typography: {
    fontFamily: "'Montserrat', sans-serif"
  }
});

export default function Index() {
  const [fade, setFade] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | Element>(null);

  return (
    <div className={styles.container}>
      <Snake fade={fade} setFade={setFade} />
      <div
        className={styles.logo}
        style={{ opacity: fade ? 0 : 1 }}
      >
        <Image
          width="48"
          height="48"
          src="/img/logo.svg"
          alt="logo"
        />
      </div>
      <div
        className={styles.links}
        style={{ opacity: fade ? 0 : 1 }}
      >
        <a
          href="https://www.codecreatively.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          CodeCreatively
        </a>
        <a
          href="https://www.infive.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Infive
        </a>
        <NextLink href="/domains">
          <a>Domains</a>
        </NextLink>
        <div className={styles.kofiButton}>
          <KofiButton text="Support LearnCode.org" />
        </div>
      </div>
      <div
        className={styles.menu}
        style={{ opacity: fade ? 0 : 1 }}
      >
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
              window.open('https://www.codecreatively.com/');
              setMenuAnchor(null);
            }}>
              CodeCreatively
            </MenuItem>
            <MenuItem onClick={() => {
              window.open('https://www.infive.org/');
              setMenuAnchor(null);
            }}>
              Infive
            </MenuItem>
            <MenuItem onClick={() => {
              Router.push('/domains')
              setMenuAnchor(null);
            }}>
              Domains
            </MenuItem>
            <MenuItem onClick={() => {
              window.open('https://ko-fi.com/csaye');
              setMenuAnchor(null);
            }}>
              Support LearnCode.org
            </MenuItem>
          </Menu>
        </ThemeProvider>
      </div>
      <div className={styles.content}>
        <div
          className={styles.center}
          style={fade ? { opacity: 0.5 } : {}}
        >
          <p>
            {
              'LearnCode.org™'.split('').map((char, i) =>
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
          <span>Learn to code and unleash your inner creativity.</span>
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
        </div>
      </div>
    </div>
  );
}
