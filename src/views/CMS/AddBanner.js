import { helper } from "lib/helper";
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
import cmsModel from "models/cms.model";

const AddBanner = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(20);
    const [dataListAddsBanner, setDataListAddsBanner] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [editList, setEditList] = useState(null)
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const parameters = {};
    for (let [key, value] of searchParams) {
        parameters[key] = value;
    }
    const toggleModal = (modalName) => {
        setModal(!modal);
    };
    const toggleEditModal = (modalName) => {
        setEditModal(!editModal);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const [formdata, setFormData] = useState({
        image: "",
        forType: "",
        status: "",
        type: "",
    })

    const [formEditdata, setFormEditData] = useState({
        image: selectedFile,
        forType: editList?.forType,
        status: editList?.status,
        type: editList?.type,
    })
    const handleChangeFormdata = (event) => {
        setFormData({ ...formdata, [event.target.name]: event.target.value })
    }

    const handleChangeEditFormdata = (event) => {
        setFormEditData({ ...formEditdata, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event, id) => {
        event.preventDefault();
        const { image, forType, status, type } = formdata;
        const fareData = new FormData();
        fareData.append('image', selectedFile);
        fareData.append('forType', forType);
        fareData.append('status', status);
        fareData.append('type', type);
        await cmsModel
            .create(fareData)
            .then((result) => {
                setModal(false);
                helper.sweetalert.toast("Add Data Successfully");
                setIsLoading(false);
                getListData();
                setFormData({
                    image: null,
                    forType: "",
                    status: "",
                    type: "",
                });
            })
            .catch((error) => {
                helper.sweetalert.toast(error.response?.data?.message, "warning");
            });
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault()
        const { image, forType, status, type } = formEditdata
        const fareData = new FormData()
        fareData.append('image', selectedFile)
        fareData.append('forType', forType)
        fareData.append('status', status)
        fareData.append('type', type)
        await cmsModel
            .update(editList?._id,fareData)
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
        await cmsModel
            .listAddsAndBanners(parameters)
            .then((result) => {
                setIsLoading(false);
                if (result) {
                    setDataListAddsBanner(result);
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
                    cmsModel.delete(delId).then((res) => {
                        helper.sweetalert.toast(res.data?.message);
                        getListData();
                    });
                }
            });
    };

    const handleEdit = async (editId) => {
        setEditList(editId)
        setEditModal(!editModal)
    }

    useEffect(() => {
        getListData();
    }, [location]);

    useEffect(() => {
        if (editList) {
            setFormEditData({
                image: selectedFile || "",
                forType: editList?.forType || "",
                status: editList?.status || "",
                type: editList?.type || "",
            });
        }
    }, [editList]);

    return (
        <>
            <Container className="pt-1" >
                {!isLoading && (
                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0 d-flex justify-content-between ">
                                    <h3 className="mb-0">Add & Banners</h3>
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
                                            <th scope="col">Banner Image</th>
                                            <th scope="col">For Type</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Type</th>
                                            <th scope="col">Created At</th>
                                            <th scope="col">Action</th>
                                            <th scope="col" />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataListAddsBanner?.data?.map((ele, index) => {
                                            if (!ele.createdAt) {
                                                return null;
                                            }
                                            let currentDate = new Date(ele.createdAt);
                                            if (isNaN(currentDate.getTime())) {
                                                return null;
                                            }
                                            let formattedDate = currentDate.toISOString().substring(0, 10);
                                            return <tr>
                                                <td>{((currentPage - 1) * perPage) + index + 1}</td>
                                                <td>
                                                    <img width="50px" src={ele.image} />
                                                </td>
                                                <td>{ele.forType}</td>
                                                <td>{ele.status}</td>
                                                <td>{ele.type}</td>
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
                                                            <DropdownItem
                                                                onClick={() =>
                                                                    handleEdit(ele)
                                                                }

                                                                className="text-warning"
                                                            >
                                                                <i class="fa-regular fa-pen-to-square"></i>
                                                                Edit
                                                            </DropdownItem>
                                                            <DropdownItem
                                                                onClick={() => handleDel(ele._id)}
                                                                className="text-danger"
                                                            >
                                                                <i className="fas fa-trash"></i> Remove
                                                            </DropdownItem>
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                </td>
                                            </tr>
                                        }
                                        )
                                        }
                                    </tbody>
                                </Table>
                                <CardFooter className="py-4">
                                    <TablePagination
                                        totalPages={parseInt(dataListAddsBanner?.meta?.total_page)}
                                        currentPage={parseInt(dataListAddsBanner?.meta?.current_page)}
                                        pageUrl="/admin/adsBanner?"
                                    />
                                </CardFooter>
                            </Card>
                        </div>
                    </Row>
                )}
                <AddModal
                    modal={modal}
                    Name="Add1"
                    toggle={toggleModal}
                    title="Add Banner management"
                    handleChangeData={handleChangeFormdata}
                    formData={formdata}
                    handleSubmit={handleSubmit}
                    handleFileChange={handleFileChange}
                />
                <EditModal
                    modal={editModal}
                    Name="Edit2"
                    toggle={toggleEditModal}
                    title="Edit Banner management"
                    handleChangeData={handleChangeEditFormdata}
                    formEditData={formEditdata}
                    handleSubmit={handleEditSubmit}
                    handleFileChange={handleFileChange}
                />

            </Container>
        </>
    );
};

export default AddBanner;
