import { Helmet } from 'react-helmet-async';

import { RecyclersView } from '../sections/recyclers';

// ----------------------------------------------------------------------

export default function RecyclersPage() {
  return (
    <>
      <Helmet>
        <title> Recyclers | Minimal UI </title>
      </Helmet>

      <RecyclersView />
    </>
  );
}
