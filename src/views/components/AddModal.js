import React, { useState } from "react";
import { Table, Button, Card } from "reactstrap";

import {
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";

const AddModal = ({ toggle, modal, title, Name, handleChangeData, formData,handleSubmit,stateData,cityData,handleFileChange }) => {
  const [checkedAll, setCheckedAll] = useState(false);
  
  const [checkboxes, setCheckboxes] = useState(Array(5).fill(false)); // Assuming 5 rows for demonstration
  const [viewChecked, setViewChecked] = useState(false);

  const [checkAdd, setcheckAdd] = useState(false);
  const [deleteChecked, setDeleteChecked] = useState(false);

  const handleCheckboxChange = (index) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = !newCheckboxes[index];
    setCheckboxes(newCheckboxes);
  };

  const handleAddButtonClick = () => {
    setCheckboxes(Array(5).fill(!checkedAll));

    setCheckedAll(!checkedAll);
    setcheckAdd(!checkAdd)
    setViewChecked(!checkedAll);
    setDeleteChecked(!checkedAll);
    // setCheckedAll(!checkedAll);
  };

  const showData = () => {
    switch (Name) {
      case "Add1":
        return (
          <>
            <Form>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">Banner Image</Label>
                    <Input
                      style={{
                        border: "1px solid lightgrey",
                        padding: "6px 10px",
                        borderRadius: "6px",
                      }}
                      id="image"
                      type="file"
                       onChange={handleFileChange}
                    />
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">ForType</Label>
                    <Input
                      id="forType"
                      name="forType"
                      type="forType"
                      placeholder="Enter forType Name"
                      value={formData?.forType}
                      onChange={handleChangeData}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">Status</Label>
                    <Input id="status" name="status" type="select" value={formData?.status}
                      onChange={handleChangeData}>
                      <option value="">Select Status</option>
                      <option value="active">Active</option>
                      <option value="deleted">Deleted</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">Type</Label>
                    <Input
                      id="type"
                      name="type"
                      type="type"
                      placeholder="Enter type Name"
                      value={formData?.type}
                      onChange={handleChangeData}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </>
        );
      case "Add2":
        return (
          <>
            <Form>
              <Row>
                <Col md={4}>
                  <FormGroup>
                    <Label for="exampleEmail">FAQ Type</Label>
                    <Input  id="faqType" name="faqType" type="select" value={formData?.faqType}
                      onChange={handleChangeData}>
                      <option value="">Select faq type</option>
                      <option value="driver">Driver</option>
                      <option value="user">User</option>
                      <option value="both">Both</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col>
                  <FormGroup>
                    <Label for="exampleEmail" >Question</Label>
                    <Input id="question" name="question" type="text"   value={formData?.question}
                      onChange={handleChangeData} />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col>
                  <FormGroup>
                    <Label for="exampleEmail">Answer</Label>
                    <Input id="answer" name="answer" type="textarea"   value={formData?.answer}
                      onChange={handleChangeData} />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </>
        );

      case "Add3":
        return (
          <>
            <Form>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail" >Coupen Code</Label>
                    <Input id="code" name="code" type="text" value={formData?.code}
                      onChange={handleChangeData} />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">Discount % </Label>
                    <Input
                      id="discountUpto"
                      name="discountUpto"
                      type="namdiscountUptoe"
                      placeholder="Enter Discount"
                      value={formData?.discountUpto}
                      onChange={handleChangeData}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">Validity</Label>
                    <Input id="validity" name="validity" type="validity"  value={formData?.validity}
                      onChange={handleChangeData} />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">Total Usage</Label>
                    <Input id="totalUsage" name="totalUsage" type="totalUsage"  value={formData?.totalUsage}
                      onChange={handleChangeData} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">Status</Label>
                    <Input id="status" name="status" type="select"  value={formData?.status}
                      onChange={handleChangeData}>
                         <option value="">select Status</option>
                      <option value="active">Activate</option>
                      <option value="deactive">Deactivate</option>
                      <option value="pending">Pending</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">Type</Label>
                    <Input id="type" name="type" type="type"  value={formData?.type}
                      onChange={handleChangeData} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
              <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">Valid From</Label>
                    <Input id="validFrom" name="validFrom" type="text"  value={formData?.validFrom}
                      onChange={handleChangeData} />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">Valid To</Label>
                    <Input id="validTo" name="validTo" type="text"  value={formData?.validTo}
                      onChange={handleChangeData} />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </>
        );

      case "Add6":
        return (
          <>
            <form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                   <FormGroup>
                    <Label for="exampleEmail">State</Label>
                    <Input
                      name="state_id"
                      type="select"
                      placeholder="Select State"
                      value={formData?.state_id}
                      onChange={handleChangeData}
                    >
                       <option value="">Select State</option>
                      {
                        stateData?.data?.map((ele)=>(
                          <option value={ele?._id}>{ele?.name}</option> 
                        ))
                      }
                    </Input>
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">City</Label>
                    <Input
                      name="city_id"
                      type="select"
                      placeholder="Select City"
                      value={formData?.city_id}
                      onChange={handleChangeData}
                    >
                       <option value="">Select City</option>
                      {
                        cityData?.data?.map((ele)=>(
                          <option value={ele?._id}>{ele?.name}</option> 
                        ))
                      }
                    </Input>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">Fare Name</Label>
                    <Input
                      id="contact"
                      name="name"
                      type="text"
                      placeholder=" Enter Fare Name"
                      value={formData?.name}
                      onChange={handleChangeData}
                    />
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">Base KM</Label>
                    <Input
                      id="status"
                      name="baseKm"
                      type="status"
                      placeholder=" Enter Base Kilometer"
                      value={formData?.baseKm}
                      onChange={handleChangeData}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">Base KM Fare</Label>
                    <Input
                      id="contact"
                      name="baseKmFare"
                      type="text"
                      placeholder=" Enter Base KM Fare"
                      value={formData?.baseKmFare}
                      onChange={handleChangeData}
                    />
                  </FormGroup>
                </Col>

                <Col md={6}>
                 
                  <FormGroup>
                    <Label for="exampleEmail">Vehicle Modal</Label>
                    <Input
                      name="vehicleType"
                      type="select"
                      placeholder="Select Vehicle"
                      value={formData?.vehicleType}
                      onChange={handleChangeData}
                    >
                       <option value="">Select Vehicle</option>
                      <option value="share">Share auto</option>
                      <option value="private">Private auto</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">Per KM FARE </Label>
                    <Input
                      id="contact"
                      name="perKmFare"
                      type="text"
                      placeholder=" Enter Fare Per KiloMeter"
                      value={formData?.perKmFare}
                      onChange={handleChangeData}
                    ></Input>
                  </FormGroup>
                </Col>

                {/* <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">Status</Label>
                    <Input id="contact" name="contact" type="select">
                      <option value="">Activate</option>
                      <option value="option1">Deactivate</option>
                      <option value="option2">Pending</option>
                    </Input>
                  </FormGroup>
                </Col> */}
              </Row>
            </form>
          </>
        );

      case "Add8":
        return (
          <>
            <Form>
              {/* <Card> */}
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Name</th>

                    <th scope="col">
                      <Button
                        variant="primary"
                        size="sm"
                        checked={checkAdd}
                        onClick={handleAddButtonClick}
                      >
                        {checkedAll ? "+" : "-"}
                      </Button>
                    </th>

                    <th scope="col">
                      <input
                        type="checkbox"
                        checked={viewChecked}
                        onChange={() => setViewChecked(!viewChecked)}
                      />{" "}
                      View
                    </th>

                    <th scope="col">
                      <input
                        type="checkbox"
                        checked={deleteChecked}
                        onChange={() => setDeleteChecked(!deleteChecked)}
                      />{" "}
                      Delete
                    </th>

                  
                  </tr>
                </thead>

                <tbody>
                  {checkboxes.map((checked, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>

                      <td>Name {index + 1}</td>

                      <td>
                        <input
                          type="checkbox"
                          checked={checked || viewChecked}
                          onChange={() => handleCheckboxChange(index)}
                        />
                      </td>

                      <td>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => handleCheckboxChange(index)}
                        />
                      </td>

                      <td>
                        <input
                          type="checkbox"
                          checked={checked || deleteChecked}
                          onChange={() => handleCheckboxChange(index)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* </Card> */}
            </Form>
          </>
        );
        case "Add9":
          return (
            <>
              <Form>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleEmail">User Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="User Name"
                      />
                    </FormGroup>
                  </Col>
  
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleEmail">Mobile Number </Label>
                      <Input
                        id="name"
                        name="name"
                        type="name"
                        placeholder="Mobile Number"
                      />
                    </FormGroup>
                  </Col>
                </Row>
  
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleEmail">Email</Label>
                      <Input
                        id="contact"
                        name="contact"
                        type="email"
                        placeholder=" Enter Email"
                      />
                    </FormGroup>
                  </Col>
  
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleEmail">City</Label>
                      <Input
                        id="status"
                        name="status"
                        type="status"
                        placeholder=" Enter City"
                      />
                    </FormGroup>
                  </Col>
                </Row>
  
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleEmail">Gender</Label>
                      <Input
                        id="contact"
                        name="text"
                        type="select"
                        // placeholder=" Enter Base KM Fare"
                      >
                         <option value="">Male</option>
                      <option value="option1">Female</option>
                      <option value="option2">Other</option>

                       
                      </Input>
                    </FormGroup>
                  </Col>
  
                  {/* <Col md={6}>
                    <FormGroup>
                      <Label for="exampleEmail">Vehicle Modal</Label>
                      <Input
                        id="contact"
                        name="text"
                        type="select"
                        placeholder="Select Vehicle"
                      >
                        <option value="">Sedan</option>
                        <option value="option1">HathBack</option>
                        <option value="option2">SUV</option>
                      </Input>
                    </FormGroup>
                  </Col> */}
                </Row>
  
                <Row>
                  {/* <Col md={6}>
                    <FormGroup>
                      <Label for="exampleEmail">Per KM FARE </Label>
                      <Input
                        id="contact"
                        name="contact"
                        type="text"
                        placeholder=" Enter Fare Per KiloMeter"
                      ></Input>
                    </FormGroup>
                  </Col> */}
  
                  {/* <Col md={6}>
                    <FormGroup>
                      <Label for="exampleEmail">Status</Label>
                      <Input id="contact" name="contact" type="select">
                        <option value="">Activate</option>
                        <option value="option1">Deactivate</option>
                        <option value="option2">Pending</option>
                      </Input>
                    </FormGroup>
                  </Col> */}
                </Row>
              </Form>
            </>
          );
          case "Add10":
          return (
            <>
              <Form>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleEmail">Vehicle Model</Label>
                      <Input
                        id="vehicle_model"
                        name="vehicle_model"
                        type="text"
                        placeholder="Vehicle Model"
                        value={formData?.vehicle_model}
                        onChange={handleChangeData}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleEmail">Registration Number</Label>
                      <Input
                        id="registration_number"
                        name="registration_number"
                        type="text"
                        placeholder="Registration Number"
                        value={formData?.registration_number}
                        onChange={handleChangeData}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleEmail">Purchase Year</Label>
                      <Input
                        id="purchase_year"
                        name="purchase_year"
                        type="text"
                        placeholder="Purchase Year"
                        value={formData?.purchase_year}
                        onChange={handleChangeData}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleEmail">Seat Offering</Label>
                      <Input
                        id="seat_offering"
                        name="seat_offering"
                        type="text"
                        placeholder="Seat Offering"
                        value={formData?.seat_offering}
                        onChange={handleChangeData}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleEmail">Instruction</Label>
                      <Input
                        id="instruction"
                        name="instruction"
                        type="text"
                        placeholder="Instruction"
                        value={formData?.instruction}
                        onChange={handleChangeData}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleEmail">Reg Number</Label>
                      <Input
                        id="reg_number"
                        name="reg_number"
                        type="text"
                        placeholder="Reg Number"
                        value={formData?.reg_number}
                        onChange={handleChangeData}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </>
          );
      default:
        return null;
    }
  };
  return (
    <>
      <Modal size="lg" isOpen={modal} toggle={toggle}>
        {/* <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>{showData()}</ModalBody>
        <ModalFooter
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
          <Button type="submit" color="primary" onClick={toggle}>
            Save
          </Button>{" "}
        </ModalFooter> */}
         <Form onSubmit={handleSubmit}> {/* Form tag wrapped around the modal */}
          <ModalHeader toggle={toggle}>{title}</ModalHeader>
          <ModalBody>{showData()}</ModalBody>
          <ModalFooter style={{ display: "flex", justifyContent: "space-between" }}>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
            <Button color="primary" type="submit" onClick={handleSubmit}>
              Save
            </Button>{" "}
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};

export default AddModal;
