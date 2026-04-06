import { articleCollections } from '../data/portfolio';

export function ArticlesPanel() {
  return (
    <article className="home-card articles-card reveal reveal-delay" aria-labelledby="articles-title">
      <div className="articles-header">
        <p className="eyebrow">Articles</p>
        <h2 id="articles-title">Selected writing</h2>
      </div>

      <div className="articles-topics">
        {articleCollections.map((collection) => (
          <section className="article-topic" key={collection.title}>
            <h3 className="article-topic-title">{collection.title}</h3>
            <ul className="article-bullet-list">
              {collection.items.map((item) => (
                <li key={item.href}>
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {item.label} - {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}
