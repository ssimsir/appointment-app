import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import ReservationForm from "./ReservationForm";
import { Button } from "react-bootstrap";

const Doctor = ({ doctor }) => {
	const { /*id,*/ name, dep, img } = doctor;

	const [appointmentDate, setAppointmentDate] = useState(new Date());
	const [reservationData, setReservationData] = useState(null);
	const [appointmentData, setAppointmentData] = useState(null);

	function formatDate(date) {
		let d = new Date(date),
			month = "" + (d.getMonth() + 1),
			day = "" + d.getDate(),
			year = d.getFullYear();
		if (month.length < 2) month = "0" + month;
		if (day.length < 2) day = "0" + day;
		return [year, month, day].join("-");
	}

	useEffect(() => {
		fetchReservationData();
	}, []);

	useEffect(() => {
		fetchAppointmentData();
	}, []);

	const fetchReservationData = async () => {
		try {
			const response = await fetch(
				"https://mock-server-cdkz.onrender.com/appointmentApp.reservationData"
			);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const result = await response.json();
			setReservationData(result);
		} catch (error) {
			console.error("Error fetching data:", error.message);
		}
	};

	const fetchAppointmentData = async () => {
		try {
			const url = `https://mock-server-cdkz.onrender.com/appointmentApp.appointmentData`;
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const result = await response.json();
			setAppointmentData(result);
		} catch (error) {
			console.error("Error fetching data:", error.message);
		}
	};

	const handleAppointmendDelete = (id) => {
		alert(id);
	};

	const handleAppointmendConsulted = (id) => {
		alert(id);
	};
	
	return (
		<>
			{reservationData && appointmentData ? (
				<Table bordered="true">
					<thead>
						<tr>
							<th style={{ width: "10%" }}></th>
							<th colSpan={14} style={{ textAlign: "center" }}>
								<i
									style={{ cursor: "pointer" }}
									className="fa-solid fa-arrow-left"
									onClick={() =>
										setAppointmentDate(
											new Date(
												appointmentDate.setDate(
													appointmentDate.getDate() -
														1
												)
											)
										)
									}
								></i>
								<span style={{ margin: "2rem" }}>
									{formatDate(appointmentDate)}
								</span>
								<i
									style={{ cursor: "pointer" }}
									className="fa-solid fa-arrow-right"
									onClick={() =>
										setAppointmentDate(
											new Date(
												appointmentDate.setDate(
													appointmentDate.getDate() +
														1
												)
											)
										)
									}
								></i>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr style={{ height: "20px", width: "17rem" }}>
							<td rowSpan={2}>
								<Card
									style={{ width: "17rem", margin: ".2rem" }}
								>
									<Card.Img variant="top" src={img} />
									<Card.Body>
										<Card.Title>{name}</Card.Title>
										<Card.Text>{dep}</Card.Text>
									</Card.Body>
								</Card>
							</td>
							{reservationData.map((item) => (
								<td key={item.id}>{item.time}</td>
							))}
						</tr>
						<tr>
							{reservationData.map((item) => {
								const filteredAppointmentData =
									appointmentData.filter(
										(data) =>
											data.doctor === name &&
											data.date ===
												formatDate(appointmentDate) &&
											data.time === item.id
									);
								return (
									<td key={item.id}>
										<div>
											{filteredAppointmentData.length ===
											1 ? (
												
												<>
												{console.log(filteredAppointmentData)}
													<div
														style={{
															display: "flex",
															justifyContent:
																"space-between",
														}}
													>
														<p
															style={{
																color: "green",
																fontSize:
																	"1.5rem",
															}}
														>
															<i
																style={{
																	cursor: "pointer",
																}}
																className="fa-regular fa-circle-check"
																onClick={() =>
																	handleAppointmendConsulted(filteredAppointmentData[0].id)
																}
															></i>
														</p>
														<p
															style={{
																color: "red",
																fontSize:
																	"1.5rem",
															}}
														>
															<i
																style={{
																	cursor: "pointer",
																}}
																className="fa-regular fa-circle-xmark"
																onClick={() =>
																	handleAppointmendDelete(filteredAppointmentData[0].id)
																}
															></i>
														</p>
													</div>
													<p>
														{
															filteredAppointmentData[0]
																.patient
														}
													</p>
												</>
											) : (
												<ReservationForm
													setAppointmentDate={
														setAppointmentDate
													}
													appointmentData={
														appointmentData
													}
													setAppointmentData={
														setAppointmentData
													}
													name={name}
													date={formatDate(
														appointmentDate
													)}
													time={item.time}
													timeId={item.id}
												/>
											)}
										</div>
									</td>
								);
							})}
						</tr>
					</tbody>
				</Table>
			) : (
				<p>Loading...</p>
			)}
		</>
	);
};
export default Doctor;
