import utilities from "utilities";

export default function () {
  return fetch(utilities.format.requestURL("account/access"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
}
