import { helper } from "lib/helper";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
import DiscountAndCoupensmodel from "models/discount&Coupens"

const DiscountsAndCoupens = () => {
    const [modal, setModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [dataDiscountAndCoupens, setDiscountAndCoupens] = useState([]);
    const [currentPageCoupens, setCurrentPageCoupens] = useState(1);
    const [perPageCoupens, setPerPageCoupens] = useState(20);
    const [editModal, setEditModal] = useState(false);
    const [editModalAddCoupens, setEditModalAddCoupens] = useState(false);
    const [formdata, setFormData] = useState({
        image: "",
        forType: "",
        status: "",
        type: "",
    })
    const [formdataAddCoupens, setFormDataAddCoupens] = useState({
        code: "",
        discountUpto: "",
        validity: "",
        totalUsage: "",
        status: "",
        type: "",
        validFrom: "",
        validTo: ""
    })
    const toggleEditModalAddCoupens = (modalName) => {
        setEditModalAddCoupens(!editModalAddCoupens)
    }
    const [editList, setEditList] = useState(null)
    const [editListAddCoupens, setEditListAddCoupens] = useState(null)
    const [formEditdata, setFormEditData] = useState({
        image: selectedFile,
        forType: editList?.forType,
        status: editList?.status,
        type: editList?.type,
    })

    const [formEditdataAddCoupens, setFormEditDataAddCoupens] = useState({
        code: editListAddCoupens?.code,
        discountUpto: editListAddCoupens?.discountUpto,
        validity: editListAddCoupens?.validity,
        totalUsage: editListAddCoupens?.totalUsage,
        status: editListAddCoupens?.status,
        type: editListAddCoupens?.type,
        validFrom: editListAddCoupens?.validFrom,
        validTo: editListAddCoupens?.validTo
    })

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const parameters = {};
    for (let [key, value] of searchParams) {
        parameters[key] = value;
    }
    const toggleModal = (modalName) => {
        setModal(!modal);
    };

    const getListData = async () => {
        setIsLoading(true);
        await DiscountAndCoupensmodel
            .getList(parameters)
            .then((result) => {
                setIsLoading(false);
                if (result) {
                    setDiscountAndCoupens(result);
                    setCurrentPageCoupens(result?.meta?.current_page);
                    setPerPageCoupens(result?.meta?.per_page);
                }
            })
            .catch((error) => {
                helper.sweetalert.toast(error.response?.data?.message, "warning");
            });
    };

    const getDetails = async (delId) => {
        DiscountAndCoupensmodel.detail(delId).then((res) => {
            setEditList(res.data)
            getListData();
        });
    };

    const handleChangeFormdataAddCoupens = (event) => {
        setFormDataAddCoupens({ ...formdataAddCoupens, [event.target.name]: event.target.value })
    }

    const handleChangeEditFormdataAddCoupens = (event) => {
        setFormEditDataAddCoupens({ ...formEditdataAddCoupens, [event.target.name]: event.target.value })
    }

    const handleSubmitAddCoupens = async (event, id) => {
        event.preventDefault();
        const { code, discountUpto, validity, totalUsage, status, type, validFrom, validTo } = formdataAddCoupens;
        const fareData = new FormData();
        fareData.append('code', code);
        fareData.append('discountUpto', discountUpto);
        fareData.append('validity', validity);
        fareData.append('totalUsage', totalUsage);
        fareData.append('status', status);
        fareData.append('type', type);
        fareData.append('validFrom', validFrom);
        fareData.append('validTo', validTo);
        await DiscountAndCoupensmodel
            .create(fareData)
            .then((result) => {
                setModal(false);
                helper.sweetalert.toast("Add Data Successfully");
                setIsLoading(false);
                getListData();
                setFormDataAddCoupens({
                    code: "",
                    discountUpto: "",
                    validity: "",
                    totalUsage: "",
                    status: "",
                    type: "",
                    validFrom: "",
                    validTo: ""
                });
            })
            .catch((error) => {
                helper.sweetalert.toast(error.response?.data?.message, "warning");
            });
    };
    const handleEditSubmitAddCoupens = async (event) => {
        event.preventDefault()
        const { code, discountUpto, validity, totalUsage, status, type, validFrom, validTo } = formEditdataAddCoupens
        const fareData = new FormData()
        fareData.append('code', code)
        fareData.append('discountUpto', discountUpto)
        fareData.append('validity', validity)
        fareData.append('totalUsage', totalUsage)
        fareData.append('status', status)
        fareData.append('type', type)
        fareData.append('validFrom', validFrom)
        fareData.append('validTo', validTo)
        await DiscountAndCoupensmodel
            .update(editListAddCoupens?._id,fareData)
            .then((result) => {
                setEditModalAddCoupens(false)
                helper.sweetalert.toast("Updated Data Successfully");
                setIsLoading(false);
                getListData()
            })
            .catch((error) => {
                helper.sweetalert.toast(error.response?.data?.message, "warning");
            });
    }
    const handleDelAddCoups = async (delId) => {
        helper.sweetalert
            .confirm("Are you sure you want to delete this Message", "info", true)
            .then((result) => {
                if (result.isConfirmed) {
                    DiscountAndCoupensmodel.delete(delId).then((res) => {
                        helper.sweetalert.toast(res.data?.message);
                        getListData();
                    });
                }
            });
    };
    const handleEditAddCoupens = async (editData) => {
        setEditListAddCoupens(editData)
        setEditModalAddCoupens(!editModalAddCoupens)
    }
    useEffect(() => {
        getListData();
    }, [location]);

    useEffect(() => {
        if (editListAddCoupens) {
            setFormEditDataAddCoupens({
                code: editListAddCoupens?.code || "",
                discountUpto: editListAddCoupens?.discountUpto || "",
                validity: editListAddCoupens?.validity || "",
                totalUsage: editListAddCoupens?.totalUsage || "",
                status: editListAddCoupens?.status || "",
                type: editListAddCoupens?.type || "",
                validFrom: editListAddCoupens?.validFrom || "",
                validTo: editListAddCoupens?.validTo || ""
            });
        }
    }, [editListAddCoupens]);
    return (
        <>
            <Container>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0 d-flex justify-content-between">
                                <h3 className="mb-0">Discounts & Coupens </h3>
                                <div className="d-flex flex-row">
                                    <Input
                                        className="mr-4"
                                        type="text"
                                        placeholder="Search"
                                    />
                                    <Button
                                        className="px-3"
                                        onClick={() => toggleModal("Add3")}
                                        size="sm"
                                    >
                                        +Add
                                    </Button>
                                </div>
                            </CardHeader>
                            <Table
                                className="align-items-center table-flush"
                                responsive
                            >
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">S.No</th>
                                        <th scope="col">Coupen Code</th>
                                        <th scope="col">Discount</th>
                                        <th scope="col">Validity </th>
                                        <th scope="col">Expiry Date</th>
                                        <th scope="col">used</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Type</th>
                                        <th scope="col">Valid From</th>
                                        <th scope="col">Valid To</th>
                                        <th scope="col">Action</th>
                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataDiscountAndCoupens?.data?.map((item, index) => {
                                        return (
                                            <tr key={item._id}>
                                                <td>{((currentPageCoupens - 1) * perPageCoupens) + index + 1}</td>
                                                <td>{item?.code}</td>
                                                <td>{item?.discountUpto}</td>
                                                <td>{item?.validity}</td>
                                                <td>{item?.validFrom}</td>
                                                <td>{item?.totalUsage}</td>
                                                <td>{item?.status}</td>
                                                <td>{item?.type}</td>
                                                <td>{item?.validFrom}</td>
                                                <td>{item?.validTo}</td>
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
                                                            <DropdownItem onClick={() =>
                                                                handleEditAddCoupens(item)
                                                            }
                                                                className="text-warning">
                                                                <i class="fa-regular fa-pen-to-square"></i>
                                                                Edit
                                                            </DropdownItem>
                                                            <DropdownItem
                                                                onClick={() => handleDelAddCoups(item._id)}
                                                                className="text-danger"
                                                            >
                                                                <i className="fas fa-trash"></i>{" "}
                                                                Remove
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
                                    totalPages={parseInt(dataDiscountAndCoupens?.meta?.total_page)}
                                    currentPage={parseInt(dataDiscountAndCoupens?.meta?.current_page)}
                                    pageUrl="/admin/discountCoupon?"
                                />
                            </CardFooter>
                        </Card>
                    </div>
                </Row>
            </Container>
            <AddModal
                modal={modal}
                Name="Add3"
                toggle={toggleModal}
                title="Add new Coupens"
                handleSubmit={handleSubmitAddCoupens}
                handleChangeData={handleChangeFormdataAddCoupens}
                formData={formdataAddCoupens}
            />
            <EditModal
                modal={editModalAddCoupens}
                Name="Edit4"
                toggle={toggleEditModalAddCoupens}
                title="Edit Discounts & Coupens"
                handleChangeData={handleChangeEditFormdataAddCoupens}
                formEditData={formEditdataAddCoupens}
                handleSubmit={handleEditSubmitAddCoupens}
            />
        </>
    );
};

export default DiscountsAndCoupens;
