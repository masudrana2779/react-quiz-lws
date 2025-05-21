import { useState } from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import Video from "./Video";
import useVideosList from "../hooks/useVideosList";

export default function Videos() {
  const [page, setPage] = useState(1);
  const { loading, error, videos, hasMore } = useVideosList(page);
  console.log("🚀 ~ Videos ~ videos:", videos);
  if (loading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }
  return (
    <div>
      {videos.length > 0 && (
        <InfiniteScroll
          dataLength={videos.length}
          hasMore={hasMore}
          next={() => {
            setPage(page + 8);
          }}
          loader={
            <div>
              <h2>Loading...</h2>
            </div>
          }
        >
          {videos.map((video) =>
            video.noq > 0 ? (
              <Link key={video.youtubeID} to="/quiz">
                <Video
                  title={video.title}
                  id={video.youtubeID}
                  noq={video.noq}
                />
              </Link>
            ) : (
              <Video
                key={video.youtubeID}
                title={video.title}
                id={video.youtubeID}
                noq={video.noq}
              />
            )
          )}
        </InfiniteScroll>
      )}
      {!loading && videos.length === 0 && (
        <div>
          <h2>No Videos Available</h2>
        </div>
      )}
      {error && (
        <div>
          <h2>There was an error!!</h2>{" "}
        </div>
      )}
    </div>
  );
}
