import { useEffect, useState } from "react";
import "../../styles/users.css";

interface IUser {
  email:string,
  name:string,
  role:string
}

const UserTable = () => {
  const [listUser, setListUser] = useState([])
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    
    const access_token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjVkMDI1MjgyZmZlMzJkMTg3Y2E3NWUwIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3MDgzMjA5MTQsImV4cCI6MTc5NDcyMDkxNH0.SUgtJt-lbnD_Lh8wdtAd_RNhm4i3_Hgus1yJuHksq2Y";

    const res = await fetch("http://localhost:8000/api/v1/users/all", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    const dataRes = await res.json();
    if(dataRes && dataRes.data.result){
      setListUser(dataRes.data.result);
    }
    console.log("data", dataRes);
  };
  return (
    <div>
      <h2>Table User</h2>
      <table>
        <thead>
          <tr>
            <td>Email</td>
            <td>Name</td>
            <td>Role</td>
          </tr>
        </thead>
        <tbody>
          {listUser?.map((user : IUser, index) => {
            return (
          
            <tr key={`index-${index}`}>
              <td>{user?.email}</td>
              <td>{user?.name}</td>
              <td>{user?.role}</td>
            </tr>
            
            )
          })}
          
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
