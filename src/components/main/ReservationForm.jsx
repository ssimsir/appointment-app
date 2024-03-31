import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function ReservationForm({
	setAppointmentDate,
	appointmentData,
	setAppointmentData,
	name,
	date,
	time,
	timeId,
}) {
	const [showModal, setShowModal] = useState(false);

	const [patientName, setPatientName] = useState("");

	const handleShowModal = () => setShowModal(true);
	const handleCloseModal = () => setShowModal(false);

	const handleSubmitClick = () => {
		if (patientName.trim() === "") {
			alert("enter invalid name");
		} else {
			const id = appointmentData.length + 1;
			saveReservation(id, patientName, date, timeId, name);
			appointmentData.push({
				id: id,
				patient: patientName,
				date: date,
				time: timeId,
				consulted: false,
				doctor: name,
			});
			setAppointmentData(appointmentData);
			setAppointmentDate(new Date(date));
			handleCloseModal();
		}
	};

	const saveReservation = async (
		id,
		patinetName,
		date,
		timeId,
		doctorName
	) => {
		try {
			const response = await fetch(
				"https://mock-server-cdkz.onrender.com/appointmentApp.appointmentData",
				{
					method: "POST",
					body: `{"id": "${id}","patient": "${patinetName}","date": "${date}","time": ${timeId},"consulted": false,"doctor": "${doctorName}"}`,
					headers: { "Content-Type": "application/json" },
				}
			);
			const result = await response.json();

			console.log(result);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<div>
			<Button variant="primary" onClick={handleShowModal}>
				Reservation
			</Button>

			<Modal show={showModal} onHide={handleCloseModal}>
				<Modal.Header closeButton>
					<Modal.Title style={{ color: "red" }}>
						Reservation for {name}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Label>
							{date} - {time}
						</Form.Label>
						<Form.Group controlId="formName">
							<Form.Label>Patinet Name</Form.Label>
							<Form.Control
								onChange={(e) => setPatientName(e.target.value)}
								required
								type="text"
								placeholder="Enter your name"
							/>
							<Form.Control.Feedback type="invalid">
								Please provide a valid Name.
							</Form.Control.Feedback>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={handleSubmitClick}>
						Submit
					</Button>
					<Button variant="danger" onClick={handleCloseModal}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default ReservationForm;
