(function () {
  // Handling loading screen
  const loadingRef = document.querySelector("#loading");
  setTimeout(_ => {
    window.scrollTo(0, 0);
    loadingRef.style.opacity = 0;
    setTimeout(_ => {
      loadingRef.style.display = "none";
    }, 2000);
  }, 2000);


  // Handling "Become First" button
  const becomeFirstRef = document.querySelector("#become-first");
  becomeFirstRef.addEventListener("click", _ => {
    const subscribeScreenRef = document.querySelector("#subscribe-screen");

    this.isScrolling = true;
    subscribeScreenRef.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest"
    });
  });

  // Handling scroll behaviour on mobile devices
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.documentElement.style.setProperty("--sectionHeight", `${window.innerHeight}px`);

    window.addEventListener('resize', _ => {
      document.documentElement.style.setProperty("--sectionHeight", `${window.innerHeight}px`);
    });
  } else {
    document.documentElement.style.setProperty("--sectionHeight", `100%`);
  }

  // Handling subscribe button
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
      document.querySelector("#subscribe-action-wrapper").style.display = "none";
      document.querySelector("#subscribe-success-wrapper").style.display = "flex";
    });
  });
})();

