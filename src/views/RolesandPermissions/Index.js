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

const Rolesandpermission = () => {
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };


  const toggleModal1 = () => {
    setModal1(!modal1);
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
                  <h3 className="mb-0">Roles & Permissions</h3>

                  <div className="d-flex flex-row">
                    {/* <i class="fa-solid fa-magnifying-glass"></i> */}
                    <Input
                      className="mr-4"
                      type="text"
                      placeholder="Search"
                      // size='sm'
                    />

                    <Button className="px-3" onClick={toggleModal1} size="sm">
                      Add User
                    </Button>

                    <Button className="px-3" onClick={toggleModal} size="sm">
                      Assign
                    </Button>
                  </div>
                </CardHeader>

                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">Admin Name</th>
                      <th scope="col">Category</th>
                      <th scope="col">Sub_Category</th>
                      <th scope="col">Group</th>
                      <th scope="col">Location</th>
                      <th scope="col">Sub_Location</th>
                      <th scope="col">ETC</th>
                      <th>Action</th>
                      <th scope="col" />
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>narayan</td>
                      <td>Rider</td>
                      <td>User</td>
                      <td>Premium</td>
                      <td>udaypur</td>
                      <td>uday</td>
                      <td>25 Rs.</td>
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
                                className="text-warning"
                              >
                                <i class="fa-regular fa-pen-to-square"></i>{" "}
                                Edit
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
                      <td>Rajasthan</td>
                      <td>Udaypur</td>
                      <td>dfgh</td>
                      <td>1 KM</td>
                      <td>50 rs.</td>

                      <td>Sedan</td>
                      <td>25 Rs.</td>
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
                                className="text-warning"
                              >
                                <i class="fa-regular fa-pen-to-square"></i>{" "}
                                Edit
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
          title="Assign Permission and Roles"
        />

        <AddModal
          modal={modal1}
          Name="Add9"
          toggle={toggleModal1}
          title="Add Users"
        />
      </Container>
    </>
  );
};

export default Rolesandpermission;
