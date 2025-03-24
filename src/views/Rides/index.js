import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Col,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import { helper } from "lib/helper";
import { useEffect } from "react";
import { useLocation,  } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardFooter,
  Table,
  Container,
  Row,
} from "reactstrap";
// core components
import TablePagination from "views/components/TablePagination";
import rideModel from "models/ride.model";

const RideLists = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataList, setDataList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [formData, setFormData] = useState("")
  const [modal, setModal] = useState(false);
 
  const toggle = () => setModal(!modal);

  const handleChangeFormdata = (event) => {
    setFormData({ [event.target.name]: event.target.value })
  }

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const parameters = {};
  for (let [key, value] of searchParams) {
    parameters[key] = value;
  }

  const getListData = async () => {
    setIsLoading(true);
    parameters.status = formData.status;
    await rideModel.rideList(formData  ? parameters:'').then((result) => {
      setIsLoading(false)
      if (result) {
        setDataList(result);
        setCurrentPage(result?.meta?.current_page);
        setPerPage(result?.meta?.per_page);
      }
    }).catch((error) => {
      helper.sweetalert.toast(error.response?.data?.message, "warning")
    });
  };

  useEffect(() => {
    getListData();
  }, [location, formData]);

  return (
    <>
      <Container className="pt-7">
        {!isLoading && (
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0 d-flex justify-content-between">
                  <h3 className="mb-0">Ride Lists</h3>
                  <Col md={4}>
                    <FormGroup className="mb-0">
                      <Input
                        name="status"
                        type="select"
                        placeholder="Select status"
                        value={formData?.status}
                        onChange={handleChangeFormdata}
                      >
                        <option value="">Select status</option>
                        <option value="booked">Booked</option>
                        <option value="started">Started</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">User Name</th>
                      <th scope="col">Driver Name</th>
                      <th scope="col">Created At</th>
                      <th scope="col">distance Unit</th>
                      <th scope="col">vehicle Type</th>
                      <th scope="col">status</th>
                      <th scope="col">Pick Address</th>
                      <th scope="col">Drop Address</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {dataList?.data?.map((item, index) => {
                      let currentDate = new Date(item.userId?.createdAt);
                      let formattedDate = currentDate
                        .toISOString()
                        .substring(0, 10);
                      return (
                        <tr key={item._id}>
                          <td>{(currentPage - 1) * perPage + index + 1}</td>
                          <td>{item?.userId?.name}</td>
                          <td>{item?.driverId?.name}</td>
                          <td>{formattedDate}</td>
                          <td>{item?.distanceUnit}</td>
                          <td>{item?.vehicleType}</td>
                          <td>{item?.status}</td>
                          <td>{item?.pickAddress}</td>
                          <td>{item?.dropAddress}</td>
                          {/* <td>{formattedDate}</td> */}
                          {/* <td>
                            <UncontrolledDropdown key={`dropdown${item._id}`}>
                              <DropdownToggle
                                className="btn-icon-only text-light"
                                role="button"
                                size="sm"
                                color=""
                                onClick={(e) => e.preventDefault()}
                              >
                                <i className="fas fa-ellipsis-v" />
                              </DropdownToggle>
                              <DropdownMenu
                                className="dropdown-menu-arrow "
                                right
                              >
                                <DropdownItem
                                  // onClick={(e) => navigate(`/admin/drivers/documents/${item?._id}`)}
                                  className="text-primary"
                                  onClick={toggle}
                                >
                                  <i class="far fa-edit"></i> Edit
                                </DropdownItem>

                                <DropdownItem
                                  onClick={(e) =>
                                    navigate(
                                      `/admin/drivers/documents/${item?._id}`
                                    )
                                  }
                                  className="text-primary"
                                >
                                  <i className="fas fa-file-alt"></i> Documents
                                </DropdownItem>

                                <DropdownItem
                                  // onClick={(e) => e.preventDefault()}
                                  onClick={(e) =>
                                    navigate(
                                      `/admin/drivers/vehicledetail/${item?._id}`
                                    )
                                  }
                                  className="text-success"
                                >
                                  <i className="fas fa-taxi"></i> Vehicle
                                </DropdownItem>

                                <DropdownItem className="text-primary">
                                  <Button color="success" outline>
                                    Enable
                                  </Button>

                                  <Button color="warning" outline>
                                    Disable
                                  </Button>
                                </DropdownItem>

                                <DropdownItem
                                  onClick={(e) => e.preventDefault()}
                                  className="text-danger"
                                >
                                  <i className="fas fa-trash"></i> Delete
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td> */}
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                  <TablePagination
                    totalPages={parseInt(dataList?.meta?.total_page)}
                    currentPage={parseInt(dataList?.meta?.current_page)}
                    pageUrl="/admin/ride?"
                  />
                </CardFooter>
              </Card>
            </div>
          </Row>
        )}
        <Modal size="lg" isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Driver Details</ModalHeader>
          <ModalBody>
            <Form>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">Name</Label>
                    <Input
                      id="name"
                      name="name"

                      type="name"
                    />
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input
                      id="Email"
                      name="Email"

                      type="Email"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">Contact</Label>
                    <Input
                      id="contact"
                      name="contact"

                      type="number"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">Status</Label>
                    <Input
                      id="status"
                      name="status"
                      type="status"
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>
              Save
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </>
  );
};

export default RideLists;
