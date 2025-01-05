import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from "reactstrap";
import DocumentTitle from "../components/DocumentTitle/DocumentTitle"
import CommonSection from '../components/UI/CommonSection'
import TutorItem from "../components/UI/TutorItem";
import axios from "axios"
import { useParams } from 'react-router-dom';



const TutorListing = () => {
  const {id} = useParams();
  const [data, setData] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  console.log(searchValue);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://carcoach-apis.onrender.com/api/tutors-applicants-all${searchValue?"/"+searchValue: ""}`);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [searchValue]);

  return (
    <DocumentTitle title="Reserver Tutor">
      <CommonSection title="Driving Tutors" />
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className=" d-flex align-items-center gap-3 mb-5">
                <span className=" d-flex align-items-center gap-2">
                  <i class="ri-sort-asc"></i> Sort By
                </span>

                <select value={searchValue} onChange={(event) => setSearchValue(event.target.value)}>
                  <option value="">Select</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </div>
            </Col> 

            {data?data.map((item) => (
              <TutorItem item={item} key={item.id} user_id={id} />
            )):(<p>Loading data...</p>)}
          </Row>
        </Container>
      </section>
    </DocumentTitle>
  )
}

export default TutorListing