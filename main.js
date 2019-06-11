(function () {
  this.oldScroll = 0;
  this.oldHeight = window.innerHeight;
  this.scrollInterval;

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

    this.oldHeight = window.innerHeight;
    this.oldScroll = document.body.scrollHeight - this.oldHeight;

    clearInterval(this.scrollInterval);
    this.scrollInterval = setInterval(() => {
      if (document.body.scrollTop === this.oldScroll) {
        clearInterval(this.scrollInterval);
      }
    }, 100);
  });

  // Handling scroll behaviour on mobile devices
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.documentElement.style.setProperty("--sectionHeight", `${window.innerHeight}px`);
  
    document.body.ontouchend = () => {
      if (window.innerHeight < 600) return;

      document.documentElement.style.setProperty("--sectionHeight", `${window.innerHeight}px`);

      const currentScroll = document.body.scrollTop;
      const direction = currentScroll < this.oldScroll ? -1 : 1;
      let currentScreen = Math.round((this.oldScroll + direction * this.oldHeight) / this.oldHeight);
      currentScreen = currentScreen > 0 ? currentScreen : 0;

      this.isScrolling = true;
      window.scrollTo({
        top: window.innerHeight * currentScreen,
        behavior: "smooth"
      });       

      this.oldScroll = window.innerHeight * currentScreen;
      this.oldHeight = window.innerHeight;

      clearInterval(this.scrollInterval);

      let count = 0;
      this.scrollInterval = setInterval(() => {
        count += 50;
        if ((document.body.scrollTop === this.oldScroll) || count > 1000) {
          if ((this.oldHeight !== window.innerHeight) && (window.innerHeight >= 600)) {
            document.documentElement.style.setProperty("--sectionHeight", `${window.innerHeight}px`);
            this.oldScroll = (this.oldScroll / this.oldHeight) * window.innerHeight;
            this.oldHeight = window.innerHeight;
  
            window.scrollTo(0, this.oldScroll);
          }
          clearInterval(this.scrollInterval);
        }
      }, 50);

    };

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
      console.log("success");
    });
  });
})();

