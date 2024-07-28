import Article from "./Article";
import allArticles from "../data/articles";
function Articles() {
    return(
        <>
       <div className="article-container">
        <h2 className="text-5xl my-12 font-bold text-center">Atricles List</h2>
        <section className="flex justify-between px-12 flex-wrap articles">
            
                {
                    allArticles.map(article => < Article key = {article.publishedAt} {...article}/>)            
                }
               
        </section>
        </div>
        </>
    )
}
        
    


export default Articles;