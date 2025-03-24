import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import DashboardKpi from "./Dashboard/DashboardKpi";
import kpiModel from "models/kpi.model";
import { helper } from "lib/helper";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

const Header = () => {
  const [driverCount, setDriverCount] = useState(0);
  const [supportCount, setSupportCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  const getDashboardKpi = async () => {
    await kpiModel
      .dashboardKpi()
      .then((result) => {
        setDriverCount(result?.data?.driverCount);
        setSupportCount(result?.data?.supportCount);
        setUserCount(result?.data?.userCount);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const totalRides = helper.generateRandomNumber();

  const config = {
    type: "doughnut",
    data: {
      labels: ["Red", "Blue"],

      datasets: [
        {
          label: "# of Votes",
          data: [12, 19],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
          ],

          borderWidth: 1,
        },
      ],
    },
  };

  useEffect(() => {
    getDashboardKpi();
  }, []);

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <DashboardKpi
                kpiTitle="Total rides"
                kpiValue={totalRides}
                kpiIcon="fas fa-route"
                iconBakgroundColor="bg-success"
                navigateUrl="/admin/ride/"
              />
              <DashboardKpi
                kpiTitle="Today's rides"
                kpiValue={helper.generateRandomNumber(totalRides)}
                kpiIcon="fas fa-route"
                iconBakgroundColor="bg-primary"
              />

              <DashboardKpi
                kpiTitle="Drivers"
                kpiValue={driverCount}
                kpiIcon="fas fa-user-astronaut"
                iconBakgroundColor="bg-warning"
                navigateUrl="/admin/drivers"
              />

              {/* <DashboardKpi
                kpiTitle=" Inactive Drivers"
                kpiValue={driverCount}
                kpiIcon="fas fa-user-astronaut"
                iconBakgroundColor="bg-warning"
                navigateUrl="/admin/drivers"
              /> */}

              <DashboardKpi
                kpiTitle="Users"
                kpiValue={userCount}
                kpiIcon="fas fa-users"
                iconBakgroundColor="bg-info"
                navigateUrl="/admin/users"
              />
            </Row>

            <Row className="mt-2">
              <DashboardKpi
                kpiTitle="Message"
                kpiValue={supportCount}
                kpiIcon="fa-solid fa-comment"
                iconBakgroundColor="bg-yellow"
                navigateUrl="/admin/messages"
              />
            </Row>
          </div>

          {/* <div>
            <Row>
              <Col>
                <Card className=" d-flex align-items-center border-none">
                  <Doughnut data={config.data} />

                  <h4 className="pt-2">Active Riders</h4>
                  <h5>Total: 2000</h5>
                  <h5>Active: 1200</h5>
                </Card>
              </Col>
              <Col>
                <Card className="mx-4 d-flex align-items-center ">
                  <Doughnut data={config.data} />
                  <h4 className="pt-2">Active Users</h4>
                  <h5>Total: 6000</h5>
                  <h5>Active: 1700</h5>
                </Card>
              </Col>
            </Row>
          </div> */}

          {/* <div
            className="pt-3  bg-white my-2 "
            style={{ borderRadius: "8px" }}
          >

            <h2 className="px-4">Active </h2>

            <div className="d-flex flex-row p-4">
              <Row>
                <Col md={6}>
                  <Card className=" d-flex align-items-center border-none">
                    <Doughnut data={config.data} />

                    <h4 className="pt-2">Active Riders</h4>
                    <h5>Total: 2000</h5>
                    <h5>Active: 1200</h5>
                  </Card>
                </Col>

                <Col md={6}>
                  <Card className="mx-4 d-flex align-items-center ">
                    <Doughnut data={config.data} />
                    <h4 className="pt-2">Active Users</h4>
                    <h5>Total: 6000</h5>
                    <h5>Active: 1700</h5>
                  </Card>
                </Col>
              </Row>
            </div>
          </div> */}
          {/* <div className="d-flex  p-4 bg-white" >
<Card className=" align-items-center border-none">

<Doughnut data={config.data} />

<h4 className="pt-2">Active Riders</h4>

<h5>Total: 2000</h5>
<h5>Active: 1200</h5>

</Card>
<Card className=" align-items-center border-none">

<Doughnut data={config.data} />

<h4 className="pt-2">Active Riders</h4>

<h5>Total: 2000</h5>
<h5>Active: 1200</h5>

</Card>
</div> */}

          <div className="pt-3 my-2  bg-white " style={{ borderRadius: "8px" }}>
            <h2 className="px-4">Active</h2>
            <div className="d-flex  flex-row p-4">
              <Container className="">
                {/* <h2 className="px-4">Active</h2> */}

                <Row className="">
                  <Col lg={3} className="mb-4 mb-lg-0 ">
                    {" "}
                    <Card className="d-flex align-items-center border-none">
                      <Doughnut data={config.data} />

                      <h4 className="pt-2">Active Riders</h4>

                      <h5>Total: 2000</h5>
                      <h5>Active: 1200</h5>
                    </Card>
                  </Col>

                  <Col lg={3} className="mb-4 mb-lg-0 ">
                    {" "}
                    <h2 className="px-4">{""}</h2>
                    <Card className="mt-2 d-flex align-items-center">
                      <Doughnut data={config.data} />

                      <h4 className="pt-2">Active Users</h4>

                      <h5>Total: 6000</h5>
                      <h5>Active: 1700</h5>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
