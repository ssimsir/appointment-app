import { useEffect, useState } from "react";
import Doctor from "./Doctor";

const Doctors = () => {
	const [doctorData, setDoctorData] = useState(null);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await fetch(
				"https://mock-server-cdkz.onrender.com/appointmentApp.doctorData"
			);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const result = await response.json();
			setDoctorData(result);
		} catch (error) {
			console.error("Error fetching data:", error.message);
		}
	};

	return (
		<div>
			{doctorData ? (
				<div>
					{doctorData.map((doctor) => (
						<Doctor key={doctor.id} doctor={doctor} />
					))}
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};
export default Doctors;
