
import { getMe } from "../services/auth/auth.server";
import Header from "./Header";

export default async function HeaderWrapper() {
  const user = await getMe();

  return (
      <Header user={user} />
  );
}
