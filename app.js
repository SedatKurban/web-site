var tabLinks = document.getElementsByClassName("tab-links");
var tabContents = document.getElementsByClassName("tab-contents");
var sideMenu = document.getElementById("sideMenu");
document
  .getElementById("contact-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (!username || !email || !message) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValidation.test(email)) {
      alert("Geçerli bir e-posta adresi girin.");
      return;
    }

    const formData = new FormData();
    formData.append("access_key", "d5683de3-0a15-42d6-a665-17933869fbad");
    formData.append("name", username);
    formData.append("email", email);
    formData.append("message", message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        alert("Teşekkürler, mesajınız başarıyla gönderildi!");
        document.getElementById("contact-form").reset();
      } else {
        alert("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    } catch (error) {
      alert("Mesaj gönderilemedi. Lütfen internet bağlantınızı kontrol edin.");
    }
  });

function openMenu() {
  sideMenu.style.right = "0";
}

function closeMenu() {
  sideMenu.style.right = "-200px";
}

function openTab(tabName) {
  for (tabLink of tabLinks) {
    tabLink.classList.remove("active-link");
  }

  for (tabContent of tabContents) {
    tabContent.classList.remove("active-tab");
  }

  event.currentTarget.classList.add("active-link");
  document.getElementById(tabName).classList.add("active-tab");
}