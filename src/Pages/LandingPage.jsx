import React from "react";
import styles from "./pageStyles/landinpage.module.css";
import triangle from "../assets/traingle1.png";
import seicircle from "../assets/semiCircle.png";
import landingbanner from "../assets/landingPage.png";
import formBotLogo from "../assets/formBotLogo.png";
import { PiArrowSquareOut } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {

  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.titleSection}>
        <div className={styles.trianglePng}>
          <img src={triangle} alt="triagle" />
        </div>
        <div className={styles.banner}>
          <h1>
            Build advanced chatbots <br /> visually
          </h1>
          <p>
            Typebot gives you powerful blocks to create unique chat experiences.
            Embed them <br /> anywhere on your web/mobile apps and start
            collecting results like magic.
          </p>
          <button className={styles.signIn} onClick={()=>navigate("/login")}>Create a FormBot for free</button>
        </div>
        <div>
          <img src={seicircle} alt="semicircle" />
        </div>
      </div>
      <div className={styles.bannerCont}>
        <img src={landingbanner} alt="" />
      </div>
      <footer className={styles.landingFooter}>
        <div className={styles.logoFooter}>
          <div className={styles.logo}>
            <div className={styles.logoImg}>
              <img src={formBotLogo} alt="" />
            </div>
            <div className={styles.logoName}>
              <p>FormBot</p>
            </div>
          </div>
          <p>
            Made with ❤️ by <br /> sahilpatil0900@gmail.com
          </p>
        </div>
        <div className={styles.footProduct}>
          <p>Products</p>
          {["Status", "Documentation", "Roadmap", "Pricing"].map((prod) => (
            <li>{prod}<PiArrowSquareOut /></li>
          ))}
        </div>
        <div className={styles.footProduct}>
          <p>Community</p>
          {["Discord","GitHub repository","Twitter","LinkedIn","OSS Friends",
          ].map((com)=>( <li>{com}<PiArrowSquareOut /></li>))}
        </div>
        <div className={styles.footProduct}>
          <p>Company</p>
          {["About", "Contact", "Terms & Services","Privacy Policy"].map((cmp)=>(<li>{cmp}<PiArrowSquareOut /></li>))}
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
