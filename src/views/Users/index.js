import { helper } from "lib/helper";
import usersModel from "models/users.model";
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
  Button
} from "reactstrap";
// core components
import TablePagination from "views/components/TablePagination";

const UsersLists = () => {
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
  const updateStatus= async(id, status)=>{
    const formData = new FormData()
    formData.append('status', status)
      await usersModel
      .activeDeactivateUser(id, formData)
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
    await usersModel.list(parameters).then((result) => {
      setIsLoading(false)
      console.log(result)
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
            helper.sweetalert.toast(res.data?.message);
            getListData();
          });
        }
      });
  };



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
                  <h3 className="mb-0">App users</h3>
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
                      let formattedDate = currentDate.toISOString().substring(0, 10);
                      return (
                        <tr key={item._id}>
                          <td>{((currentPage-1) * perPage) + index + 1}</td>
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
                            <UncontrolledDropdown  key={`dropdown${item._id}`}>
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
                              <DropdownItem className="text-primary">
                                
                                </DropdownItem>
                                <DropdownItem
                                   onClick={() => {handleDel(item._id)}}
                                  className="text-danger"
                                >
                                  <i className="fas fa-trash"></i> Delete
                                </DropdownItem>
                               <DropdownItem>
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
                    pageUrl = "/admin/users?"
                  />
                </CardFooter>
              </Card>
            </div>
          </Row>
        )}
 
      </Container>
    </>
  );
};

export default UsersLists;
