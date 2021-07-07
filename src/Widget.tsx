import React, { useState } from "react";
import styled from "styled-components";
import { useLastFM } from "use-last-fm";
import dayjs from "dayjs";

const Column = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(11, 13, 15, 0.6);
  padding: 20px;
  border-radius: 8px;
  box-shadow: rgba(17, 12, 46, 0.3) 0px 48px 100px 0px;
  backdrop-filter: blur(20px);
  font-family: "JetBrains Mono", monospace;
`;

const TimeText = styled.span<{ color?: string }>`
  color: ${(props) => props.color};
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Text = styled.span<{ color?: string }>`
  color: ${({ color }) => color || "white"};
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

const SongName = styled.span<{ color: string }>`
  color: ${(props) => props.color};
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SongArtist = styled.span<{ color: string }>`
  color: ${(props) => props.color};
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface WidgetProps {
  username?: string;
  token?: string;
  timeColor?: string;
  songColor?: string;
  artistColor?: string;
  albumColor?: string;
}

const Widget = ({
  username,
  token,
  songColor,
  timeColor,
  albumColor,
  artistColor,
}: WidgetProps) => {
  const lastFM = useLastFM(username || "", token || "");

  const [time, setTime] = useState("");

  setInterval(() => {
    setTime(dayjs().format("H:mm:ss"));
  }, 1000);

  return (
    <Column>
      <TimeText color={timeColor || "#e4416c"}>{time}</TimeText>
      <Text>
        {lastFM.status === "playing"
          ? "Currently Playing:"
          : dayjs().format("dddd D. MMM")}
      </Text>
      {lastFM.status === "playing" && (
        <SongInfo>
          <Image src={lastFM.song.art} />
          <Col>
            <SongName color={songColor || "#b166cd"}>
              {lastFM.song.name}
            </SongName>
            <SongArtist color={artistColor || "#00a3ad"}>
              {lastFM.song.artist}
            </SongArtist>
            <Text color={albumColor || "#fff"}>{lastFM.song.album}</Text>
          </Col>
        </SongInfo>
      )}
    </Column>
  );
};

export default Widget;
