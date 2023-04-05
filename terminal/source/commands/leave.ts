import fetches from "fetches";
import utilities from "utilities";

export default async function (cookie: string) {
  const response = await fetches.leave(cookie);
  const message = await utilities.format.message(response);
  console.log(message);

  return { response };
}
