import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Form } from "react-bootstrap";

const RegistrationFrom = ({
  currentStep,
  setCurrentStep,
  checkOutFormData,
  setCheckOutFormData,
}) => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    company: "",
    designation: "",
    purpose: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setCheckOutFormData((prevData) => ({
      ...prevData,
      memberDetails: {
        ...prevData.memberDetails,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setTimeout(() => {
      setCurrentStep(currentStep + 1);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        name="name"
        size="small"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="dense"
        className="w-md-50 w-100"
        required
      />
      <TextField
        label="Email"
        name="email"
        size="small"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="dense"
        className="w-md-50 w-100"
        required
      />
      <TextField
        label="Company"
        name="company"
        size="small"
        value={formData.company}
        onChange={handleChange}
        fullWidth
        margin="dense"
        required
      />
      <TextField
        label="Designation"
        name="designation"
        size="small"
        value={formData.designation}
        onChange={handleChange}
        fullWidth
        margin="dense"
        required
      />

      <Form.Group controlId="demo-select" className="mt-2">
        <Form.Label>
          What are your main objectives for visiting Nutrify C Suite Summit
        </Form.Label>
        <Form.Select
          name="purpose"
          className="selectField"
          // defaultValue={"Networking"}
          value={formData.purpose}
          onChange={handleChange}
          required
        >
          {[
            "Networking",
            "To buy / source new products / services",
            "To conclude deals / sign orders with suppliers",
            "To consider exhibiting in future",
            "To find new releases and market trends",
            "To learn about the latest technologies",
            "To meet with existing suppliers",
            "To see the latest research and developments",
          ].map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        className="mt-3 w-100"
      >
        Book Ticket
      </Button>
    </form>
  );
};

export default RegistrationFrom;
