import React from "react";
import { FaEnvelope, FaGithubAlt, FaAlipay } from "react-icons/fa";
import styles from "./index.module.less";

// 页脚
const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.contact}>
      <a href="mailto:mytyiluo@outlook.com" aria-label="EMail">
        <FaEnvelope />
      </a>

      <a href="https://github.com/yiluomyt" aria-label="GitHub">
        <FaGithubAlt />
      </a>

      <FaAlipay className={styles.alipay} aria-label="AliPay" />
      <img className={styles.qrcode} src="/alipay.webp" alt="支付宝收款码" />
    </div>
    <div>Copyright © yiluomyt {new Date().getFullYear()}</div>
  </footer>
);

export default Footer;
