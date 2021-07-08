import styled from "styled-components";
import dayjs from "dayjs";

import { useEffect, useState } from "react";
import { useLastFM } from "use-last-fm";
import { useLocation } from "react-router-dom";

const Column = styled.div<{ position?: widgetPosition }>`
  padding: 24px;

  ${(props) => {
    if (!props.position || props.position === "middle")
      return `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      `;
    else if (props.position === "top-left")
      return `
        position: absolute;
        top: 0;
        left: 0;
      `;
    else if (props.position === "top-right")
      return `
        position: absolute;
        top: 0;
        right: 0;
      `;
    else if (props.position === "bottom-left")
      return `
        position: absolute;
        bottom: 0;
        left: 0;
      `;
    else if (props.position === "bottom-right")
      return `
        position: absolute;
        bottom: 0;
        right: 0;
      `;
  }}
`;

const Card = styled.div`
  background: rgba(11, 13, 15, 0.6);
  box-shadow: rgba(17, 12, 46, 0.3) 0px 48px 100px 0px;
  backdrop-filter: blur(20px);
  border-radius: 8px;
  font-family: "JetBrains Mono", monospace;
  padding: 20px;

  height: max-content;
  width: max-content;

  display: flex;
  flex-direction: column;
`;

const TimeText = styled.span<{ color?: string }>`
  color: ${(props) => `#${props.color}`};
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Text = styled.span<{ color?: string }>`
  color: ${(props) => `#${props.color || "fff"}`};
  margin-bottom: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SongInfo = styled.div`
  display: flex;
  align-items: center;
  background: #0e0f13;
  padding: 1rem;
  width: 400px;
  border-radius: 6px;
`;

const Image = styled.img`
  height: 80px;
  width: 80px;
  margin-right: 1rem;
  border-radius: 8px;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(400px - 80px - 2rem);
`;

const SongName = styled.span<{ color: string }>`
  color: ${(props) => `#${props.color}`};
  font-weight: 500;
  font-size: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SongArtist = styled.span<{ color: string }>`
  color: ${(props) => `#${props.color}`};
  font-weight: 500;
  font-size: 18px;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export type widgetPosition =
  | "middle"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

interface WidgetProps {
  username?: string;
  token?: string;
  position?: widgetPosition;
  timeColor?: string;
  songColor?: string;
  artistColor?: string;
  albumColor?: string;
  showTime?: boolean;
}

const Widget = ({
  username,
  token,
  songColor,
  timeColor,
  albumColor,
  artistColor,
  showTime,
  position,
}: WidgetProps) => {
  const [time, setTime] = useState("");

  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const isShowTime = showTime === false || params.get("showTime") === "false";

  const lastFM = useLastFM(
    username || params.get("username") || "",
    token || params.get("token") || ""
  );

  useEffect(() => {
    let interval: number;
    if (!isShowTime) {
      setInterval(() => {
        setTime(dayjs().format("H:mm:ss"));
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isShowTime]);

  return (
    <Column
      position={
        position ||
        (params.get("position")?.toLowerCase() as widgetPosition) ||
        "middle"
      }
    >
      <Card>
        {!isShowTime && (
          <TimeText color={timeColor || params.get("timeColor") || "e4416c"}>
            {time || "..:..:.."}
          </TimeText>
        )}

        <Text>
          {lastFM.status === "playing"
            ? "Currently Playing:"
            : dayjs().format("dddd D. MMM")}
        </Text>

        {lastFM.status === "playing" && (
          <SongInfo>
            <Image src={lastFM.song.art} />

            <Col>
              <SongName
                color={songColor || params.get("songColor") || "b166cd"}
              >
                {lastFM.song.name}
              </SongName>

              <SongArtist
                color={artistColor || params.get("artistColor") || "00a3ad"}
              >
                {lastFM.song.artist}
              </SongArtist>

              <Text color={albumColor || params.get("albumColor") || "fff"}>
                {lastFM.song.album}
              </Text>
            </Col>
          </SongInfo>
        )}
      </Card>
    </Column>
  );
};

export default Widget;
