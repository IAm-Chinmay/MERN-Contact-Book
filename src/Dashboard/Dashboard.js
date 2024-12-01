import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdEdit, MdDelete } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from "../Store/authSlice";

function Dashboard() {
  const [contacts, setContacts] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  // Fetch contacts from the backend
  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/user/", {
        headers: {
          Authorization: `Bearer ${token}`, // Send auth token
        },
      });
      setContacts(response.data.contacts); // Assuming contacts are in response.data.contacts
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Delete contact
  const deleteContact = async (contactId) => {
    try {
      await axios.delete(
        `http://localhost:3001/api/user/delete-contact/${contactId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setContacts(contacts.filter((contact) => contact._id !== contactId));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <h1 style={{ textAlign: "center" }}>My Contacts</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <h4
          style={{
            textAlign: "center",
          }}
        >
          <Link to={"/add"}>Add Contacts</Link>
        </h4>
        <h4
          style={{
            textAlign: "center",
            cursor: "pointer",
          }}
          onClick={() => dispatch(logout())}
        >
          LogOut
        </h4>
      </div>
      <table
        style={{ border: "1px solid black", width: "100%" }}
        id="customers"
      >
        <thead>
          <tr style={{ border: "1px solid black", borderCollapse: "collapse" }}>
            <th
              style={{ border: "1px solid black", borderCollapse: "collapse" }}
            >
              Name
            </th>
            <th
              style={{ border: "1px solid black", borderCollapse: "collapse" }}
            >
              Mobile Number
            </th>
            <th
              style={{ border: "1px solid black", borderCollapse: "collapse" }}
            >
              Email
            </th>
            <th
              style={{ border: "1px solid black", borderCollapse: "collapse" }}
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td>{contact.name}</td>
              <td>{contact.mobile}</td>
              <td>{contact.email}</td>
              <td
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Link to={"/edit"} state={{ contact }}>
                  <MdEdit style={{ cursor: "pointer" }} size={30} />
                </Link>
                <MdDelete
                  style={{ cursor: "pointer" }}
                  size={30}
                  onClick={() => deleteContact(contact._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
