import { ListGroupItem, Card, Button } from "react-bootstrap";
import Album from "../../../../lib/data/dataObjects/Album";
import { useState } from "react";
import PhotosList from "./photos-list";

type AlbumItemProps = {
  album: Album;
};

export default function AlbumItem({ album }: AlbumItemProps) {
  if (!album) return <></>;

  const [showPhotos, setShowPhotos] = useState<Boolean>(false);

  return (
    <ListGroupItem>
      <div>
        <Card>
          <Card.Body>
            <Card.Title>{album.title}</Card.Title>
            <Button onClick={ () => {setShowPhotos(!showPhotos)}}>
              {showPhotos ? "Hide Photos" : "Show Photos"}
            </Button>
          </Card.Body>
        </Card>

        {showPhotos && <PhotosList album={album}/> }
      </div>
    </ListGroupItem>
  );
}