import DOMPurify from 'dompurify';

const SingleBlog = ({blog}) => {
  window.scrollTo(0, 0);

  const {
    title,
    category,
    author,
    content,
    tags,
    image_url,
    created_at,
    description,
  } = blog;

  const sanitizeContent = DOMPurify.sanitize(content);

  return (
    <article className="text-justify text-[var(--text-color)] container mx-auto flex flex-col gap-2 py-2 px-4">
      <div className="flex flex-col gap-2 text-justify">
        <h1 className="text-xl text-[var(--primary-color)] font-semibold">{title}</h1>
        <p className="text-base">{description}</p>
      </div>
      {/* <div className="flex gap-4">
        <h4>Tags: {tags}</h4>
        <h2>Category: {category}</h2>
      </div> */}
      <div className="flex">
        <img src={image_url} alt={title} />
      </div>
      <div>
        <h3>Author: {author}</h3>
        <p>Created at: {created_at}</p>
      </div>
      <div className='' dangerouslySetInnerHTML={{__html : sanitizeContent}}>
      </div>
    </article>
  );
};

export default SingleBlog;
