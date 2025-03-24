import { helper } from "lib/helper";
import FareModel from "models/fare.model";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
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
import EditModal from "views/components/EditModal";

const FareManagement = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataList, setDataList] = useState([]);
  const [dataStates, setDataStatesList] = useState([]);
  const [dataCity, setDataCityList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const parameters = {};
  for (let [key, value] of searchParams) {
    parameters[key] = value;
  }
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editList, setEditList] = useState(null)
  const toggleModal = (modalName) => {
    setModal(!modal);
    getStatesData();
    getCityData()
  };
  const toggleEditModal = (modalName) => {
    setEditModal(!editModal);
    getStatesData();
    getCityData()
  };

  const [formdata, setFormData] = useState({
    state_id: "",
    city_id: "",
    name: "",
    baseKm: "",
    baseKmFare: "",
    perKmFare: "",
    vehicleType: ""
  })

  const [formEditdata, setFormEditData] = useState({
    state_id: editList?.state_id?.name,
    city_id: editList?.city_id?.name,
    name: editList?.name,
    baseKm: editList?.baseKm,
    baseKmFare: editList?.baseKmFare,
    perKmFare: editList?.perKmFare,
    vehicleType: editList?.vehicleType
  })

  const handleChangeFormdata = (event) => {
    setFormData({ ...formdata, [event.target.name]: event.target.value })
  }

  const handleChangeEditFormdata = (event) => {
    setFormEditData({ ...formEditdata, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const { state_id, baseKm, baseKmFare, city_id, name, perKmFare, vehicleType } = formdata
    const fareData = new FormData()
    fareData.append('state_id', state_id)
    fareData.append('city_id', city_id)
    fareData.append('baseKm', baseKm)
    fareData.append('baseKmFare', baseKmFare)
    fareData.append('name', name)
    fareData.append('perKmFare', perKmFare)
    fareData.append('vehicleType', vehicleType)
    await FareModel
      .create(fareData)
      .then((result) => {
        setModal(false)
        helper.sweetalert.toast("Add Data Successfully");
        setIsLoading(false);
        getListData()
        setFormData({
          state_id: "",
          city_id: "",
          name: "",
          baseKm: "",
          baseKmFare: "",
          perKmFare: "",
          vehicleType: ""
        })
      })
      .catch((error) => {
        helper.sweetalert.toast(error.response?.data?.message, "warning");
      });
  }

  const handleEditSubmit = async (event) => {
    event.preventDefault()
    const { state_id, baseKm, baseKmFare, city_id, name, perKmFare, vehicleType } = formEditdata
    const fareData = new FormData()
    fareData.append('state_id', state_id)
    fareData.append('city_id', city_id)
    fareData.append('baseKm', baseKm)
    fareData.append('baseKmFare', baseKmFare)
    fareData.append('name', name)
    fareData.append('perKmFare', perKmFare)
    fareData.append('vehicleType', vehicleType)
    await FareModel
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

  const getListData = async () => {
    setIsLoading(true);
    await FareModel
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

  const getStatesData = async () => {
    setIsLoading(true);
    await FareModel
      .getStates(parameters)
      .then((result) => {
        setIsLoading(false);
        if (result) {
          setDataStatesList(result);
          setCurrentPage(result?.meta?.current_page);
          setPerPage(result?.meta?.per_page);
        }
      })
      .catch((error) => {
        helper.sweetalert.toast(error.response?.data?.message, "warning");
      });
  };

  const getCityData = async () => {
    setIsLoading(true);
    await FareModel
      .getCity(parameters)
      .then((result) => {
        setIsLoading(false);
        if (result) {
          setDataCityList(result);
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
          FareModel.delete(delId).then((res) => {
            helper.sweetalert.toast(res.data?.message);
            getListData();
          });
        }
      });
  };

  const getDetails = async (delId) => {
    FareModel.detail(delId).then((res) => {
      setEditList(res.data)
      getListData();
    });
  };

  const handleEdit = async (editId) => {
    getDetails(editId)
    setEditModal(!editModal)
  }

  useEffect(() => {
    getListData();
  }, [location]);

  useEffect(() => {
    if (editList) {
      setFormEditData({
        state_id: editList.state_id?._id || "",
        city_id: editList.city_id?._id || "",
        name: editList.name || "",
        baseKm: editList.baseKm || "",
        baseKmFare: editList.baseKmFare || "",
        perKmFare: editList.perKmFare || "",
        vehicleType: editList.vehicleType || ""
      });
    }
  }, [editList]);

  return (
    <>
      <Container className="pt-7" >
        {!isLoading && (
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0 d-flex justify-content-between ">
                  <h3 className="mb-0">Fare Management</h3>
                  <div className="d-flex flex-row" >
                    <Input
                      className="mr-4"
                      type="text"
                      placeholder="Search"
                    />
                    <Button className="px-3" onClick={toggleModal} size="sm" >+Add</Button>
                  </div>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">State</th>
                      <th scope="col">City</th>
                      <th scope="col">Fare Name</th>
                      <th scope="col">Base KM</th>
                      <th scope="col">Base KM Fare</th>
                      <th scope="col">Vehicle Modal</th>
                      <th scope="col">Per KM Fare</th>
                      <th>Action</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {dataList?.data?.map((item, index) => {
                      return (
                        <tr key={item._id}>
                          <td>{((currentPage - 1) * perPage) + index + 1}</td>
                          <td>{item?.state_id?.name}</td>
                          <td>{item?.city_id?.name}</td>
                          <td>{item?.name}</td>
                          <td>{item?.baseKm}</td>
                          <td>{item?.baseKmFare}</td>
                          <td>{item?.vehicleType}</td>
                          <td>{item?.perKmFare}</td>
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
                                  onClick={() => {handleDel(item._id)}}
                                  className="text-danger"
                                >
                                  <i className="fas fa-trash"></i> Delete
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() =>
                                    handleEdit(item?._id)
                                  }
                                  className="text-warning"
                                >
                                  <i class="fa-regular fa-pen-to-square"></i> Edit
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
                    pageUrl="/admin/faremanagement?"
                  />
                </CardFooter>
              </Card>
            </div>
          </Row>
        )}
        <AddModal
          modal={modal}
          Name="Add6"
          toggle={toggleModal}
          title="Add Fare management"
          handleChangeData={handleChangeFormdata}
          formData={formdata}
          handleSubmit={handleSubmit}
          stateData={dataStates}
          cityData={dataCity}
        />
        <EditModal
          modal={editModal}
          Name="Edit1"
          toggle={toggleEditModal}
          title="Edit Fare management"
          handleChangeData={handleChangeEditFormdata}
          formEditData={formEditdata}
          handleSubmit={handleEditSubmit}
          stateData={dataStates}
          cityData={dataCity}
        />

      </Container>
    </>
  );
};

export default FareManagement;
