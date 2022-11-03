import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import NewsItem from "./NewsItem";
import Loader from "./utils/Loader";
import { MdHealthAndSafety } from "react-icons/md";

const NewsContainer = () => {
  const [news, setNews] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const newsRef = useRef(null);
  const [index, setIndex] = useState(0);

  const isPhone = window.matchMedia("(max-width : 480px)").matches;

  function fetchNews() {
    !news &&
      axios
        .get(
          "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/news/get-health-news/1",
          {
            headers: {
              "X-RapidAPI-Key": process.env.REACT_APP_NEWS_KEY,
              "X-RapidAPI-Host": process.env.REACT_APP_NEWS_HOST,
            },
          }
        )
        .then((res) => {
          setNews(res.data.news);
          setIsLoading(false);
        });
  }

  function updateTrack() {
    if (index >= 9) {
      newsRef.current.style.transform = "translateX(0px)";
      setIndex(0);
      return;
    }
    setIndex(index + 1);
    if (isPhone) {
      newsRef.current.style.transform += "translateX(-360px)";
      return;
    }
    newsRef.current.style.transform += "translateX(-1210px)";
  }

  useEffect(() => {
    !news && fetchNews();

    const news_timer = setTimeout(() => {
      updateTrack();
    }, 5000);

    return () => {
      clearTimeout(news_timer);
    };
    // eslint-disable-next-line
  }, [index]);

  return (
    <div>
      {isLoading && <Loader content={"Loading news"} />}
      {!isLoading && (
        <div className="news_carousel_container animate__animated animate__fadeIn">
          <div className="news_carousel">
            <div className="news_track" ref={newsRef}>
              {news.map((item, index) => {
                return <NewsItem news={item} key={index} />;
              })}
            </div>
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="guidelines">
          <div className="guidelines_header">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "fit-content",
                margin: "0 auto",
                marginTop: `${isPhone ? "" : "-40px"}`,
                borderRadius: "50%",
                boxShadow: "1px 2px 5px 2px rgba(0,0,0,0.45)",
                overflow: "hidden",
              }}
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvS4w-zMsV-AhqZxm1A-LORCOUrgQs4klDhw&usqp=CAU"
                height="150"
                width="200"
                alt="covid_guid_img"
              />
            </div>
            <h2 align="center" style={{ fontWeight: "500", padding: "0.4em" }}>
              COVID-19 GUIDELINES
            </h2>
            <div style={{ height: "100%", padding: "0.4em" }}>
              If you have COVID-19, you can spread the virus to others. <br />
              Isolation, Masking, and Avoiding contact with people who are at
              high risk of getting very sick, is great step to reduce covid
              spread
            </div>
          </div>
          <div className="guidelines_body animate__animated animate__fadeIn">
            <div style={{ display: "flex", alignItems: "center" }}>
              <MdHealthAndSafety size={25} color="red" />
              <h3 style={{ fontWeight: "500", padding: "5px" }}>
                What we need to do ?
              </h3>
            </div>
            <ul style={{ listStyleType: "disc", lineHeight: "180%" }}>
              <li>
                Wear a high-quality mask if we are around others at home and in
                public
              </li>
              <li>Do not go places where we are unable to wear a mask.</li>
              <li>Do not travel.</li>
              <li>
                Staying home and be seperated from others as much as possible.
              </li>
              <li>Using a separate bathroom, if possible.</li>

              <li>
                Don’t share personal household items, like cups, towels, and
                utensils.
              </li>
              <li>
                Monitor our symptoms. If we have an emergency warning sign (like
                trouble breathing), seek emergency medical care immediately.
              </li>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <a
                  href="https://www.cdc.gov/coronavirus/2019-ncov/if-you-are-sick/steps-when-sick.html"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  Need more info about guidelines
                </a>
              </div>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsContainer;
