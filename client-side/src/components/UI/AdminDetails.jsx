import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { FaTrash } from "react-icons/fa"; // Importing Trash icon for Delete action
import "./AdminDetails.css"; // Custom CSS

const AdminDetails = () => {
  const { name } = useParams();
  const [data, setData] = useState(null);
  console.log(name);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.0.104:8000/api/admin/${name}`
        );
        setData(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [name]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://192.168.0.104:8000/api/admin/${name}/${id}`
      );
      setData((prevData) => ({
        ...prevData,
        data: prevData.data.filter((row) => row.id !== id),
      }));
    } catch (error) {
      console.error(error);
    }
  };

  console.log(data);

  return (
    <div className="admin__data">
      {data ? (
        <Table className="modern-table" striped bordered hover>
          <thead>
            <tr>
              {data.data &&
                data.data[0] &&
                Object.keys(data.data[0]).map((column) => (
                  <th key={column}>{column}</th>
                ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.data &&
              data.data.length > 0 &&
              data.data.map((row) => (
                <tr key={row.id}>
                  {Object.keys(row).map((column) => (
                    <td key={`${row.id}-${column}`}>
                      {typeof row[column] === "boolean"
                        ? row[column].toString()
                        : row[column]}
                    </td>
                  ))}
                  <td>
                    <Button
                      color="danger"
                      className="delete-btn"
                      onClick={() => handleDelete(row.id)}
                    >
                      <FaTrash /> Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AdminDetails;
