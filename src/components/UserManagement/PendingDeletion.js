// @author : Vasu Gamdha (Group 14)

import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./UserProfile.css";
import {
  getVendorDeletionRequestList,
  deleteVendorProfile,
  declineVendorProfileDeletion,
} from "../../store/actions/vendor";
import { toast } from "react-toastify";

const PendingDeletion = () => {
  const dispatch = useDispatch();
  const vendorToDeleteList = useSelector(
    (state) => state?.vendor?.vendorToDeleteList
  );

  useEffect(() => {
    dispatch(getVendorDeletionRequestList());
  }, []);

  const deleteVendorProfileClicked = (id) => {
    dispatch(deleteVendorProfile(id));
    toast.success("Vendor account deleted!");
  };

  const declineVendorProfileDeletionClicked = (id) => {
    dispatch(declineVendorProfileDeletion(id));
    toast.success("Account deletion request declined!");
  };

  return (
    <div className="mt-3 mb-4 pendingDeletions">
      <h2 style={{ textAlign: "center" }}>
        Pending vendor profile deletion requests{" "}
      </h2>
      <br />
      <br />
      <div className="table-container">
        {vendorToDeleteList && vendorToDeleteList.length ? (
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Organization Name</th>
                <th>Organization Email</th>
                <th>Reason</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {vendorToDeleteList.map((item, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>
                    {item.firstName} {item.lastName}
                  </td>
                  <td>{item.organizationName}</td>
                  <td>{item.email}</td>
                  <td>{item.reason}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="success"
                      onClick={() => deleteVendorProfileClicked(item._id)}
                    >
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() =>
                        declineVendorProfileDeletionClicked(item._id)
                      }
                    >
                      Decline
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div style={{ textAlign: "center" }} className="h4">
            No pending requests.
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingDeletion;
