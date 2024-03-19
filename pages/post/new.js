import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { AppLayout } from '../../components/AppLayout';
import { useState } from 'react';
import Markdown from 'react-markdown';

export default function NewPost(props) {
  const [postContent, setPostContent] = useState('');
  console.log('new post props', props);
  const handleSubmit = async () => {
    const response = await fetch(`/api/generatePost`, {
      method: 'POST',
    });
    const json = await response.json();
    console.log('RESULT:', json);
    setPostContent(json.postContent);
  };

  return (
    <div>
      <h1>This is the new post page</h1>
      <button className='btn' onClick={handleSubmit}>
        Generate
      </button>
      <Markdown>{postContent}</Markdown>
    </div>
  );
}

NewPost.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired(() => {
  return {
    props: { test: 'this is a test' },
  };
});
