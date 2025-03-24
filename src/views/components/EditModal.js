import React from "react";
import { Button } from "reactstrap";

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

const EditModal = ({handleFileChange, toggle, modal, title, Name, handleChangeData, formEditData, handleSubmit, stateData, cityData }) => {
  const showData = () => {
    switch (Name) {
      case "Edit1":
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
                      value={formEditData?.state_id}
                      onChange={handleChangeData}
                    >
                      <option value="">Select State</option>
                      {
                        stateData?.data?.map((ele) => (
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
                      value={formEditData?.city_id}
                      onChange={handleChangeData}
                    >
                      <option value="">Select City</option>
                      {
                        cityData?.data?.map((ele) => (
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
                      value={formEditData?.name}
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
                      value={formEditData?.baseKm}
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
                      value={formEditData?.baseKmFare}
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
                      value={formEditData?.vehicleType}
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
                      value={formEditData?.perKmFare}
                      onChange={handleChangeData}
                    ></Input>
                  </FormGroup>
                </Col>
              </Row>
            </form>
          </>
        );
        case "Edit2":
          return (
            <>
              <form onSubmit={handleSubmit}>
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
                      type="file" onChange={handleFileChange}
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
                      value={formEditData?.forType}
                      onChange={handleChangeData}
                    />
                  </FormGroup>
                  </Col>
                </Row>
  
                <Row>
                  <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">Status</Label>
                    <Input id="status" name="status" type="select" value={formEditData?.status}
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
                      value={formEditData?.type}
                      onChange={handleChangeData}
                    />
                  </FormGroup>
                  </Col>
                </Row>
              </form>
            </>
          );
          case "Edit3":
            return (
              <>
                <Form>
                  <Row>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="exampleEmail">FAQ Type</Label>
                        <Input  id="faqType" name="faqType" type="select" value={formEditData?.faqType ? formEditData?.faqType : formEditData.type}
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
                        <Input id="question" name="question" type="text" value={formEditData?.question? formEditData?.question:formEditData?.status}
                          onChange={handleChangeData} />
                      </FormGroup>
                    </Col>
                  </Row>
    
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label for="exampleEmail">Answer</Label>
                        <Input id="answer" name="answer" type="textarea" value={formEditData?.answer? formEditData?.answer:formEditData?.forType}
                          onChange={handleChangeData} />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </>
            );
            case "Edit4":
            return (
              <>
              <Form>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleEmail" >Coupen Code</Label>
                      <Input id="code" name="code" type="text" value={formEditData?.code}
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
                        value={formEditData?.discountUpto}
                        onChange={handleChangeData}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleEmail">Validity</Label>
                      <Input id="validity" name="validity" type="validity"  value={formEditData?.validity}
                        onChange={handleChangeData} />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleEmail">Total Usage</Label>
                      <Input id="totalUsage" name="totalUsage" type="totalUsage"  value={formEditData?.totalUsage}
                        onChange={handleChangeData} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleEmail">Status</Label>
                      <Input id="status" name="status" type="select"  value={formEditData?.status}
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
                      <Input id="type" name="type" type="type"  value={formEditData?.type}
                        onChange={handleChangeData} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                <Col md={6}>
                    <FormGroup>
                      <Label for="exampleEmail">Valid From</Label>
                      <Input id="validFrom" name="validFrom" type="text"  value={formEditData?.validFrom}
                        onChange={handleChangeData} />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleEmail">Valid To</Label>
                      <Input id="validTo" name="validTo" type="text"  value={formEditData?.validTo}
                        onChange={handleChangeData} />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </>
            );
            case "Edit5":
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
                            value={formEditData?.vehicle_model}
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
                            value={formEditData?.registration_number}
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
                            value={formEditData?.purchase_year}
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
                            value={formEditData?.seat_offering}
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
                            value={formEditData?.instruction}
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
                            value={formEditData?.reg_number}
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
        <Form onSubmit={handleSubmit}>
          <ModalHeader toggle={toggle}>{title}</ModalHeader>
          <ModalBody>{showData()}</ModalBody>
          <ModalFooter style={{ display: "flex", justifyContent: "space-between" }}>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Save
            </Button>{" "}
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};

export default EditModal;
