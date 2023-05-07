import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";

const columns = [
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Age/Sex",
    selector: (row) =>
      row.age && row.sex
        ? `${row.age}/${row.sex}`
        : row.age
        ? row.age
        : row.sex,
    sortable: true,
  },
  {
    name: "Mobile",
    selector: (row) => row.mobile,
    sortable: true,
  },
  {
    name: "Address",
    selector: (row) => {
        let add = '';
        if(row.address) add += row.address;
        if(row.state) add += ", "+row.state;
        if(row.city) add += ", "+row.city;
        if(row.pincode) add += "-"+row.address;
        if(row.country) add += ", "+row.country;
        return add;
    },
    sortable: true,
  },
  {
    name: "Govt ID",
    selector: (row) => row.govtId,
    sortable: true,
  },
  {
    name: "Guardian Details",
    selector: (row) => row.guardianName,
    sortable: true,
  },
  {
    name: "Nationality",
    selector: (row) => row.nationality,
    sortable: true,
  },
];

const UsersTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/api/user");
      console.log(result.data);
      setUsers(result.data);
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        padding: "50px 20px 0 20px",
      }}
    >
      <DataTable
        title="Registered Users"
        columns={columns}
        data={users}
        pagination={true}
      />
    </div>
  );
};

export default UsersTable;
