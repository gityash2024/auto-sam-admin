import { helper } from "lib/helper";
import usersModel from "models/users.model";
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
} from "reactstrap";
// core components
import TablePagination from "views/components/TablePagination";

const DriverDocuments = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataList, setDataList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);
  const [docId, setDocId] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const [comment, setComment] = useState("");
  const handleClose = () => {
    setUpdateStatus("");
    setComment("");
    setDocId(null);
    setShow(false);
  }
  const handleShow = (documentId, status, docComment) => {
    setComment(docComment);
    setUpdateStatus(status);
    setDocId(documentId);
    setShow(true);
  }

  const location = useLocation();
  const navigate = useNavigate();
  
  const { user_id } = useParams();

  const searchParams = new URLSearchParams(location.search);
  const parameters = {};
  for (let [key, value] of searchParams) {
    parameters[key] = value;
  }

  const getListData = async () => {
    setIsLoading(true);
    parameters.user_id = user_id;
    await usersModel.driverDoclist(parameters).then((result) => {
      setIsLoading(false)
      if (result) {
        setDataList(result);
        setCurrentPage(result?.meta?.current_page);
        setPerPage(result?.meta?.per_page);
      }
    }).catch((error) => {
      helper.sweetalert.toast(error.response?.data?.message, "warning")
    });
  }

  const handleDel = async (delId) => {
    helper.sweetalert
    .confirm("Are you sure you want to delete this Message", "info", true)
    .then((result) => {
      if (result.isConfirmed) {
        usersModel.delete(delId).then((res) => {
          console.log("res",res)
          helper.sweetalert.toast(res.data?.message);
          getListData();
        });
      }
    });
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      if (updateStatus === "approve") {
        usersModel.approveDriverDoc(docId, formData).then((res) => {
          console.log("ressss", res);
          helper.sweetalert.toast(res?.message);
          handleClose();
          getListData();
        })
      } else {
        usersModel.rejectDriverDoc(docId, formData).then((res) => {
          helper.sweetalert.toast(res?.message);
          handleClose();
          getListData();
        })
      }
    } catch (err) {
      console.clear();
      helper.sweetalert.toast(err?.message, "warning");
    }
  }
  useEffect(() => {
    getListData();
  }, [location])
  return (
    <>
      <Container className="pt-7" >
        {!isLoading && (
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Driver Documents</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">Document</th>
                      <th scope="col">Front</th>
                      <th scope="col">Back</th>
                      <th scope="col">Status</th>
                      <th scope="col">Created On</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {dataList?.data?.map((item, index) => {
                      let currentDate = new Date(item.createdAt);
                      let formattedDate = currentDate.toISOString().substring(0, 10);
                      return (
                        <tr key={item._id}>
                          <td>{((currentPage-1) * perPage) + index + 1}</td>
                          <td>{item?.document_type}</td>
                          <td>
                            <Media className="align-items-center">
                              <a
                                className="avatar rounded-circle mr-3"
                                href={item?.front_img}
                                target="_blank"
                              >
                                <img
                                  alt="..."
                                  src={item?.front_img}
                                />
                              </a>
                            </Media>
                          </td>
                          <td>
                            <Media className="align-items-center">
                              <a
                                className="avatar rounded-circle mr-3"
                                href={item?.front_img}
                                target="_blank"
                              >
                                <img
                                  alt="..."
                                  src={item?.front_img}
                                />
                              </a>
                            </Media>
                          </td>
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
                              <DropdownMenu className="dropdown-menu-arrow " right>
                                {item?.status !== "approved" && (
                                  <>
                                    <DropdownItem
                                      onClick={() => handleShow(item._id, "approve", item?.comment)}
                                      className="text-success"
                                    >
                                      <i className="fas fa-check"></i> Approve
                                    </DropdownItem>
                                  </>
                                )}

                                {item?.status !== "rejected" && (
                                  <>
                                    <DropdownItem
                                      onClick={() => handleShow(item._id, "reject", item?.comment)}
                                      className="text-warning"
                                    >
                                      <i className="fas fa-times"></i> Reject
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
                    pageUrl={`/admin/drivers/documents/${user_id}?`}
                  />
                </CardFooter>
              </Card>
            </div>
          </Row>
        )}
        <Modal isOpen={show} toggle={toggle}>
          <ModalHeader toggle={toggle}>{helper.capitalizeLetter(updateStatus)} Document</ModalHeader>
          <Form onSubmit={handleUpdateStatus}>
            <ModalBody>
              <Row>
                <Col lg="12">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-comment"
                    >
                      Comment
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-comment"
                      placeholder="Comment"
                      type="textarea"
                      name="comment"
                      defaultValue={comment}
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="warning" onClick={handleClose} type="button">
                Cancel
              </Button>{' '}
              <Button color={updateStatus === "approve" ? "success" : "danger"} >
                {helper.capitalizeLetter(updateStatus)}
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </Container>
    </>
  );
};

export default DriverDocuments;
