import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {reservationData} from "../../helpers/data"

const Doctor = ({ doctor }) => {
	const { /*id,*/ name, dep, img } = doctor;
	
    function formatDate(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
        return [day, month, year].join('.');
    }
    const today = formatDate(new Date())


	

	return (
		<Table responsive="sm" bordered="true">
			<thead>
				<tr>
					<th style={{width:"10%"}}></th>
					<th colSpan={7} style={{textAlign:"center"}}><i className="fa-solid fa-arrow-left"></i><span style={{margin:"2rem"}}>{today}</span><i className="fa-solid fa-arrow-right"></i></th>

				</tr>
			</thead>
			<tbody>
				<tr style={{height:"20px"}}>
					<td rowSpan={4}>
						<Card style={{ width: "20rem", margin:"1rem" }}>
							<Card.Img variant="top" src={img} />
							<Card.Body>
								<Card.Title>{name}</Card.Title>
								<Card.Text>{dep}</Card.Text>
							</Card.Body>
						</Card>
					</td>
					{reservationData.map(item=> item.id<=7 ? <td>{item.time}</td>: "")}
				</tr>
				<tr>
					{reservationData.map(item=> item.id<=7 ? <td><Button variant="primary">Click for Reserve</Button></td>: "")}
				</tr>
				<tr style={{height:"20px"}}>
					{reservationData.map(item=> item.id>7 ? <td>{item.time}</td>: "")}
				</tr>
				<tr>
					{reservationData.map(item=> item.id>7 ? <td><Button variant="primary">Click for Reserve</Button></td>: "")}
				</tr>

			</tbody>
		</Table>
	);
};
export default Doctor;
