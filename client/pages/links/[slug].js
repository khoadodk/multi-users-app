import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

import { API } from '../../config';
import Layout from '../../components/Layout';
import ErrorMessage from '../../components/ErrorMessage';
import SuccessMessage from '../../components/SuccessMessage';

const Links = ({ links, category }) => {
  console.log(links);
  console.log(category);
  return (
    <Layout>
      <div className="container">
        <h1 className="title">{category.name} Tutorials</h1>
        <div className="row">
          <div className="col-md-2 p-0 d-flex justify-content-center align-items-center mb-2">
            <img
              src={category.image.url}
              alt={category.name}
              style={{ width: 'auto', maxHeight: '120px' }}
            />
          </div>
          <div className="col-md-10">
            <div
              className="lead alert alert-secondary p-0 m-0"
              style={{
                backgroundColor: '#fcf8e3'
              }}
            >
              <p className="m-2">{category.content}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

Links.getInitialProps = async ({ query }) => {
  const slug = query.slug;
  let skip = 0;
  let limit = 2;
  const response = await axios.post(`${API}/category/${slug}`, { skip, limit });
  return { category: response.data.category, links: response.data.links };
};

export default Links;
