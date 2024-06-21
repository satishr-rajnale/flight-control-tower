const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.text());

let events = [];

app.post("/event", (req, res) => {
  const event = req.body.trim();
  events.push(event);
  res.send("Event received");
});

app.post("/update-event", (req, res) => {
  const event = req.body.trim();
  const [planeId, , , , eventType, timestamp, fuelDelta] = event.split(" ");

  // Remove the old event with same Plane ID, Event Type, and Timestamp
  events = events.filter((e) => {
    const [ePlaneId, , , , eEventType, eTimestamp] = e.split(" ");
    return !(
      ePlaneId === planeId &&
      eEventType === eventType &&
      eTimestamp === timestamp
    );
  });

  // Add the updated event
  events.push(event);
  res.send("Event updated");
});

app.post("/remove-event", (req, res) => {
  const [planeId, timestamp] = req.body.trim().split(" ");

  // Remove the event with the same Plane ID and Timestamp
  events = events.filter((e) => {
    const [ePlaneId, , , , , eTimestamp] = e.split(" ");
    return !(ePlaneId === planeId && eTimestamp === timestamp);
  });

  res.send("Event removed");
});

app.get("/status/:timestamp", (req, res) => {
  const { timestamp } = req.params;
  const status = calculateStatus(timestamp);
  res.json(status);
});

const calculateStatus = (timestamp) => {
  const statuses = {};
  const eventsTillTimestamp = events.filter(
    (e) => new Date(e.split(" ")[5]) <= new Date(timestamp)
  );

  eventsTillTimestamp.forEach((event) => {
    const [planeId, , , , eventType, , fuelDelta] = event.split(" ");
    if (!statuses[planeId]) {
      statuses[planeId] = { fuel: 0, status: "Awaiting-Takeoff" };
    }

    const fuelDeltaInt = parseInt(fuelDelta, 10);

    if (eventType === "Re-Fuel") {
      statuses[planeId].fuel += fuelDeltaInt;
    } else if (eventType === "Take-Off") {
      statuses[planeId].status = "In-Flight";
      statuses[planeId].fuel = fuelDeltaInt;
    } else if (eventType === "Land") {
      statuses[planeId].status = "Landed";
      statuses[planeId].fuel += fuelDeltaInt;
    }
  });

  return Object.entries(statuses).map(([planeId, { status, fuel }]) => ({
    planeId,
    status,
    fuel,
  }));
};

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
