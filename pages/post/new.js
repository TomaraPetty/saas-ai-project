import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { AppLayout } from '../../components/AppLayout';
import { useState } from 'react';
import Markdown from 'react-markdown';

export default function NewPost(props) {
  const [postContent, setPostContent] = useState('');
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  console.log('new post props', props);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/generatePost`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ topic, keywords }),
      });
      const json = await response.json();
      console.log('RESULT:', json);
      setPostContent(json.post.postContent);
    } catch (error) {}
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <strong>Generate a blog post on the topic of:</strong>
          </label>
          <textarea
            className='resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm'
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label>
            <strong>Targeting the following keywords:</strong>
          </label>
          <textarea
            className='resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm'
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          ></textarea>
        </div>
        <button className='btn' type='submit'>
          Generate
        </button>
      </form>
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
