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
import usersModel from "models/users.model";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
} from "reactstrap";
// core components
import TablePagination from "views/components/TablePagination";
import EditModal from "views/components/EditModal";
import AddModal from "views/components/AddModal";

const DriverLists = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataList, setDataList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [statusUpdate, setStatusUpdate] = useState('')
  // const [editModal, setEditModal] = useState(false);
  // const [editList, setEditList] = useState(null)
  // const [modal, setModal] = useState(false);
  // const [modalName, setModalName] = useState("");
  // const [formEditdata, setFormEditData] = useState({
  //   email: editList?.email,
  //   contact_no: editList?.contact_no,
  //   name: editList?.name,
  // })
  // const [formdata, setFormData] = useState({
  //   email: "",
  //   contact_no: "",
  //   name: "",
  // })
  // const toggle = () => setModal(!modal);
  // const toggleModal = (modalName) => {
  //   setModal(!modal);
  //   setModalName(modalName);
  // };
  // const toggleEditModal = (modalName) => {
  //   setEditModal(!editModal);
  // };
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const parameters = {};
  for (let [key, value] of searchParams) {
    parameters[key] = value;
  }

   const updateStatus= async(id, status)=>{
    // const statusData={
    //   status:statusUpdate
    // }
    const formData = new FormData()
    formData.append('status', status)
      await usersModel
      .activeDeactivate(id, formData)
      .then((result) => {
        helper.sweetalert.toast("Updated Status Successfully");
        setIsLoading(false);
        getListData()
      })
      .catch((error) => {
        helper.sweetalert.toast(error.response?.data?.message, "warning");
      });
   }

  const getListData = async () => {
    setIsLoading(true);
    await usersModel
      .driverlist(parameters)
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

  const handleDel = async (delId) => {
    helper.sweetalert
      .confirm("Are you sure you want to delete this Message", "info", true)
      .then((result) => {
        if (result.isConfirmed) {
          usersModel.delete(delId).then((res) => {
            helper.sweetalert.toast(res.data?.message);
            getListData();
          });
        }
      });
  };

  // const handleEdit = async (editId) => {
  //   setEditList(editId)
  //   getListData(editId)
  //   setEditModal(!editModal)
  // }

  // const handleChangeEditFormdata = (event) => {
  //   setFormEditData({ ...formEditdata, [event.target.name]: event.target.value })
  // }

  // const handleEditSubmit = async (event) => {
  //   event.preventDefault()
  //   const { email, contact_no, name } = formEditdata
  //   const fareData = new FormData()
  //   fareData.append('email', email)
  //   fareData.append('contact_no', contact_no)
  //   fareData.append('name', name)
  //   await usersModel
  //     .update(editList?._id, fareData)
  //     .then((result) => {
  //       setEditModal(false)
  //       helper.sweetalert.toast("Updated Data Successfully");
  //       setIsLoading(false);
  //       getListData()
  //     })
  //     .catch((error) => {
  //       helper.sweetalert.toast(error.response?.data?.message, "warning");
  //     });
  // }

  // const handleSubmit = async (event) => {
  //   event.preventDefault()
  //   const { email,contact_no,name } = formdata
  //   const fareData = new FormData()
  //   fareData.append('email', email)
  //   fareData.append('contact_no', contact_no)
  //   fareData.append('name', name)
  //   await usersModel
  //     .createAdmin(fareData)
  //     .then((result) => {
  //       setModal(false)
  //       helper.sweetalert.toast("Add Data Successfully");
  //       setIsLoading(false);
  //       getListData()
  //       setFormData({
  //         email: "",
  //         contact_no: "",
  //         name: "",
  //       })
  //     })
  //     .catch((error) => {
  //       helper.sweetalert.toast(error.response?.data?.message, "warning");
  //     });
  // }
  // const handleChangeFormdata = (event) => {
  //   setFormData({ ...formdata, [event.target.name]: event.target.value })
  // }

  useEffect(() => {
    getListData();
  }, [location]);

  // useEffect(() => {
  //   if (editList) {
  //     setFormEditData({
  //       name: editList?.name || "",
  //       contact_no: editList?.contact_no || "",
  //       email: editList?.email || "",
  //     });
  //   }
  // }, [editList]);

  return (
    <>
      <Container className="pt-7">
        {!isLoading && (
          <Row>
            <div className="col">
              <Card className="shadow">
                    <CardHeader className="border-0 d-flex justify-content-between ">
                  <h3 className="mb-0">Drivers Lists</h3>
                  <div className="d-flex flex-row" >
                    <Input
                      className="mr-4"
                      type="text"
                      placeholder="Search"
                    />
                    {/* <Button className="px-3"
                      onClick={() => toggleModal("Add11")}
                      size="sm" >+Add</Button> */}
                  </div>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Contact No.</th>
                      <th scope="col">Status</th>
                      <th scope="col">Created On</th>
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
                          <td>{item?.name}</td>
                          <td>{item?.email}</td>
                          <td>{item?.contact_no}</td>
                          <td>
                            {item?.status === "active" ? (
                              <Badge color="" className="badge-dot mr-4">
                                <i className="bg-success" />
                                Active
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
                                {/* <DropdownItem
                                  className="text-warning"
                                  onClick={() =>
                                    handleEdit(item)
                                  }
                                >
                                  <i class="fa-regular fa-pen-to-square"></i> Edit
                                </DropdownItem> */}
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
                                  onClick={(e) =>
                                    navigate(
                                      `/admin/user/drivers/vehicle/${item?._id}`
                                    )
                                  }
                                  className="text-success"
                                >
                                  <i className="fas fa-taxi"></i> Vehicle
                                </DropdownItem>
                                <DropdownItem className="text-primary">
                                  <Button onClick={()=>{
                                    updateStatus(item?._id, 'active')
                                  }} color="success" outline>
                                    Activate
                                  </Button>

                                  <Button  onClick={()=>{
                                    updateStatus(item?._id,'deactivate')
                                  }} color="warning" outline>
                                    Deactivate
                                  </Button>
                                </DropdownItem>

                                <DropdownItem
                                  onClick={() => { handleDel(item._id) }}
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
                    pageUrl="/admin/drivers?"
                  />
                </CardFooter>
              </Card>
            </div>
          </Row>
        )}

        {/* <Modal size="lg" isOpen={modal} toggle={toggle}>
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
        </Modal> */}
       {/* {modalName === "Add11" && <AddModal
            modal={modal}
            Name="Add11"
            toggle={toggleModal}
            title="Add Vehicle Details"
            handleSubmit={handleSubmit}
            formData={formdata}
            handleChangeData={handleChangeFormdata}
          />}
        <EditModal
          modal={editModal}
          Name="Edit6"
          toggle={toggleEditModal}
          title="Edit Vehicle Details"
          handleChangeData={handleChangeEditFormdata}
          formEditData={formEditdata}
          handleSubmit={handleEditSubmit}
        /> */}
      </Container>
    </>
  );
};

export default DriverLists;
