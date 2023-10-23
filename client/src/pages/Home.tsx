import React, { useEffect, useState } from 'react'

function Home() {
  const [users, setUsers] = useState<{address: string, firstName: string, lastName: string, password: string, postalCode: string, sid: string}[]>([]);
  useEffect(() => {
      fetch('http://localhost:4000/users/get')
        .then((res) => res.json())
        .then((data) => setUsers(data)) 
        .catch((error) => console.log(error));
    }, []);
    console.log(users);
  return (
    <div>hihi</div>
  )
}

export default Home