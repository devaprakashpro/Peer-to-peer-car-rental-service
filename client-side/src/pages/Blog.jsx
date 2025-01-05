import React from 'react'
import { Container, Row } from "reactstrap";
import DocumentTitle from "../components/DocumentTitle/DocumentTitle";
import CommonSection from "../components/UI/CommonSection";
import BlogList from "../components/UI/BlogList";


const Blog = () => {
  return (
    <DocumentTitle title="Blog">
      <CommonSection title="Blogs"/>
      <section>
        <Container>
          <Row>
            <BlogList />
            <BlogList />
          </Row>
        </Container>
      </section>
    </DocumentTitle>
  )
}

export default Blog