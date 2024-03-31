import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import ReservationForm from "./ReservationForm";

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

	const handleAppointmentConsulted = (id) => {
		appointmentData.forEach((element, i) => {
			if (element.id ===id){
				appointmentData[i].consulted=true
				fechAppointmentConsulted(appointmentData[i]);
			}
		});
		setAppointmentDate(new Date(formatDate(appointmentDate)));
	};

	const fechAppointmentConsulted = async(appointment) => {
		try {
			const request = await fetch(`https://mock-server-cdkz.onrender.com/appointmentApp.appointmentData/${appointment.id}`, {
				method: 'PUT',
				body:  JSON.stringify(appointment),
				headers: {
				  "Content-type": "application/json; charset=UTF-8"
				}
			})
			if (!request.ok){
				throw new Error("throw error")
			}else{
				const data = await request.json()
				console.log(data)
			}
		}
		catch(error){
			console.log(error)
		}
	} 

	const handleAppointmentDelete = (id) => {

		appointmentData.forEach((element, i) => {
			if (element.id ===id){
				appointmentData.splice(i,1)
				fechAppointmentDelete(element.id);
			}
		});
		setAppointmentDate(new Date(formatDate(appointmentDate)));
	};

	const fechAppointmentDelete = async(id) => {
		try {
			const request = await fetch(`https://mock-server-cdkz.onrender.com/appointmentApp.appointmentData/${id}`, {
				method: 'DELETE'
			})
			if (!request.ok){
				throw new Error("throw error")
			}else{
				const data = await request.json()
				console.log(data)
			}
		}
		catch(error){
			console.log(error)
		}
	}

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
													appointmentDate.getDate() - 1
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
													appointmentDate.getDate() + 1
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
								<Card style={{ width: "17rem", margin: ".2rem" }}>
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
								const filteredAppointmentData = appointmentData.filter(
									(data) =>
										data.doctor === name &&
										data.date === formatDate(appointmentDate) &&
										data.time === item.id
								);
								return (
									<td key={item.id}>
										<div>
											{filteredAppointmentData.length === 1 ? (
												<>
													{filteredAppointmentData[0].consulted || 
													<div
														style={{
															display: "flex",
															justifyContent: "space-between",
														}}
													>
														<p
															style={{
																color: "green",
																fontSize: "1.5rem",
															}}
														>
															<i
																style={{
																	cursor: "pointer",
																}}
																className="fa-regular fa-circle-check"
																onClick={() =>
																	handleAppointmentConsulted(
																		filteredAppointmentData[0]
																			.id
																	)
																}
															></i>
														</p>
														<p
															style={{
																color: "red",
																fontSize: "1.5rem",
															}}
														>
															<i
																style={{
																	cursor: "pointer",
																}}
																className="fa-regular fa-circle-xmark"
																onClick={() =>
																	handleAppointmentDelete(
																		filteredAppointmentData[0]
																			.id
																	)
																}
															></i>
														</p>
													</div>}
													<p style={{fontSize:"1.1rem", fontWeight:"bold", color:"red"}}>
														{filteredAppointmentData[0].patient}
													</p>
													{filteredAppointmentData[0].consulted && <p style={{border:"1px solid blueviolet", borderRadius:"7px", textAlign:	"center", backgroundColor:"blueviolet", color:"white", padding:".5rem"}}>CONSULTED</p>}
												</>
											) : (
												<ReservationForm
													setAppointmentDate={setAppointmentDate}
													appointmentData={appointmentData}
													setAppointmentData={setAppointmentData}
													name={name}
													date={formatDate(appointmentDate)}
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
