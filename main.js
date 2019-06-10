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

/*   const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  window.addEventListener("resize", () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }); */

  const subscribeBtn = document.querySelector("#subscribe-button");
  subscribeBtn.addEventListener("click", _ => {
    const emailInputRef = document.querySelector("#email-input");
    Email.send({
      SecureToken : "23c165e4-8d22-4f33-b5f3-8719281171df",
      To : 'parkmelive@gmail.com',
      From : "parkmelive@gmail.com",
      Subject : "New Subscriber",
      Body : emailInputRef.value
    }).then(() => {
      console.log("success");
    });
  });
})();
