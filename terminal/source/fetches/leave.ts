import utilities from "utilities";

export default function () {
  return fetch(utilities.format.requestURL("account/leave"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
}
