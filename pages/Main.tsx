import React, { useEffect, useState } from "react";

type Movie = {
  ID: number;
  NAME: String;
  CREATED_AT: String;
  UPDATED_AT: String;
};

const Main: React.FC = () => {
  const [data, setData] = useState<Movie[] | null>(null);
  const [createMovieName, setCreateMovieName] = useState<String>("");
  const [updateMovieName, setUpdateMovieName] = useState<String>("");
  const [open, setOpen] = useState<Number>(-1);

  const fetchMovie = () => {
    fetch("http://localhost:3001/movie", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  };

  // CSR
  useEffect(() => {
    fetchMovie();
  }, []);

  const sendMovieName = () => {
    fetch("http://localhost:3001/movie", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: createMovieName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .then(fetchMovie);
  };

  const deleteMovie = (id: number) => {
    fetch("http://localhost:3001/movie/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .then(fetchMovie);
  };

  const updateMovie = (id: number) => {
    fetch("http://localhost:3001/movie/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: updateMovieName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .then(fetchMovie);
  };

  return (
    <div className="p-4 flex justify-center flex-col items-center text-center">
      <h1 className="text-4xl">シンプル CRUDアプリ</h1>
      <div className=" bg-zinc-800 rounded p-4 m-2">
        <p>Next：v13</p>
        <p>Fetch：CSR</p>
      </div>
      <div className="m-2">
        <h2 className="text-xl">Create</h2>
        映画名：
        <input
          type="text"
          onChange={(event) => {
            setCreateMovieName(event.target.value);
          }}
        />
        <button
          type="button"
          onClick={sendMovieName}
          className="rounded bg-neutral-600 p-2 ml-1"
        >
          作成
        </button>
      </div>
      {data &&
        data.map((d: Movie) => {
          return (
            <div key={d.ID} className="rounded bg-gray-800 p-8 my-2 w-96">
              <p className="text-xl my-2">
                <span className="px-2 py-1 mx-1 rounded bg-red-800">
                  {d.ID}
                </span>
                {d.NAME}
              </p>
              <p>{d.CREATED_AT}</p>
              <p>{d.UPDATED_AT}</p>
              {d.ID === open && (
                <div>
                  <input
                    type="text"
                    onChange={(event) => {
                      setUpdateMovieName(event.target.value);
                    }}
                  />
                  <button type="button" onClick={() => updateMovie(d.ID)}>
                    送信
                  </button>
                </div>
              )}

              <div className="mt-1">
                <button
                  type="button"
                  onClick={() => setOpen(d.ID === open ? -1 : d.ID)}
                  className="rounded bg-neutral-600 p-2 mr-1"
                >
                  {d.ID === open ? "閉じる" : "名前変更"}
                </button>
                <button
                  type="button"
                  onClick={() => deleteMovie(d.ID)}
                  className="rounded border-neutral-400 p-2 border"
                >
                  削除
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Main;
