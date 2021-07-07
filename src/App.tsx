import React, { useState } from "react";
import styled from "styled-components";
import { useLastFM } from "use-last-fm";
import dayjs from "dayjs"

const Column = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(11, 13, 15, 0.6);
  padding: 20px;
  border-radius: 8px;
  box-shadow: rgba(17, 12, 46, 0.3) 0px 48px 100px 0px;
  backdrop-filter: blur(20px);
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SongInfo = styled.div`
  display: flex;
  background: #0e0f13;
  padding: 1rem;
  width: 400px;
  border-radius: 6px;
`;

const Image = styled.img`
  height: 80px;
  margin-right: 1rem;
  border-radius: 8px;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(400px - 80px - 2rem);
`;

const SongName = styled.span`
  color: #b166cd;
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SongArtist = styled.span`
  color: #00a3ad;
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const App = () => {
  const lastFM = useLastFM("g_delmo", "caa3bf0f53191497b3816efc68c41263");

  const [time, setTime] = useState("");

  setInterval(() => {
    setTime(dayjs().format("H:MM:ss"));
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
