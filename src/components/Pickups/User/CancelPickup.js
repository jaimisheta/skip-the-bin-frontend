// Author : Prashit Patel - B00896717
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Row, Col } from "react-bootstrap";
import moment from "moment";
import { Calendar, Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { WEB_API_URL } from "../../../constants";
import {toast} from "react-toastify";

export default function CancelPickup() {
  const navigate = useNavigate();
  const [time, setTime] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [pickups, setPickups] = useState([]);
  const [selectedPickup, setSelectedPickup] = useState({});

  const dateChange = (event) => {
    getPickups(event.format("LL"));
  };

  const onTimeSelect = (event) => {
    setTime(event.target.value);
    const slot = event.target.value.split("=")[0].trim();
    const vendor = event.target.value.split("=")[1].trim();
    const selectedPickup = pickups.filter(
      (pickup) => pickup.slot === slot && pickup.vendor === vendor
    );
    setSelectedPickup(selectedPickup[0]);
    console.log(selectedPickup[0]);
  };

  const submitClick = () => {
    navigate("/");
  };

  const cancelPickup = async () => {
    try {
      const response = await axios.delete(
        WEB_API_URL+"/user/cancel/" + selectedPickup.pickupId
      );

      if (response.status === 200 && response.data.success === true) {
        toast.success(response.data.toast);
        navigate("/");
      } else {
        setPickups([]);
        toast.error(response.data.toast);
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (time !== "" && selectedPickup !== {}) {
      setShowDetails(true);
    }
  }, [time, selectedPickup]);

  useEffect(() => {
    getPickups(moment().add(1, "day").format("LL"));
  }, []);

  const getPickups = async (getDate) => {
    try {
      const response = await axios.get(
        WEB_API_URL+"/user/pickups",
        {
          params: {
            userId: "5678",
            date: getDate,
          },
        }
      );

      if (response.status === 200 && response.data.success === true) {
        setPickups(response.data.pickups);
      } else {
        setShowDetails(false);
        setPickups([]);
        toast.error(response.data.toast);
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Row>
      <Row>
        <Col>
          <h3
            style={{
              textAlign: "center",
              fontWeight: "bolder",
              color: "rgba(17, 45, 92,0.85)",
              marginBottom: "1%",
            }}
          >
            Cancel Pickup
          </h3>
        </Col>
      </Row>
      <Col
        sm={7}
        style={{ alignItems: "center", justifyContent: "center" }}
        className="d-flex"
      >
        <Row>
          <Col sm={7} style={{ marginBottom: "2px" }}>
            <Row className="text-center">
              <h5
                style={{
                  color: "rgba(17, 45, 92,0.85)",
                  textAlign: "center",
                }}
              >
                Select Date
              </h5>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Calendar
                  fullscreen={false}
                  defaultValue={moment().add(1, "day").endOf("day")}
                  disabledDate={(current) =>
                    current && current <= moment().endOf("day")
                  }
                  onSelect={dateChange}
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                    width: "80%",
                    marginLeft: "2%",
                  }}
                />
              </div>
            </Row>
          </Col>
          <Col sm={5} style={{ marginBottom: "2px" }}>
            <Row className="text-center">
              <h5
                style={{
                  color: "rgba(17, 45, 92,0.85)",
                  textAlign: "center",
                }}
              >
                Select Time & Vendor
              </h5>
              <Row style={{ justifyContent: "center" }} className="d-flex">
                <ButtonGroup
                  style={{ minWidth: "80%" }}
                  vertical
                  onClick={onTimeSelect}
                >
                  {pickups.map((pickup, index) => {
                    return (
                      <Button
                        key={index}
                        style={{
                          margin: "2%",
                          border: "1px solid rgba(40, 111, 18,0.85)",
                          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                        }}
                        variant="light"
                        size="sm"
                        value={`${pickup.slot} = ${pickup.vendor}`}
                        active={
                          time === `${pickup.slot} = ${pickup.vendor}`
                            ? true
                            : false
                        }
                      >
                        {pickup.slot} = {pickup.vendor}
                      </Button>
                    );
                  })}
                </ButtonGroup>
              </Row>
            </Row>
          </Col>
        </Row>
      </Col>
      {showDetails && (
        <Col sm={5}>
          <h4
            style={{
              textAlign: "center",
              fontWeight: "bolder",
              color: "rgba(17, 45, 92,0.85)",
              marginBottom: "5%",
            }}
          >
            Details
          </h4>
          <div
            style={{
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
              margin: "0 auto",
              width: "85%",
              padding: "2%",
              borderRadius: "2%",
            }}
          >
            <Row
              style={{
                margin: "0 auto",
                marginBottom: "1%",
                textAlign: "center",
              }}
            >
              <Col>
                <h4
                  style={{ textAlign: "center", color: "rgba(40, 111, 18, 1)" }}
                >
                  Date : {selectedPickup.date}
                </h4>
              </Col>
            </Row>
            <Row
              style={{
                margin: "0 auto",
                marginBottom: "1%",
                textAlign: "center",
              }}
            >
              <Col>
                <h4
                  style={{ textAlign: "center", color: "rgba(40, 111, 18, 1)" }}
                >
                  Time : {selectedPickup.slot + " - " + selectedPickup.vendor}
                </h4>
              </Col>
            </Row>
            <Row
              style={{
                margin: "0 auto",
                marginBottom: "1%",
                textAlign: "center",
              }}
            >
              <Col>
                <h4
                  style={{ textAlign: "center", color: "rgba(40, 111, 18, 1)" }}
                >
                  Waste Types :{" "}
                  {selectedPickup.wasteType.map((item) => item).join(", ")}
                </h4>
              </Col>
            </Row>
            <Row
              style={{
                margin: "0 auto",
                marginBottom: "1%",
                textAlign: "center",
              }}
            >
              <Col>
                <h4
                  style={{ textAlign: "center", color: "rgba(40, 111, 18, 1)" }}
                >
                  No. of bags : {selectedPickup.boxQty}
                </h4>
              </Col>
            </Row>
            <Row
              style={{
                margin: "0 auto",
                textAlign: "center",
                marginBottom: "1%",
              }}
            >
              <Col>
                <h4
                  style={{ textAlign: "center", color: "rgba(40, 111, 18, 1)" }}
                >
                  Weight : {selectedPickup.wasteQty} kg
                </h4>
              </Col>
            </Row>
            <Row
              style={{
                margin: "0 auto",
                textAlign: "center",
                marginBottom: "1%",
              }}
            >
              <Col>
                <h4
                  style={{ textAlign: "center", color: "rgba(40, 111, 18, 1)" }}
                >
                  Address : {selectedPickup.address}
                </h4>
              </Col>
            </Row>
            <Row
              style={{
                margin: "0 auto",
                textAlign: "center",
                marginBottom: "1%",
              }}
            >
              <Col>
                <h4
                  style={{ textAlign: "center", color: "rgba(40, 111, 18, 1)" }}
                >
                  Area : {selectedPickup.area}
                </h4>
              </Col>
            </Row>
            <Row>
              <Row style={{ marginTop: "1%" }} className="text-center">
                <Popconfirm
                  title="Are you sure？"
                  icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                  onConfirm={cancelPickup}
                >
                  <Button
                    style={{
                      maxWidth: "30%",
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                      margin: "0 auto",
                    }}
                    variant="danger"
                  >
                    Cancel
                  </Button>
                </Popconfirm>
              </Row>
            </Row>
          </div>
        </Col>
      )}
      <Row style={{ marginTop: "1%" }} className="text-center">
        <Button
          style={{
            maxWidth: "30%",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
            margin: "0 auto",
          }}
          variant="success"
          onClick={submitClick}
        >
          Home
        </Button>
      </Row>
    </Row>
  );
}