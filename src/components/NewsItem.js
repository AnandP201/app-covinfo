import React from "react";

const NewsItem = ({ news }) => {
  function modify(str) {
    var s = str.replace("<ul><li>", "");
    var y = s.replace("</li><li>", "");
    var x = y.replace("</li><li>", "");
    const reg = /\[\+[0-9]{1,5}\s[a-z]{5}\]/;
    return x.replace(reg, "");
  }

  const isPhone = window.matchMedia("(max-width : 480px)").matches;

  return (
    <div className="news_item">
      <div className="news_item_image_section">
        <img
          src={`${news.urlToImage}`}
          height={isPhone ? 150 : 250}
          width={isPhone ? 350 : 400}
          alt={`news-img-${news.id}`}
        />
      </div>
      <div className="news_item_content">
        <div
          style={{
            fontSize: `${isPhone ? "1.2em" : "2em"}`,
            fontWeight: "500",
          }}
        >
          {news.title}
        </div>
        <div style={{ height: "100%", fontSize: `${isPhone ? "" : "1.1em"}` }}>
          {modify(news.content)}
        </div>
        <div>
          <a href={news.link} target="_blank" rel="noreferrer">
            View Full News
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
