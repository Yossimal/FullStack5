import { ListGroup } from "react-bootstrap";
import { useSession } from "../../../../hooks/use-session-storage/use-session";
import User from "../../../../lib/data/dataObjects/User";
import { useEffect, useState } from "react";
 import Album from "../../../../lib/data/dataObjects/Album";
 import AlbumsItem from "./albums-item";
import { Nullable } from "../../../../types/react.types";
import { UserSerializer } from "../../../../lib/data/dataObjects/serialization";

export default function AlbumsList() {
  const [user, _] = useSession<Nullable<User>>(
    "user",
    null,
    UserSerializer
  );
  const [albums, setAlbums] = useState<Album[]>([]);

  if (!user?.id) return <></>;

  useEffect(() => {
    user.albums.then((albums) => {
        setAlbums(albums);
    });
  }, [user]);

  const albumsDOM = albums.map((album: Album) => {
    return <AlbumsItem album={album} key={album.id} />;
  });

  return <ListGroup>{albumsDOM}</ListGroup>;
}



// import { ListGroup } from "react-bootstrap";
// import { useSession } from "../../../../hooks/use-session-storage/use-session";
// import User from "../../../../lib/data/dataObjects/User";
// import { useEffect, useState } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
// import Album from "../../../../lib/data/dataObjects/Album";
// import AlbumsItem from "./albums-item";
// import { Nullable } from "../../../../types/react.types";
// import { UserSerializer } from "../../../../lib/data/dataObjects/serialization";

// export default function AlbumsList() {
//   const [user, _] = useSession<Nullable<User>>("user", null, UserSerializer);
//   const [albums, setAlbums] = useState<Album[]>([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   if (!user?.id) return <></>;

//   useEffect(() => {
//     fetchAlbums();
//   }, [user]);

//   const fetchAlbums = async () => {
//     try {
//       user.getAlbums(page).then((newAlbums) => {
//         if (newAlbums.length === 0) {
//           setHasMore(false);
//         }
//         setAlbums((prevAlbums) => [...prevAlbums, ...newAlbums]);
//       });

//       // Update page number and check if there is more data available
//       setPage((prevPage) => prevPage + 1);
//     } catch (error) {
//       console.error("Error fetching albums:", error);
//     }
//   };

// //   const albumsDOM = albums.map((album: Album) => {
// //     return <AlbumsItem album={album} key={album.id} />;
// //   });
// //  return <ListGroup>{albumsDOM}</ListGroup>;

//   return (
//     <InfiniteScroll
//       dataLength={albums.length}
//       next={fetchAlbums}
//       hasMore={hasMore}
//       loader={<h4>Loading...</h4>}
//       endMessage={<p>No more albums to load.</p>}
//     >
//       {albums.map((album) => (
//         <AlbumsItem album={album} key={album.id} />
//       ))}
//     </InfiniteScroll>
//   );
// }
