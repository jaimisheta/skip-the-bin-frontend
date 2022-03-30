// Author: Vivekkumar Patel (B00896765)
import React from "react";
import Stepper from "@mui/material/Stepper";
import StepLabel from "@mui/material/StepLabel";
import Step from "@mui/material/Step";
import { useEffect, useState } from "react";

const Tracker = (props) => {
  const { row } = props;
  const [status, setStatus] = useState("");
  const API_URL =
    "http://localhost:8080/api/user/pickups/status?batchNo=" + row.batchNo;

  const getStatus = () => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((res) => {
        setStatus(res.status);
      });
  };

  useEffect(() => {
    getStatus();
  });

  const steps = {
    "Waste Pick-up Scheduled": 0,
    "Waste Picked-up": 1,
    "Waste Arrived at Recycling Facility": 2,
    "Waste Recycled": 3,
  };

  return (
    <Stepper alternativeLabel activeStep={steps[status]}>
      {Object.keys(steps).map((stepLabel) => (
        <Step key={stepLabel}>
          <StepLabel>{stepLabel}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default Tracker;