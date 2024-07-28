function Article(props) {
    return(
        <>
        <article className="flex-custom article">
            <div className="p-8 rounded-lg shadow-custom mb-8 ">
                <img src={props.urlToImage} alt={props.title} className="w-full rounded-lg"/>
                <h1 className="text-2xl my-2 text-blue-800 font-bold">{props.title}</h1> 
                <p className="my-2">{props.content.slice(0, 200)}</p>
                <a href={props.url} className="p-2 bg-green-600 rounded-lg text-white font-bold inline-block my-2">Read More</a>
            </div>
              
        </article>
        </>

    );
}

export default Article;