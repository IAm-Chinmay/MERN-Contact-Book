import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function EditForm() {
  const location = useLocation();
  const { contact } = location.state || {};
  const token = useSelector((state) => state.auth.token);

  const [newContact, setNewContact] = useState({
    name: contact?.name || "",
    mobile: contact?.mobile || "",
    email: contact?.email || "",
  });

  const handleEditContact = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3001/api/user/edit-contact/${contact._id}`,
        newContact,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Contact Edited");
      setNewContact({ name: "", mobile: "", email: "" });
    } catch (error) {
      console.error("Error editing contact:", error);
    }
  };

  if (!contact) {
    return <div>No contact selected</div>;
  }

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Edit {contact.name}</h1>
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form
          style={{
            backgroundColor: "#e8e4d8",
            width: "40%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            height: "50%",
            borderRadius: "15px",
          }}
          onSubmit={handleEditContact}
        >
          <input
            type="text"
            placeholder="Name"
            value={newContact.name}
            onChange={(e) =>
              setNewContact({ ...newContact, name: e.target.value })
            }
            style={{
              width: "60%",
              height: "2rem",
              paddingLeft: "1rem",
              fontSize: "1.3rem",
              backgroundColor: "#ebd491",
              borderRadius: "6px",
            }}
          />
          <input
            type="text"
            placeholder="Phone"
            value={newContact.mobile}
            onChange={(e) =>
              setNewContact({ ...newContact, mobile: e.target.value })
            }
            style={{
              width: "60%",
              height: "2rem",
              paddingLeft: "1rem",
              fontSize: "1.3rem",
              backgroundColor: "#ebd491",
              borderRadius: "6px",
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={newContact.email}
            onChange={(e) =>
              setNewContact({ ...newContact, email: e.target.value })
            }
            style={{
              width: "60%",
              height: "2rem",
              paddingLeft: "1rem",
              fontSize: "1.3rem",
              backgroundColor: "#ebd491",
              borderRadius: "6px",
            }}
          />
          <button
            style={{
              width: "60%",
              height: "2rem",
              paddingLeft: "1rem",
              fontSize: "1.2rem",
              cursor: "pointer",
            }}
            type="submit"
          >
            Edit Contact
          </button>
        </form>
      </div>
    </>
  );
}

export default EditForm;
