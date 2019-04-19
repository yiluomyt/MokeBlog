import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { FaEnvelope, FaGithubAlt, FaAlipay } from "react-icons/fa";

import styles from "./index.module.less";

import { Site } from "@/types";

// 页脚
const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.contact}>
      <StaticQuery
        query={concatQuery}
        render={({
          site: {
            siteMetadata: { email, github, alipay },
          },
        }: {
          site: Site;
        }) => (
          <>
            <a href={`mailto:${email}`} aria-label="EMail">
              <FaEnvelope />
            </a>

            <a href={github} aria-label="GitHub">
              <FaGithubAlt />
            </a>

            <FaAlipay className={styles.alipay} aria-label="AliPay" />
            <img
              className={styles.qrcode}
              src={alipay}
              alt="支付宝收款码"
            />
          </>
        )}
      />
    </div>
    <div>Copyright © yiluomyt {new Date().getFullYear()}</div>
  </footer>
);

export default Footer;

const concatQuery = graphql`
  {
    site {
      siteMetadata {
        email
        github
        alipay
      }
    }
  }
`;
