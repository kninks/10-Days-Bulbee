import React, { useEffect, useState } from 'react'

function Home() {
  const [users, setUsers] = useState<{address: string, firstName: string, lastName: string, password: string, postalCode: string, sid: string}[]>([]);

  console.log(users);
  return (
      <>
          <div>hihi</div>
      </>
  )
}

export default Home