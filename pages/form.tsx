import { useState } from "react";
import PIPForm from "../components/PIPForm";
import Contacts from "../components/Contacts";
import { fetcher } from '../lib/api';
import useSWR from 'swr';
import Layout from "../components/Layout";
import { useFetchUser } from "../lib/authContext";

const Form = ({contacts}) => {
  const [pageIndex, setPageIndex] = useState(1);
  const { user, loading } = useFetchUser();
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/contacts?pagination[page]=${pageIndex}&pagination[pageSize]=5`,
    fetcher,
    {
      fallbackData: contacts,
    }
  );
  return (
    <Layout user={user}>
    <div>
      <main className="h-screen">
        <div className="mx-auto py-8">
          <PIPForm initialData={undefined} onSubmit={undefined}   />
        </div>
        {/* <div className="mx-auto py-8">
          <Contacts contacts={data}/>
          </div> */}
          <div className="space-x-2 space-y-2">
        {/* <button
          className={`md:p-2 rounded py-2 text-black text-white p-2 ${
            pageIndex === 1 ? 'bg-gray-300' : 'bg-blue-400'
          }`}
          disabled={pageIndex === 1}
          onClick={() => setPageIndex(pageIndex - 1)}
        >
          {' '}
          Previous
        </button>
        <button
          className={`md:p-2 rounded py-2 text-black text-white p-2 ${
            pageIndex === (data && data.meta.pagination.pageCount)
              ? 'bg-gray-300'
              : 'bg-blue-400'
          }`}
          disabled={pageIndex === (data && data.meta.pagination.pageCount)}
          onClick={() => setPageIndex(pageIndex + 1)}
        >
          Next
        </button> */}
        {/* <span>{`${pageIndex} of ${
          data && data.meta.pagination.pageCount
        }`}</span> */}
      </div>
      </main>
    </div>
    </Layout>
  );
}

export default Form;
 export async function getStaticProps() {
  const formResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/contacts`);
  console.log(formResponse, "formResponse");
  return {
    props: {
      contacts: formResponse,
    },
  };
 }