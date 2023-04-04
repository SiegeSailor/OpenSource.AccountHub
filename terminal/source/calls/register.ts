import settings from "settings";
import utilities from "utilities";

export default async function (username: string, passcode: string) {
  const response = await fetch(utilities.format.requestURL("register"), {
    method: "POST",
    body: JSON.stringify({
      username,
      passcode,
    }),
  });

  const result = await response.json();

  if (response.ok) {
    console.log("Registration successful:", result);
  } else {
    console.error("Registration failed:", result);
  }
}
