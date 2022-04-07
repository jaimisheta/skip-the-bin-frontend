import { Accordion, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import "./notification.css";
import { useEffect } from "react";
function ViewNotification(props) {
  const dateDifference = (_) => {
    let day = Math.ceil((new Date() - new Date(_)) / (1000 * 60 * 60 * 24));
    if (day == 0) return "Today";
    else if (0 < day <= 1) return `${day} day ago`;
    else if (1 < day <= 3) return `${day} days ago`;
    else return `Expired`;
  };
  //   useEffect(useEffect(() => {}, [props]));
  return (
    <div className="notifications-allignment">
      <span className="triangleIcon">
        <FontAwesomeIcon icon={faCaretUp} />
      </span>
      <ListGroup>
        {props.newNotifications && props.newNotifications.length > 0 ? (
          props.newNotifications.map((_, index) => {
            return (
              <ListGroup.Item key={index}>
                <div className="announcement-style">
                  <div className="time-diff mt-2">
                    <span>{dateDifference(_.timeStamp)}</span>
                  </div>
                  <div className="title">
                    <b>{_.title}</b>
                  </div>
                  <div className="content">{_.content}</div>
                </div>
              </ListGroup.Item>
            );
          })
        ) : (
          <ListGroup.Item>
            <div>No new notifications</div>
          </ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
}
export default ViewNotification;
