import { helper } from "lib/helper";
import usersModel from "models/users.model";
import vehicleModel from "models/vehicle.model";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Table,
  Container,
  Row,
  Media,
  Modal,
  ModalHeader,
  Form,
  ModalBody,
  FormGroup,
  Input,
  ModalFooter,
  Button,
  Col,
  Label,
} from "reactstrap";
import AddModal from "views/components/AddModal";
import EditModal from "views/components/EditModal";
// core components
import TablePagination from "views/components/TablePagination";

const DriverDetail = () => {
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const togglee = () => setModal1(!modal1)
  const toggle = () => setModal(!modal);
  const location = useLocation();
  const navigate = useNavigate();
  const { user_id } = useParams();
  const searchParams = new URLSearchParams(location.search);
  const [isLoading, setIsLoading] = useState(true);
  const [dataList, setDataList] = useState([]);
  const [modalName, setModalName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [show, setShow] = useState(false);
  const [docId, setDocId] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const [comment, setComment] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [editList, setEditList] = useState(null)
  const [formdata, setFormData] = useState({
    vehicle_model: "",
    purchase_year: "",
    registration_number: "",
    seat_offering: "",
    instruction: "",
    reg_number: ""
  })

  const [formEditdata, setFormEditData] = useState({
    vehicle_model: editList?.vehicle_model,
    purchase_year: editList?.purchase_year,
    registration_number: editList?.registration_number,
    seat_offering: editList?.seat_offering,
    instruction: editList?.instruction,
    reg_number: editList?.reg_number,
  })

  const toggleModal = (modalName) => {
    setModal(!modal);
    setModalName(modalName);
  };
  const toggleEditModal = (modalName) => {
    setEditModal(!editModal);
  };
  const handleClose = () => {
    setUpdateStatus("");
    setComment("");
    setDocId(null);
    setShow(false);
  };

  const handleShow = (documentId, status, docComment) => {
    setComment(docComment);
    setUpdateStatus(status);
    setDocId(documentId);
    setShow(true);
  };

  const parameters = {};
  for (let [key, value] of searchParams) {
    parameters[key] = value;
  }

  const getListData = async () => {
    setIsLoading(true);
    parameters.user_id = user_id;
    await vehicleModel
      .list(parameters)
      .then((result) => {
        setIsLoading(false);
        if (result) {
          setDataList(result);
          setCurrentPage(result?.meta?.current_page);
          setPerPage(result?.meta?.per_page);
        }
      })
      .catch((error) => {
        helper.sweetalert.toast(error.response?.data?.message, "warning");
      });
  };

  useEffect(() => {
    getListData();
  }, [location]);


  const handleDel = async (delId) => {
    helper.sweetalert
      .confirm("Are you sure you want to delete this Message", "info", true)
      .then((result) => {
        if (result.isConfirmed) {
          vehicleModel.delete(delId).then((res) => {
            console.log("res", res)
            helper.sweetalert.toast(res.data?.message);
            getListData();
          });
        }
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    const { vehicle_model, registration_number, purchase_year, seat_offering, instruction, reg_number } = formdata
    const fareData = new FormData()
    fareData.append('vehicle_model', vehicle_model)
    fareData.append('registration_number', registration_number)
    fareData.append('purchase_year', purchase_year)
    fareData.append('seat_offering', seat_offering)
    fareData.append('instruction', instruction)
    fareData.append('reg_number', reg_number)
    await vehicleModel
      .create(fareData)
      .then((result) => {
        setModal(false)
        helper.sweetalert.toast("Add Data Successfully");
        setIsLoading(false);
        getListData()
        setFormData({
          vehicle_model: "",
          purchase_year: "",
          registration_number: "",
          seat_offering: "",
          instruction: "",
          reg_number: ""
        })
      })
      .catch((error) => {
        helper.sweetalert.toast(error.response?.data?.message, "warning");
      });
  }
  const handleChangeFormdata = (event) => {
    setFormData({ ...formdata, [event.target.name]: event.target.value })
  }

  const handleEdit = async (editId) => {
    navigate(`/admin/user/drivers/vehicle/${editId?._id}`)
    setEditList(editId)
    getListData(editId)
    setEditModal(!editModal)
  }

  const handleEditSubmit = async (event) => {
    event.preventDefault()
    const { vehicle_model, registration_number, purchase_year, seat_offering, instruction, reg_number } = formEditdata
    const fareData = new FormData()
    fareData.append('vehicle_model', vehicle_model)
    fareData.append('registration_number', registration_number)
    fareData.append('purchase_year', purchase_year)
    fareData.append('seat_offering', seat_offering)
    fareData.append('instruction', instruction)
    fareData.append('reg_number', reg_number)
    await vehicleModel
      .create(fareData)
      .then((result) => {
        setEditModal(false)
        helper.sweetalert.toast("Updated Data Successfully");
        setIsLoading(false);
        getListData()
      })
      .catch((error) => {
        helper.sweetalert.toast(error.response?.data?.message, "warning");
      });
  }

  const handleChangeEditFormdata = (event) => {
    setFormEditData({ ...formEditdata, [event.target.name]: event.target.value })
  }

  useEffect(() => {
    if (editList) {
      setFormEditData({
        vehicle_model: editList?.vehicle_model || "",
        purchase_year: editList?.purchase_year || "",
        registration_number: editList?.registration_number || "",
        seat_offering: editList?.seat_offering || "",
        instruction: editList?.instruction || "",
        reg_number: editList?.reg_number || "",
      });
    }
  }, [editList]);

  return (
    <>
      <Container className="pt-7">
        {!isLoading && (
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0 d-flex justify-content-between ">
                  <h3 className="mb-0">Driver Vehicle Details</h3>
                  <div className="d-flex flex-row" >
                    <Input
                      className="mr-4"
                      type="text"
                      placeholder="Search"
                    />
                    <Button className="px-3"
                      onClick={() => toggleModal("Add10")}
                      size="sm" >+Add</Button>
                  </div>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>

                  <thead className="thead-light">
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">Vehicle Model</th>
                      <th scope="col">Vehicle Reg. Number</th>
                      <th scope="col">Purchase year</th>
                      <th scope="col">Seat Offering</th>
                      <th scope="col">Instruction</th>
                      <th scope="col">Status</th>
                      <th scope="col">Created At</th>
                      <th scope="col" />
                    </tr>
                  </thead>

                  <tbody>
                    {dataList?.data?.map((item, index) => {
                      let currentDate = new Date(item.createdAt);
                      let formattedDate = currentDate
                        .toISOString()
                        .substring(0, 10);
                      return (
                        <tr key={item._id}>
                          <td>{(currentPage - 1) * perPage + index + 1}</td>
                          <td>{item?.vehicle_model}</td>
                          <td>{item?.reg_number}</td>
                          <td>{item?.purchase_year}</td>
                          <td>{item?.seat_offering}</td>
                          <td>{item?.instruction}</td>
                          <td>
                            {item?.status === "approved" ? (
                              <Badge color="" className="badge-dot mr-4">
                                <i className="bg-success" />
                                Approved
                              </Badge>
                            ) : (
                              <Badge color="" className="badge-dot mr-4">
                                <i className="bg-warning" />
                                {helper.capitalizeLetter(item?.status)}
                              </Badge>
                            )}
                          </td>
                          <td>{formattedDate}</td>
                          <td>

                            <UncontrolledDropdown>

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
                                {item?.status !== "rejected" && (
                                  <>
                                    <DropdownItem
                                      onClick={() =>
                                        handleEdit(item)
                                      }
                                      className="text-warning"
                                    >
                                      <i class="fa-regular fa-pen-to-square"></i>{" "}
                                      Edit
                                    </DropdownItem>
                                  </>
                                )}
                                <DropdownItem
                                  onClick={() => handleDel(item._id)}
                                  className="text-danger"
                                >
                                  <i className="fas fa-trash"></i> Delete
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>

                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                  <TablePagination
                    totalPages={parseInt(dataList?.meta?.total_page)}
                    currentPage={parseInt(dataList?.meta?.current_page)}
                    pageUrl={`/admin/user/drivers/vehicle/${user_id}?`}
                  />
                </CardFooter>
              </Card>
            </div>
          </Row>
        )}

        <Modal size="lg" isOpen={modal1} toggle={togglee}>
          <ModalHeader toggle={togglee}>Add Vehicle Details</ModalHeader>
          <ModalBody>
            <Form>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">Vehicle Model</Label>
                    <Input id="name" name="name" type="name" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">Vehicle Reg. Number</Label>
                    <Input id="Email" name="Email" type="Email" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">Purchase Year</Label>
                    <Input id="contact" name="contact" type="number" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">Seat Offering</Label>
                    <Input id="status" name="status" type="status" />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button color="secondary" onClick={togglee}>
              Cancel
            </Button>
            <Button color="primary" onClick={togglee}>
              Save
            </Button>{" "}
          </ModalFooter>
        </Modal>
        <Modal size="lg" isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Edit Vehicle Details</ModalHeader>
          <ModalBody>
            <Form>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">Vehicle Model</Label>
                    <Input id="name" name="name" type="name" />
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">Vehicle Reg. Number</Label>
                    <Input id="Email" name="Email" type="Email" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">Purchase Year</Label>
                    <Input id="contact" name="contact" type="number" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail"> Seat Offering</Label>
                    <Input id="status" name="status" type="status" />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
            <Button color="primary" onClick={toggle}>
              Save
            </Button>
          </ModalFooter>
        </Modal>
          <AddModal
            modal={modal}
            Name="Add10"
            toggle={toggleModal}
            title="Add Vehicle Details"
            handleSubmit={handleSubmit}
            formData={formdata}
            handleChangeData={handleChangeFormdata}
          />
        <EditModal
          modal={editModal}
          Name="Edit5"
          toggle={toggleEditModal}
          title="Edit Vehicle Details"
          handleChangeData={handleChangeEditFormdata}
          formEditData={formEditdata}
          handleSubmit={handleEditSubmit}
        />
      </Container>
    </>
  );
};

export default DriverDetail;
