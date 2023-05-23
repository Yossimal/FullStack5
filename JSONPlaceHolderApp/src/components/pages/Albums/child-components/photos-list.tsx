import { ListGroupItem, Card, Button, Row, Col } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Album from "../../../../lib/data/dataObjects/Album";
import { useEffect, useState } from "react";
import Photo from "../../../../lib/data/dataObjects/Photo";

type PhotosListProps = {
    album: Album;
    showPhotos: Boolean;
};

export default function PhotosList({ album, showPhotos }: PhotosListProps) {
    if (!album) return <></>;

    const [photos, setPhotos] = useState<Photo[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchPhotos = async () => {
        try {
            album.photos(page).then((newPhotos) => {
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

    useEffect(() => {
        showPhotos && fetchPhotos();
      }, [showPhotos]);

    return (
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
    );
}