import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from '../styles/pages/Domains.module.css';
import { listings } from '../util/listings';

export default function Domains() {
  const router = useRouter();

  // highlight selected domain on start
  useEffect(() => {
    // get domain from router
    const { d } = router.query;
    if (typeof d !== 'string') return;
    // get listing
    const listing = document.getElementById(d.toLowerCase());
    if (!listing) return;
    // highlight listing
    listing.scrollIntoView();
    listing.style.background = '#efefef';
    listing.style.padding = '20px 10px';
    listing.style.borderRadius = '10px';
    listing.style.boxShadow = '0 0 10px #999';
  }, [router.query])

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div />
      </div>
      <div className={styles.content}>
        <div className={styles.center}>
          <h1>LearnCode.org Domains</h1>
          <div className={styles.listings}>
            {
              listings.map((listing, i) =>
                <div
                  id={listing.domain.toLowerCase()}
                  className={styles.listing}
                  key={i}
                >
                  <div className={styles.details}>
                    <a
                      href={`https://www.namecheap.com/market/buynow/${listing.domain.toLowerCase()}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {listing.domain}
                    </a>
                    <p>{listing.description}</p>
                  </div>
                  <a
                    href={`https://www.namecheap.com/market/buynow/${listing.domain.toLowerCase()}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <AddShoppingCartIcon />Buy Now
                  </a>
                </div>
              )
            }
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
