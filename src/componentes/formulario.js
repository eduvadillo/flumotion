import axios from "axios";
import { useEffect, useState } from "react";

function Formulario() {
  const API_URL = process.env.REACT_APP_API_URL;

  const [artistSearch, setArtistSearch] = useState("");
  const [songSearch, setSongSearch] = useState("");
  const [dataFound, setDataFound] = useState(false);
  const [findSong, setFindSong] = useState(false);
  const [notFindSong, setNotFindSong] = useState(false);
  const [notArtistWrite, setNotArtistWrite] = useState(false);
  const [notSongWrite, setNotSongWrite] = useState(false);
  const [notSongWriteNotArtist, setNotSongWriteNotArtist] = useState(false);

  const handleArtist = (e) => setArtistSearch(e.target.value);
  const handleAlbum = (e) => setSongSearch(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    let artists = artistSearch.replace(" ", "+");

    if (songSearch.length === 0 && artistSearch.length === 0) {
      setNotSongWriteNotArtist(`Debes escribir el nombre de un artista y una canción`);
    } else if (artistSearch.length === 0) {
      setNotArtistWrite(`Debes escribir el nombre de un artista`);
    } else if (songSearch.length === 0) {
      setNotSongWrite(`Debes escribir el nombre de una canción`);
    }

    setTimeout(() => {
      setNotSongWriteNotArtist(false);
      setNotArtistWrite(false);
      setNotSongWrite(false);
    }, 3000);

    let song = songSearch
      .trim()
      .split(" ")
      .map((v) => v[0].toUpperCase() + v.substr(1))
      .join(" ");

    setFindSong(song);

    let requestSearch = {
      artist: artists,
      album: song,
    };

    if (songSearch.length !== 0 && artistSearch.length !== 0) {
      axios
        .post(`http://localhost:5005/api/album`, requestSearch)
        .then((response) => {
          console.log(`desde el response1, `, response.data.length);
          if (response.data.length !== 0) {
            setDataFound(response.data);
          } else {
            axios.post(`http://localhost:5005/api/song-not-find`, requestSearch).then((response) => {
              console.log(`desde el not find`, response.data.length);
              setNotFindSong(response.data);
            });
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className='formulario-container'>
      <h1> Encuentra la carátula y una demo de tu canción favorita</h1>
      <form onSubmit={handleSearchSubmit}>
        <input className='inputLogin' type='text' name='artist' value={artistSearch} placeholder='Artista' onChange={handleArtist} />
        <input className='inputLogin' type='text' name='song' value={songSearch} placeholder='Canción' onChange={handleAlbum} />
        <button type='submit' className='buttonLogin'>
          Buscar
        </button>
      </form>
      {dataFound === false ? (
        <></>
      ) : (
        <div className='songs-container'>
          {dataFound.map((photo) => (
            <>
              <div className='song-found'>
                <img src={photo.artworkUrl100}></img>
                <audio controls>
                  <source src={photo.previewUrl} type='audio/mp4' />
                  <source src={photo.previewUrl} type='audio/ogg' />
                </audio>
              </div>
            </>
          ))}
        </div>
      )}
      {notFindSong === false ? (
        <></>
      ) : notFindSong.length === 0 ? (
        <h1>Lo siento, no hemos encontrado a tu artista</h1>
      ) : (
        <div className='songs-container'>
          <h2>No hemos encontado tu canción, pero puede que te gusten estas del mismo artista:</h2>
          {notFindSong.map((photo) => (
            <>
              <div className='song-found'>
                <img src={photo.artworkUrl100}></img>
                <audio controls>
                  <source src={photo.previewUrl} type='audio/mp4' />
                  <source src={photo.previewUrl} type='audio/ogg' />
                </audio>
              </div>
            </>
          ))}
        </div>
      )}
      {notArtistWrite !== false && notSongWrite === false ? <h1>{notArtistWrite}</h1> : <></>}
      {notSongWrite !== false && notArtistWrite === false ? <h1>{notSongWrite}</h1> : <></>}
      {notSongWriteNotArtist ? <h1>{notSongWriteNotArtist}</h1> : <></>}
    </div>
  );
}

export default Formulario;
