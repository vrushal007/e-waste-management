import { Helmet } from "react-helmet-async";

import { SignupView } from "../sections/signup";

// ----------------------------------------------------------------------

export default function SignUpPage() {
  return (
    <>
      <Helmet>
        <title> Sign Up </title>
      </Helmet>

      <SignupView />
    </>
  );
}
