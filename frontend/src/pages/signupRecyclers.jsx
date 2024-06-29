import { Helmet } from "react-helmet-async";

import { SignupView } from "../sections/signup";

// ----------------------------------------------------------------------

export default function SignUpRecyclerPage() {
  return (
    <>
      <Helmet>
        <title> Sign Up Recycler</title>
      </Helmet>

      <SignupView isRecycler />
    </>
  );
}
