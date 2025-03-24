import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import AddModal from "../components/AddModal";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Nav,
  NavItem,
  Row,
  TabContent,
  TabPane,
  Table,
  UncontrolledDropdown,
} from "reactstrap";
import { helper } from "lib/helper";

import faqModel from "models/faq.model";
import TablePagination from "views/components/TablePagination";
import EditModal from "views/components/EditModal";
import AddBanner from "./AddBanner";
import DiscountsAndCoupens from "./Discount&Coupens";

const Clientms = () => {
  const [data, setData] = useState("2");
  const [modal, setModal] = useState(false);
  const [modalName, setModalName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  let navigate = useNavigate()
  const [dataList, setDataList] = useState([]);
  const [currentPageFAQ, setCurrentPageFAQ] = useState(1);
  const [perPageFAQ, setPerPageFAQ] = useState(20);
  const [editModalFAQ, setEditModalFAQ] = useState(false);
  const [editListFAQ, setEditListFAQ] = useState(null)
  const [formdataFAQ, setFormDataFAQ] = useState({
    question: "",
    answer: "",
    faqType: "",
  })

  const toggleEditModalFAQ = (modalName) => {
    setEditModalFAQ(!editModalFAQ);
  };

  const [formEditdataFAQ, setFormEditDataFAQ] = useState({
    question: editListFAQ?.question,
    answer: editListFAQ?.answer,
    faqType: editListFAQ?.faqType,
  })


  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const parameters = {};
  for (let [key, value] of searchParams) {
    parameters[key] = value;
  }

  const handleEditFAQ = async (editData) => {
    setEditListFAQ(editData)
    setEditModalFAQ(!editModalFAQ)
  }
  const handleEditSubmitFAQ = async (event) => {
    event.preventDefault()
    const { question, answer, faqType } = formEditdataFAQ
    const fareData = new FormData()
    fareData.append('question', question)
    fareData.append('answer', answer)
    fareData.append('faqType', faqType)
    await faqModel
      .create(fareData)
      .then((result) => {
        setEditModalFAQ(false)
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
    await faqModel
      .list(parameters)
      .then((result) => {
        setIsLoading(false);
        if (result) {
          setDataList(result);
          setCurrentPageFAQ(result?.meta?.current_page);
          setPerPageFAQ(result?.meta?.per_page);
        }
      })
      .catch((error) => {
        helper.sweetalert.toast(error.response?.data?.message, "warning");
      });
  };

  const handleDelFAQ = async (delId) => {
    helper.sweetalert
      .confirm("Are you sure you want to delete this Message", "info", true)
      .then((result) => {
        if (result.isConfirmed) {
          faqModel.delete(delId).then((res) => {
            helper.sweetalert.toast(res.data?.message);
            getListData();
          });
        }
      });
  };


  const toggleModal = (modalName) => {
    setModal(!modal);
    setModalName(modalName);
  };

  const handleSubmitData = (id) => {
    if (id === "3") {
      navigate("/admin/faq")
    }
    else if (id === "2") {
      navigate("/admin/adsBanner")
    } else if (id === "4") {
      navigate("/admin/discountCoupon")
    }
    setData(id);
  };

  const handleSubmitFAQ = async (event, id) => {
    event.preventDefault();
    const { question, answer, faqType } = formdataFAQ;
    const fareData = new FormData();
    fareData.append('question', question);
    fareData.append('answer', answer);
    fareData.append('faqType', faqType);
    await faqModel
      .create(fareData)
      .then((result) => {
        setModal(false);
        helper.sweetalert.toast("Add Data Successfully");
        setIsLoading(false);
        getListData();
        setFormDataFAQ({
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

  const handleChangeFormdataFAQ = (event) => {
    setFormDataFAQ({ ...formdataFAQ, [event.target.name]: event.target.value })
  }

  const handleChangeEditFormdataFAQ = (event) => {
    setFormEditDataFAQ({ ...formEditdataFAQ, [event.target.name]: event.target.value })
  }

  useEffect(() => {
    if (editListFAQ) {
      setFormEditDataFAQ({
        forType: editListFAQ?.question || "",
        status: editListFAQ?.answer || "",
        type: editListFAQ?.faqType || "",
      });
    }
  }, [editListFAQ]);

  useEffect(() => {
    if (data === "2") {
      navigate("/admin/adsBanner")
    }
    setCurrentPageFAQ(1)
    getListData();
  }, [data]);

  useEffect(() => {
    getListData();
  }, [location]);
  return (
    <>
      <div className="header pt-md-6">
        <Container>
          <div className="header-body">
            <Row className="px-4 py-2">
              <Nav>
                <NavItem onClick={() => handleSubmitData("2")}>
                  <NavLink>
                    <Card
                      className="m-2 "
                      style={{
                        border:
                          data === "2" ? "2px solid green" : "2px solid white",
                      }}
                    >
                      <div className="px-4 py-2">
                        <i class="fa-solid fa-star"></i>
                        <h4>Ads & banners</h4>
                      </div>
                    </Card>
                  </NavLink>
                </NavItem>
                <NavItem onClick={() => handleSubmitData("3")}>
                  <NavLink>
                    <Card
                      className="m-2"
                      style={{
                        border:
                          data === "3" ? "2px solid green" : "2px solid white",
                      }}
                    >
                      <div className="px-4 py-2">
                        <i class="fa-solid fa-question text-info"></i>
                        <h4>Info & FAQ </h4>
                      </div>
                    </Card>
                  </NavLink>
                </NavItem>
                <NavItem onClick={() => handleSubmitData("4")}>
                  <NavLink>
                    <Card
                      className="m-2"
                      style={{
                        border:
                          data === "4" ? "2px solid green" : "2px solid white",
                      }}
                    >
                      <div className="px-4 py-2">
                        <i class="fa-solid fa-tag text-success"></i>
                        <h4>Discounts & Coupens</h4>
                      </div>
                    </Card>
                  </NavLink>
                </NavItem>
              </Nav>
            </Row>

            <TabContent activeTab={data}>
              <TabPane tabId="2">
                <AddBanner />
              </TabPane>

              <TabPane tabId="3">
                <Container>
                  {!isLoading && (
                    <Row>
                      <div className="col">
                        <Card className="shadow">
                          <CardHeader className="border-0 d-flex justify-content-between">
                            <h3 className="mb-0">Info & FAQ </h3>

                            <div className="d-flex flex-row">
                              <Input
                                className="mr-4"
                                type="text"
                                placeholder="Search"
                              />
                              <Button
                                className="px-3"
                                onClick={() => toggleModal("Add2")}
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
                                <th scope="col">Questions</th>
                                <th scope="col">Status</th>
                                <th scope="col">Added On</th>

                                <th scope="col" />
                              </tr>
                            </thead>

                            <tbody>
                              {dataList?.data?.map((item, index) => {
                                if (!item.createdAt) {
                                  return null;
                                }
                                let currentDate = new Date(item.createdAt);
                                if (isNaN(currentDate.getTime())) {
                                  return null;
                                }
                                let formattedDate = currentDate.toISOString().substring(0, 10);
                                return (
                                  <tr key={item._id}>
                                    <td>{((currentPageFAQ - 1) * perPageFAQ) + index + 1}</td>
                                    <td>{item?.question}</td>
                                    <td>{item?.status}</td>
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
                                              handleEditFAQ(item)
                                            }
                                            className="text-warning"
                                          >
                                            <i class="fa-regular fa-pen-to-square"></i>
                                            Edit
                                          </DropdownItem>
                                          <DropdownItem
                                            onClick={() => handleDelFAQ(item?._id)}
                                            className="text-danger"
                                          >
                                            <i className="fas fa-trash"></i> Remove
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
                              pageUrl="/admin/faq?"
                            />
                          </CardFooter>
                        </Card>
                      </div>
                    </Row>
                  )}
                </Container>
              </TabPane>
              <TabPane tabId="4">
                <DiscountsAndCoupens />
              </TabPane>
            </TabContent>
          </div>
        </Container>

        {modalName === "Add2" && (
          <AddModal
            modal={modal}
            Name="Add2"
            toggle={toggleModal}
            handleSubmit={handleSubmitFAQ}
            handleChangeData={handleChangeFormdataFAQ}
            formData={formdataFAQ}
            title="Add FAQ"
          />
        )}
        {
          <EditModal
            modal={editModalFAQ}
            Name="Edit3"
            toggle={toggleEditModalFAQ}
            title="Edit FAQ Details"
            handleChangeData={handleChangeEditFormdataFAQ}
            formEditData={formEditdataFAQ}
            handleSubmit={handleEditSubmitFAQ}
          />
        }
      </div>
    </>
  );
};

export default Clientms;
