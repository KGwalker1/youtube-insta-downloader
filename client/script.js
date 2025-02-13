// import { saveAs } from "file-saver";

// YouTube download form submission handler
document.getElementById("youtubeForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const url = document.getElementById("youtubeUrl").value;
  const message = document.getElementById("youtubeMessage");
  message.textContent = "Downloading...";

  try {
    const response = await fetch("http://localhost:3002/api/youtube-download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });
    const result = await response.json();
    message.textContent = result.message || `Error: ${result.error}`;

    // If the response includes a file path, fetch the file and prompt the user to save it
  } catch (err) {
    message.textContent = `Error: ${err.message}`;
  }
});

// Instagram download form submission handler
document.getElementById("instaForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const url = document.getElementById("instaUrl").value;
  const message = document.getElementById("instaMessage");
  message.textContent = "Downloading...";

  try {
    const response = await fetch(
      "http://localhost:3002/api/instagram-download",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      }
    );
    const result = await response.json();
    message.textContent = result.message || `Error: ${result.error}`;
  } catch (err) {
    message.textContent = `Error: ${err.message}`;
  }
});
