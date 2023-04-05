import utilities from "utilities";

export default function (cookie: string) {
  return fetch(utilities.format.requestURL("account/leave"), {
    method: "POST",
    headers: { "Content-Type": "application/json", Cookie: cookie },
  });
}
