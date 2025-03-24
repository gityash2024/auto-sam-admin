import { helper } from "lib/helper";
import contact_usModel from "models/contact_us.model";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
  Input,
  Button,
} from "reactstrap";
import AddModal from "views/components/AddModal";
// core components
import TablePagination from "views/components/TablePagination";

const BookManagement = () => {
  const [modal, setModal] = useState(false);

  const toggleModal = (modalName) => {
    setModal(!modal);
  };

  const [isLoading, setIsLoading] = useState(true);
  const [dataList, setDataList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const parameters = {};
  for (let [key, value] of searchParams) {
    parameters[key] = value;
  }

  const getListData = async () => {
    setIsLoading(true);
    await contact_usModel
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
          contact_usModel.delete(delId).then((res) => {
            helper.sweetalert.toast(res.data?.message);
            getListData();
          });
        }
      });
  };

  return (
    <>
      <Container className="pt-7">
        {!isLoading && (
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0 d-flex justify-content-between ">
                  <h3 className="mb-0">Booking Management</h3>

                  <div className="d-flex flex-row">
                    
                    <Input
                      className="mr-4"
                      type="text"
                      placeholder="Search"
                      // size='sm'
                    />
                    
                    {/* <Button className="px-3" onClick={toggleModal} size="sm">
                      + Add Bookings
                    </Button> */}

                  </div>
                </CardHeader>

                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">Vehicle Type</th>
                      <th scope="col">Driver Name</th>
                      <th scope="col">Phone No.</th>
                       <th scope="col">Total Distance </th>
                      <th scope="col">Total Fare</th>

                     
                      <th scope="col">Status</th>
                     
                      <th>Action</th>
                      <th scope="col" />
                    </tr>
                  </thead>

                  <tbody>
                    <tr> 

                      <td>1</td>
                      <td>SUV </td>
                      <td>Narayan</td>
                      <td>7024660055</td>
                      <td>12KM</td>
                      <td>1200</td>    
                      <td>Successful</td>
                     
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
                            

                            <>
                              <DropdownItem
                                // onClick={() => handleShow(item._id, "reject", item?.comment)}
                                className="text-dark"
                              >
                                <i className="fa-regular fa-pen-to-square"></i> Edit
                              </DropdownItem>
                            </>


                            <>
                              <DropdownItem
                                // onClick={() => handleShow(item._id, "reject", item?.comment)}
                                className="text-success"
                              >
                                <i className="fa-solid fa-check"></i>
                                 Assign
                              </DropdownItem>
                            </>

                            <>
                              <DropdownItem
                                // onClick={() => handleShow(item._id, "reject", item?.comment)}
                                className="text-warning"
                              >
                                 <i className="fa-solid fa-xmark"></i>
                                 Unassign
                              </DropdownItem>
                            </>

                           

                            <DropdownItem className="text-danger">
                              <i className="fas fa-trash"></i> Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>

                    {/* {dataList?.data?.map((item, index) => {
                      let currentDate = new Date(item.createdAt);
                      let formattedDate = currentDate.toISOString().substring(0, 10);
                      return (
                        <tr key={item._id}>
                          <td>{((currentPage-1) * perPage) + index + 1}</td>
                          <td>{item?.name}</td>
                          <td>{item?.message}</td>
                          <td>{item?.contact}</td>
                          <td>{item?.email}</td>
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
                    })} */}
                  </tbody>

                  <tbody>
                    <tr>
                      <td>2</td>

                      <td>SUV </td>
                      <td>Narayan</td>
                      <td>7024660055</td>
                      <td>12KM</td>
                      <td>1200</td>    
                      <td>Successful</td>
                      
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
                           

                            <>
                              <DropdownItem
                                // onClick={() => handleShow(item._id, "reject", item?.comment)}
                                className="text-dark"
                              >
                                <i className="fa-regular fa-pen-to-square"></i> Edit
                              </DropdownItem>
                            </>

                            <>
                              <DropdownItem
                                // onClick={() => handleShow(item._id, "reject", item?.comment)}
                                className="text-success"
                              >
                                 <i className="fa-solid fa-check"></i>
                                 Assign
                              </DropdownItem>
                            </>

                            <>
                              <DropdownItem
                                // onClick={() => handleShow(item._id, "reject", item?.comment)}
                                className="text-warning"
                              >
                                <i className="fa-solid fa-xmark"></i>
                                 Unassign
                              </DropdownItem>
                            </>

                            

                            <DropdownItem className="text-danger">
                              <i className="fas fa-trash"></i> Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>

                    {/* {dataList?.data?.map((item, index) => {
                      let currentDate = new Date(item.createdAt);
                      let formattedDate = currentDate.toISOString().substring(0, 10);
                      return (
                        <tr key={item._id}>
                          <td>{((currentPage-1) * perPage) + index + 1}</td>
                          <td>{item?.name}</td>
                          <td>{item?.message}</td>
                          <td>{item?.contact}</td>
                          <td>{item?.email}</td>
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
                    })} */}
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                  {/* <TablePagination
                    totalPages={parseInt(dataList?.meta?.total_page)}
                    currentPage={parseInt(dataList?.meta?.current_page)}
                    pageUrl="/admin/messages?"
                  /> */}
                </CardFooter>
              </Card>
            </div>
          </Row>
        )}

        <AddModal
          modal={modal}
          Name="Add8"
          toggle={toggleModal}
          title="Add Fare management"
        />
      </Container>
    </>
  );
};

export default BookManagement;
