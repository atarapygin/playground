const weatherForm = document.querySelector("form");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const locationSearchValue = document.querySelector("input").value;

  const messageOne = document.querySelector("#message-1");
  const messageTwo = document.querySelector("#message-2");

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch(`/weather?address=${locationSearchValue}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = "Error: " + data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
