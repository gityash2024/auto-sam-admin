import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";
const DashboardKpi = ({ kpiTitle = "", kpiValue = "", kpiIcon="fas fa-chart-bar", iconBakgroundColor = "", navigateUrl="#", textColor = "text-white" }) => {
  const navigate = useNavigate();
  return (
    <>
      <Col lg="6" xl="3">
        <Card className="card-stats mb-4 mb-xl-0" style={{cursor:'pointer'}}>          
          <CardBody onClick={()=> navigate(navigateUrl)}>
            <Row>
              <div className="col">
                <CardTitle
                  tag="h5"
                  className="text-uppercase text-muted mb-0"
                >
                  {kpiTitle}
                </CardTitle>
                <span className="h2 font-weight-bold mb-0">
                  {kpiValue}
                </span>
              </div>
              <Col className="col-auto">
                <div className={`icon icon-shape ${iconBakgroundColor} ${textColor} rounded-circle shadow`}>
                  <i className={kpiIcon} />
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default DashboardKpi;