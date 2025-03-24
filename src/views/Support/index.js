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
} from "reactstrap";
// core components
import TablePagination from "views/components/TablePagination";

const SupportMessages = () => {


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
    await contact_usModel.list(parameters).then((result) => {
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

  useEffect(() => {
    getListData();
  }, [location])

  const handleDel = async (delId) => {
    helper.sweetalert.confirm("Are you sure you want to delete this Message", "info", true).then((result) => {
      if (result.isConfirmed) {
        contact_usModel.delete(delId).then((res) => {
          helper.sweetalert.toast(res.data?.message);
          getListData();
        })
      }
    })
  }

  return (
    <>
      <Container className="pt-7">
        
        {!isLoading && (
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Support Messages</h3>
                </CardHeader>
                
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">Name</th>
                      <th scope="col">Message</th>
                      <th scope="col">Cont</th>
                      <th scope="col">Email</th>
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
                    })}
                  </tbody>
                </Table>



                <CardFooter className="py-4">
                  <TablePagination
                    totalPages={parseInt(dataList?.meta?.total_page)}
                    currentPage={parseInt(dataList?.meta?.current_page)}
                    pageUrl = "/admin/messages?"
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

export default SupportMessages;
