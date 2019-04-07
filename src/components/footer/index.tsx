import React from "react";
import { FaEnvelope, FaGithubAlt, FaAlipay } from "react-icons/fa";
import styles from "./index.module.less";

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.contact}>
      <a href="mailto:mytyiluo@outlook.com">
        <FaEnvelope />
      </a>

      <a href="https://github.com/yiluomyt">
        <FaGithubAlt />
      </a>

      <FaAlipay className={styles.alipay} />
      <div className={styles.qrcode} />
    </div>
    <div>Copyright © yiluomyt {new Date().getFullYear()}</div>
  </footer>
);

export default Footer;
