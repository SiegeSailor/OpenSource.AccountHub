import utilities from "utilities";

export default function (username: string, passcode: string) {
  return fetch(utilities.format.requestURL("account/access"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      passcode,
    }),
  });
}
