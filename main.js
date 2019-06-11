(function () {
  const loadingRef = document.querySelector("#loading");
  setTimeout(_ => {
    loadingRef.style.opacity = 0;
    setTimeout(_ => {
      loadingRef.style.display = "none";
    }, 2000);
  }, 2000);

  const becomeFirstRef = document.querySelector("#become-first");
  becomeFirstRef.addEventListener("click", _ => {
    const subscribeScreenRef = document.querySelector("#subscribe-screen");

    subscribeScreenRef.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest"
    });
  });

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.documentElement.style.setProperty("--sectionHeight", `${window.innerHeight}px`);

    let isScrolling;
    let scrollTimeout

    window.addEventListener('scroll', function () {
      if (isScrolling) return;

      window.clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(function () {
        if (window.innerHeight < 600) return;

        document.documentElement.style.setProperty("--sectionHeight", `${window.innerHeight}px`);
        const currentScrollPercent = (document.body.scrollTop / document.body.scrollHeight);
        const currentScreen = currentScrollPercent < 0.17 ? 0 : (currentScrollPercent < 0.51 ? 1 : 2);

        this.isScrolling = true;
        window.scrollTo({
          top: window.innerHeight * currentScreen,
          behavior: "smooth"
        });
        this.isScrolling = false;
      }, 100);
    }, false);

  } else {
    document.documentElement.style.setProperty("--sectionHeight", `100%`);
  }

  const subscribeBtn = document.querySelector("#subscribe-button");
  subscribeBtn.addEventListener("click", _ => {
    const emailInputRef = document.querySelector("#email-input");
    Email.send({
      SecureToken: "23c165e4-8d22-4f33-b5f3-8719281171df",
      To: 'parkmelive@gmail.com',
      From: "parkmelive@gmail.com",
      Subject: "New Subscriber",
      Body: emailInputRef.value
    }).then(() => {
      console.log("success");
    });
  });
})();
