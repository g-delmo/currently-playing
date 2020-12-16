import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLastFM } from "use-last-fm";

const Column = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const TimeText = styled.span`
  color: #e4416c;
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Text = styled.span`
  color: white;
  margin-bottom: 0.5rem;
`;

const SongInfo = styled.div`
  display: flex;
  background: #0e0f13;
  padding: 1rem;
  width: 300px;
`;

const Image = styled.img`
  height: 80px;
  margin-right: 1rem;
  border-radius: 8px;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const SongName = styled.span`
  color: #b166cd;
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 2px;
`;

const SongArtist = styled.span`
  color: #00a3ad;
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 3px;
`;

const App = () => {
  const lastFM = useLastFM("g_delmo", "caa3bf0f53191497b3816efc68c41263");

  const [time, setTime] = useState("");

  setInterval(() => {
    const date = new Date();
    setTime(`${date.getHours()}:${date.getMinutes()}`);
  }, 1000);

  return (
    <Column>
      <TimeText>{time}</TimeText>
      <Text>
        {lastFM.status === "playing" ? "Currently Playing:" : "Not Listening"}
      </Text>
      {lastFM.status === "playing" && (
        <SongInfo>
          <Image src={lastFM.song.art} />
          <Col>
            <SongName>{lastFM.song.name}</SongName>
            <SongArtist>{lastFM.song.artist}</SongArtist>
            <Text>{lastFM.song.album}</Text>
          </Col>
        </SongInfo>
      )}
    </Column>
  );
};

export default App;
