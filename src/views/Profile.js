import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

import UserModel from "models/users.model";
import { helper } from 'lib/helper';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [profileData, setProfileData] = useState(null);
  const history = useNavigate();

  const getProfile = async () => {
    await UserModel.profile().then((result) => {
      setProfileData(result);
    }).catch((error) => {
      console.log(error)
    })
  }
  useEffect(() => {
    getProfile();
  }, []);

  const profileUpdate = async (e) => {
    e.preventDefault();
    if (e.target.name.value !== "" && e.target.email.value !== "") {
      const formData = new FormData(e.target);
      await UserModel.updateProfile(formData).then((res) => {
        if (res) {
          //sessionStorage.setItem("userinfo", "");
          helper.sweetalert.toast("Profile updated");
          sessionStorage.setItem("access_token", res.data.access_token);
          sessionStorage.setItem("refresh_token", res.data.refresh_token);
          sessionStorage.setItem("userinfo", JSON.stringify(res.data.data));
          history(0);
        }
      }).catch((error) => {
        console.clear();
        console.log("data=>", error)
        helper.sweetalert.toast(error.response?.data?.message, "warning");
      })
    } else {
      helper.sweetalert.toast("Please fill name and email", "warning")
    }
  }

  const passUpdate = async (e) => {
    e.preventDefault();
    if (e.target.password.value != "" && e.target.confirm_password.value != "") {
      if (e.target.password.value === e.target.confirm_password.value) {
        const formData = new FormData(e.target);
        await UserModel.updatePass(formData).then((res) => {
          if (res) {
            helper.sweetalert.toast("Password updated");
            handleClose();
            //history(0);
          }
        }).catch((error) => {
          console.clear();
          console.log("data=>", error)
          helper.sweetalert.toast(error.response?.data?.message, "warning");
        })
      } else {
        helper.sweetalert.toast("Passwords not matched", "warning")
      }
    } else {
      helper.sweetalert.toast("Please fill passwords", "warning")
    }
  }
  return (
    <>
      <div className="pb-2 pb-sm-5 pt-2 pt-sm-5"></div>
      <Container>
        <Row>
          <Col className="order-xl-1">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>

                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={profileUpdate}>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={profileData?.name}
                            id="input-name"
                            placeholder="Name"
                            type="text"
                            name="name"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={profileData?.email}
                            id="input-email"
                            placeholder="jesse@example.com"
                            type="email"
                            name="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row className="d-flex justify-content-center mt-2 gap-3">
                      <Button
                        className="btn-fill"
                        color="info"
                        type='submit'
                      >
                        Update Profile
                      </Button>
                      <Button
                        className="btn-fill ml-2"
                        type="button"
                        color="warning"
                        onClick={() => setShow(true)}
                      >
                        Change Password
                      </Button>
                    </Row>
                    <div className="clearfix"></div>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal isOpen={show} toggle={toggle}>
        <ModalHeader toggle={toggle}>Change password</ModalHeader>
        <Form onSubmit={passUpdate}>
          <ModalBody>
            <Row>
              {/* <Col lg="12">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-curpassword"
                  >
                    Current password
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="input-curpassword"
                    placeholder="Old password"
                    type="password"
                    name="curpassword"
                  />
                </FormGroup>
              </Col> */}
              <Col lg="12">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-password"
                  >
                    New password
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="input-password"
                    placeholder="New password"
                    type="password"
                    name="password"
                    required
                  />
                </FormGroup>
              </Col>
              <Col lg="12">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-cnfPassword"
                  >
                    Confirm password
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="input-cnfPassword"
                    placeholder="Confirm password"
                    type="password"
                    name="confirm_password"
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="warning" onClick={toggle} type="button">
              Cancel
            </Button>{' '}
            <Button color="success" >
              Save Changes
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};

export default Profile;
