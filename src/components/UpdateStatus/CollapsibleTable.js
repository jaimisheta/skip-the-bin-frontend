// Author: Vivekkumar Patel (B00896765)
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHeader from "./TableHeader";
import Row from "./Row";
import { useEffect, useState } from "react";
import { WEB_API_URL } from "../../constants";

const CollapsibleTable = () => {
  const [scheduleData, setScheduleData] = useState([]);

  const getSchedules = () => {
    fetch(WEB_API_URL + "/vendor/schedules/")
      .then((response) => response.json())
      .then((res) => {
        setScheduleData(res.schedules);
      });
  };

  useEffect(() => {
    getSchedules();
  }, []);

  const updateStatus = () => {
    getSchedules();
  };

  return (
    <Table aria-label="collapsible table" className="table">
      <TableHeader align="left" />
      <TableBody>
        {scheduleData.map((row) => (
          <Row update={updateStatus} key={row.scheduleId} row={row} />
        ))}
      </TableBody>
    </Table>
  );
};

export default CollapsibleTable;
