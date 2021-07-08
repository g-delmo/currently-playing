import { useState } from "react";
import styled from "styled-components";
import Widget from "./widget";
import montereyBg from "../monterey-bg.jpeg";

const Page = styled.div`
  min-height: 100vh;
  width: 100%;
  background: rgb(11, 13, 15);
  color: white;
  font-family: "Inter", sans-serif;
  display: flex;
  justify-content: center;
  padding: 50px 0;
  box-sizing: border-box;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const Text = styled.span`
  margin-bottom: 15px;
  max-width: 540px;
  line-height: 140%;
`;

const Link = styled.a`
  color: inherit;
`;

const Label = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 7px;
  margin-top: 25px;
`;

const Small = styled.small`
  color: rgba(255, 255, 255, 0.5);
  font-size: small;
  margin-bottom: 10px;
`;

const TextInput = styled.input`
  outline: none;
  border: 1px solid #1c1c1c;
  background: none;
  border-radius: 5px;
  padding: 12px 16px;
  font-size: 16px;
  color: white;
  font-weight: 600;
  font-family: "Inter", sans-serif;
  caret-color: #84f8cc;

  &:focus {
    border: 1px solid #651fff;
  }
`;

const LightTitle = styled.span`
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 20px;
`;

const DemoBlock = styled.div`
  margin-bottom: 25px;
  background-image: url(${montereyBg});
  background-position: center;
  background-size: cover;
  height: 65vh;
  width: 600px;
  overflow: auto;
  position: relative;
  border-radius: 6px;
`;

const Button = styled.span<{ success: boolean }>`
  cursor: pointer;
  background: ${({ success }) => (success ? "#84f8cc" : "#651fff")};
  color: ${({ success }) => (success ? "#111" : "white")};
  font-weight: 700;
  border-radius: 5px;
  align-self: flex-start;
  transition: 0.2s background ease-out, 0.2s color ease-out;
  width: 110px;
  height: 44px;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Checkbox = styled.div<{ checked?: boolean }>`
  cursor: pointer;
  border: 1px solid #1c1c1c;
  background: none;
  border-radius: 5px;
  padding: 12px;
  width: max-content;

  ${(props) => {
    if (props.checked === true)
      return `
        background: #10B981;
      `;
  }}

  &:focus {
    border: 1px solid #651fff;
  }
`;

const InlineInputRow = styled.div`
  display: flex;
`;

const ColorBlock = styled.div<{ color: string }>`
  width: 50px;
  border-radius: 4px;
  background: ${(props) => `#${props.color}`};
  margin-right: 10px;
`;

const Select = styled.select`
  width: 100%;
  border: 1px solid #1c1c1c;
  background: none;
  border-radius: 5px;
  padding: 12px 16px;
  font-size: 16px;
  color: white;
  font-weight: 600;
  font-family: "Inter", sans-serif;
  caret-color: #84f8cc;
`;

const CustomizePage = () => {
  const [lastFMToken, setLastFMToken] = useState("");
  const [username, setUsername] = useState("");
  const [position, setPosition] = useState("middle");
  const [showTime, setShowTime] = useState(true);
  const [timeColor, setTimeColor] = useState("e4416c");
  const [songColor, setSongColor] = useState("b166cd");
  const [artistColor, setArtistColor] = useState("00a3ad");
  const [albumColor, setAlbumColor] = useState("fff");
  const [isCopied, setCopied] = useState(false);

  return (
    <Page>
      <Col style={{ marginLeft: "50px" }}>
        <Title>Customize your widget</Title>
        <Text>
          This app uses LastFM to get your listening status. You can sign up{" "}
          <Link href="https://last.fm" target="_blank">
            here
          </Link>{" "}
          if you haven't already.
        </Text>

        <Label>
          LastFM API Key (
          <Link href="https://www.last.fm/api/account/create" target="_blank">
            get it here
          </Link>
          )
        </Label>
        <TextInput
          placeholder="API Key"
          value={lastFMToken}
          onChange={(e) => setLastFMToken(e.target.value)}
        />

        <Label>LastFM Username</Label>
        <TextInput
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Label>Widget Position</Label>
        <Small>
          Note that you won't be able to see a difference on the preview here.
        </Small>

        <Select onChange={(e) => setPosition(e.target.value)}>
          <option value="middle" selected>
            Middle
          </option>
          <option value="top-left">Top Left</option>
          <option value="top-right">Top Right</option>
          <option value="bottom-left">Bottom Left</option>
          <option value="bottom-right">Bottom Right</option>
        </Select>

        <Label>Time color</Label>
        <InlineInputRow>
          <ColorBlock color={timeColor} />
          <TextInput
            placeholder="FFF"
            value={timeColor}
            onChange={(e) => setTimeColor(e.target.value)}
          />
        </InlineInputRow>

        <Label>Song name color</Label>
        <InlineInputRow>
          <ColorBlock color={songColor} />
          <TextInput
            placeholder="FFF"
            value={songColor}
            onChange={(e) => setSongColor(e.target.value)}
          />
        </InlineInputRow>

        <Label>Artist name color</Label>
        <InlineInputRow>
          <ColorBlock color={artistColor} />
          <TextInput
            placeholder="FFF"
            value={artistColor}
            onChange={(e) => setArtistColor(e.target.value)}
          />
        </InlineInputRow>

        <Label>Song name color</Label>
        <InlineInputRow>
          <ColorBlock color={albumColor} />
          <TextInput
            placeholder="FFF"
            value={albumColor}
            onChange={(e) => setAlbumColor(e.target.value)}
          />
        </InlineInputRow>

        <Label>Show time</Label>
        <Checkbox
          checked={showTime}
          onClick={() => setShowTime((value) => !value)}
        />
      </Col>

      <Col style={{ marginLeft: "100px", marginRight: "20px" }}>
        <LightTitle>Preview</LightTitle>
        <DemoBlock>
          <Widget
            token={lastFMToken}
            username={username}
            songColor={songColor}
            timeColor={timeColor}
            albumColor={albumColor}
            artistColor={artistColor}
            showTime={showTime}
          />
        </DemoBlock>
        <Button
          success={isCopied}
          onClick={() => {
            navigator.clipboard.writeText(
              `https://currently-playing-seven.vercel.app/widget?token=${lastFMToken}&username=${username}&position=${position}&showTime=${showTime}&songColor=${songColor}&timeColor=${timeColor}&albumColor=${albumColor}&artistColor=${artistColor}`
            );
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 2000);
          }}
        >
          {isCopied ? "Copied ✨" : "Copy Link"}
        </Button>
      </Col>
    </Page>
  );
};

export default CustomizePage;
