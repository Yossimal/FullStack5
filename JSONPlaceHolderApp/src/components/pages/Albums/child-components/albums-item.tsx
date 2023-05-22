import { ListGroupItem, Card, Button, Row, Col } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Album from "../../../../lib/data/dataObjects/Album";
import { useState } from "react";
import Photo from "../../../../lib/data/dataObjects/Photo";

type AlbumItemProps = {
  album: Album;
};

export default function AlbumItem({ album }: AlbumItemProps) {
  if (!album) return <></>;

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [showPhotos, setShowPhotos] = useState<Boolean>(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const handleShowPhotos = () => {
    setShowPhotos((show) => !show);
    if (showPhotos) fetchPhotos();
  };

  const fetchPhotos = async () => {
    try {
      album.photos({ _page: page }).then((newPhotos) => {
        if (newPhotos.length === 0) {
          setHasMore(false);
        }
        setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
      });

      // Update page number and check if there is more data available
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  };

  return (
    <ListGroupItem>
      <div>
        <Card>
          <Card.Body>
            <Card.Title>{album.title}</Card.Title>
            <Button onClick={handleShowPhotos}>
              {showPhotos ? "Hide Photos" : "Show Photos"}
            </Button>
          </Card.Body>
        </Card>

        {showPhotos && (
          <InfiniteScroll
            dataLength={photos.length}
            next={fetchPhotos}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<p>No more photos to load.</p>}
          >
            <Row>
              {photos.map((photo) => (
                <Col key={photo.id} md={4}>
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="img-fluid"
                  />
                  <h4>{photo.title}</h4>
                </Col>
              ))}
            </Row>
          </InfiniteScroll>
        )}
      </div>
    </ListGroupItem>
  );
}

// <Card className="mt-3">
//             <Card.Body>
//               <Card.Title>Photos</Card.Title>
//               <ListGroup>
//                 {photos.map((photo) => (
//                   <ListGroup.Item key={photo.id}>
//                     <img src={photo.url} alt={photo.title} />
//                     <h2>{photo.title}</h2>
//                     <p>URL: {photo.thumbnailUrl}</p>
//                   </ListGroup.Item>
//                 ))}
//               </ListGroup>
//             </Card.Body>
//           </Card>
