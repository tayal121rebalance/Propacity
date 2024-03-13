import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  1% { opacity: 0; }
  100% { opacity: 100; }
`;


const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align : center;
  background-image: url('./images/img1.jpg');
  background-size: 110%;
  background-position: center;
  padding: 20px;
  animation: ${fadeIn} 6s ease; 
`;

const AirportContainer = styled.div`
  margin: auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 10px;
  width : 80%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
  animation: ${fadeIn} 4s ease; 
`;

const AirportTitle = styled.h1`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #0e4d92;
`;

const AirportControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const AirportButton = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: green;
  }
`;

const AirportInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex: 1;
`;

const AirportTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const AirportTableHeader = styled.th`
  background-color: Black;
  font-size : 18px;
  color: white;
`;

const AirportTableRow = styled.tr`
  margin-bottom: 20px;

  &:nth-child(even) {
    background-color: #d8f2f3;
  }

  &:hover {
    background-color: #ddd;
  }
`;

const BookButton = styled.button`
  padding: 5px 10px;
  background-color: #4CAF50; 
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const FlightList = () => {
  const [flights, setFlights] = useState([]);
  const [sortByPrice, setSortByPrice] = useState(false);
  const [filterByAirline, setFilterByAirline] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.npoint.io/378e02e8e732bb1ac55b');
      const jsonData = await response.json();
      setFlights(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSortByPrice = () => {
    const sortedFlights = [...flights].sort((a, b) => a.price - b.price);
    setFlights(sortedFlights);
    setSortByPrice(true);
  };

  const handleFilterByAirline = event => {
    setFilterByAirline(event.target.value);
  };

  const filteredFlights = flights.filter(flight =>
    flight.airline.toLowerCase().includes(filterByAirline.toLowerCase())
  );

  return (
    <MainWrapper>
        {/* <Photo><img src="./images/img1.jpg"/></Photo> */}
        
      <AirportContainer>
        <AirportTitle>JetSetGo - Simplifying Flight Bookings</AirportTitle>
        <AirportControls>
          <AirportButton onClick={handleSortByPrice}>Sort by Price</AirportButton>
          <AirportInput
            type="text"
            placeholder="Find your AirLine"
            value={filterByAirline}
            onChange={handleFilterByAirline}
          />
        </AirportControls>
        <AirportTable>
          <thead>
            <tr>
              <AirportTableHeader>ID</AirportTableHeader>
              <AirportTableHeader>Gate</AirportTableHeader>
              <AirportTableHeader>Price</AirportTableHeader>
              <AirportTableHeader>Origin</AirportTableHeader>
              <AirportTableHeader>Airline</AirportTableHeader>
              <AirportTableHeader>Aircraft</AirportTableHeader>
              <AirportTableHeader>Duration</AirportTableHeader>
              <AirportTableHeader>Arrival Time</AirportTableHeader>
              <AirportTableHeader>Destination</AirportTableHeader>
              <AirportTableHeader>Flight Number</AirportTableHeader>
              <AirportTableHeader>Departure Time</AirportTableHeader>
              <AirportTableHeader>Seats Available</AirportTableHeader>
              <AirportTableHeader>Actions</AirportTableHeader>
            </tr>
          </thead>
          <tbody>
            {filteredFlights.map(flight => (
              <AirportTableRow key={flight.id}>
                <td>{flight.id}</td>
                <td>{flight.gate}</td>
                <td>{flight.price}</td>
                <td>{flight.origin}</td>
                <td>{flight.airline}</td>
                <td>{flight.aircraft}</td>
                <td>{flight.duration}</td>
                <td>{flight.arrivalTime}</td>
                <td>{flight.destination}</td>
                <td>{flight.flightNumber}</td>
                <td>{flight.departureTime}</td>
                <td>{flight.seatsAvailable}</td>
                <td><BookButton>Book</BookButton></td>
              </AirportTableRow>
            ))}
          </tbody>
        </AirportTable>
      </AirportContainer>
    </MainWrapper>
  );
};

export default FlightList;
