import React from "react";
import Script from "next/script";

const Disqus = () => {
  return (
    <>
      <div id="disqus_thread"></div>
      <Script id={`disqus-1`}>
        {`
        var disqus_config = function () {
        this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
        this.page.identifier = document.location.href.split(".com")[1]; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
        };
    
        (function() { // DON'T EDIT BELOW THIS LINE
        var d = document, s = d.createElement('script');
        s.src = 'https://localhost-3000-qv1t2rpmvb.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
        })();
        `}
      </Script>
      <noscript>
        Please enable JavaScript to view the{" "}
        <a href="https://disqus.com/?ref_noscript">
          comments powered by Disqus.
        </a>
      </noscript>
    </>
  );
};

export default Disqus;
