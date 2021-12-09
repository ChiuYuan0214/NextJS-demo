import React, { Fragment } from "react";
import { useRouter } from "next/router";
import Head from 'next/head';

import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetupPage = () => {
  const router = useRouter();

  const addMeetupHandler = async (enteredData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enteredData),
    });

    const data = await response.json();
    console.log(data);

    router.replace("/"); // instead of using push, replace can ensure that users are not able to go back to the previous page
  };

  return (
    <Fragment>
      <Head>
        <title>Add a New Meetup</title>
        <meta name="description" content="Add your own meetups and create amzing networking opportunities." />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
};

export default NewMeetupPage;
