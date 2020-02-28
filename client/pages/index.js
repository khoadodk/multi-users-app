import { useState } from 'react';
import axios from 'axios';
import Router from 'next/router';
import Link from 'next/link';

import { API } from '../config';
import Layout from '../components/Layout';

const Home = ({ categories }) => {
  console.log(categories);
  return (
    <Layout>
      <div className="row">
        <div className="col-md-12">
          <h1 className="font-weight-bold title">Tutorials and Courses</h1>
          <br />
        </div>
      </div>

      <div className="container">
        <div className="row d-flex justify-content-center text-center">
          {categories.map((c, i) => (
            <Link key={i} href={`/links/${c.slug}`}>
              <a
                style={{ border: '1px solid black', width: '200px' }}
                className="bg-light p-3 m-1"
              >
                <div>
                  <img
                    src={c.image && c.image.url}
                    alt={c.name}
                    style={{ width: 'auto', height: '100px' }}
                  />
                  <h4>{c.name}</h4>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

Home.getInitialProps = async () => {
  const reponse = await axios.get(`${API}/categories`);
  if (!reponse) {
    return { categories: [] };
  }
  return { categories: reponse.data };
};

export default Home;
