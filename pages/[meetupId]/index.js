import React, { Fragment } from "react";
import Head from 'next/head';
import { MongoClient, ObjectId } from "mongodb";

import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://adam:adam1234@cluster0.g5pge.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetupsCollection");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray(); // empty object means that there's no filter criteria
  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://adam:adam1234@cluster0.g5pge.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetupsCollection");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  }); // find the file which has the same id as meetupId.
  client.close();

  return {
    props: {
      meetupData: {
        ...selectedMeetup,
        id: selectedMeetup._id.toString(),
        _id: null,
      },
    },
  };
}

export default MeetupDetails;
