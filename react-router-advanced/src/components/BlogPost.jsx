import { useParams } from 'react-router-dom';

export default function BlogPost() {
  const { postId } = useParams();
  return (
    <div>
      <h2>Blog Post #{postId}</h2>
      <p>This is content for post ID: {postId}</p>
    </div>
  );
}