import React, { Fragment } from "react";
import Head from 'next/head';
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_DATA = [
//   {
//     id: "m1",
//     title: "first meet",
//     image:
//       "https://en.wikipedia.org/wiki/Ulstein_Church#/media/File:Ulstein-Church-2020.jpg",
//     address: "first road",
//   },
//   {
//     id: "m2",
//     title: "second meet",
//     image:
//       "https://en.wikipedia.org/wiki/Ulstein_Church#/media/File:Ulstein-Church-2020.jpg",
//     address: "second road",
//   },
//   {
//     id: "m3",
//     title: "third meet",
//     image:
//       "https://en.wikipedia.org/wiki/Ulstein_Church#/media/File:Ulstein-Church-2020.jpg",
//     address: "third road",
//   },
// ];

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list of active React meetups!" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// export const getServerSideProps = async (context) => {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_DATA,
//     },
//   };
// };

export const getStaticProps = async () => {
  // fetch data from API
  const client = await MongoClient.connect(
    "mongodb+srv://adam:adam1234@cluster0.g5pge.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetupsCollection");
  const meetups = await meetupsCollection.find().toArray();

  console.log('meetups:', meetups);

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        // title: meetup.title,
        // address: meetup.address,
        // image: meetup.image,
        ...meetup,
        _id: null,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1, // the frequency that the app will wait for to refetch the data.
  };
};

export default HomePage;
