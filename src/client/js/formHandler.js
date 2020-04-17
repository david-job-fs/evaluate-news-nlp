function handleSubmit(event) { 
  event.preventDefault();
  const url = document.getElementById("article-url").value;

  validateURL(url);

  if (!url) return;
  console.log(url);
  fetch("/article", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text: url })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("polarity").innerHTML = data.polarity;
      document.getElementById("subjectivity").innerHTML = data.subjectivity;
      document.getElementById("polarity_confidence").innerHTML =
        data.polarity_confidence;
      document.getElementById("subjectivity_confidence").innerHTML =
        data.subjectivity_confidence;
    });
}
import { validateURL } from "./validateURL";
export { handleSubmit }