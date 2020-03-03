import { useState } from 'react';
import axios from 'axios';
import Router from 'next/router';
import Link from 'next/link';

import { API } from '../config';
import Layout from '../components/Layout';
import LinkComponent from '../components/LinkComponent';
import Footer from '../components/Footer';

const Home = ({ categories, popular }) => {
  const handleClickCount = async _id => {
    await axios.put(`${API}/click-count`, { _id });
  };
  return (
    <Layout>
      <div className="row">
        <div className="col-md-12">
          <h1 className="font-weight-bold title">Tutorials and Courses</h1>
        </div>
      </div>

      <div className="container">
        <div className="row d-flex justify-content-center text-center">
          {categories &&
            categories.map((c, i) => (
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

      {/* Trending Links */}
      <div className="row">
        <div className="col-md-12">
          <h1 className="font-weight-bold title">Trending</h1>
        </div>
      </div>

      <div className="trending-links container">
        {popular &&
          popular.map(link => (
            <div className="row alert alert-info mb-0 mt-2" key={link._id}>
              <LinkComponent link={link} handleClickCount={handleClickCount} />
            </div>
          ))}
      </div>
      <Footer />
    </Layout>
  );
};

Home.getInitialProps = async () => {
  const responseCat = await axios.get(`${API}/categories`);
  const responseLinks = await axios.get(`${API}/links/popular`);
  // app still run if failed to fetch data
  if (!responseCat || !responseLinks) {
    return { categories: '', popular: '' };
  }
  return { categories: responseCat.data, popular: responseLinks.data };
};

export default Home;
