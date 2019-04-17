var React = require("react");

exports.onRenderBody = ({ setHeadComponents }) => {
  if (process.env.NODE_ENV === `production`) {
    setHeadComponents([
      // 这里的形式是为了异步加载
      <script
        key="baidu-analytics-script"
        dangerouslySetInnerHTML={{
          __html: `
            var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?ff306397dbce7dab4357bd037fa286ca";
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);
            })();
          `,
        }}
      />,
    ]);
  }
};
