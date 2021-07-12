import githubLogo from "../assets/github-logo.png";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-bottom-left-radius: 6px;
  position: fixed;
  top: 0;
  right: 0;
  padding: 10px;

  img {
    height: 25px;
    width: 25px;
    margin-right: 6px;
  }

  span {
    font-size: 18px;
    font-weight: 600;
    color: #111;
  }
`;

const GitHubStars = () => {
  const getGitHubStars = async (): Promise<number> => {
    const response = await fetch(
      "https://api.github.com/repos/g-delmo/currently-playing"
    );
    const { stargazers_count } = await response.json();
    return stargazers_count;
  }; // Thanks Copilot!

  const [isLoading, setLoading] = useState(true);
  const [stars, setStars] = useState(0);

  const updateStars = async () => {
    const stars = await getGitHubStars();
    setLoading(false);
    setStars(stars);
  };

  useEffect(() => {
    updateStars();
    // This is needed to update the state only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <a
      href="https://github.com/g-delmo/currently-playing"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Container>
        <img src={githubLogo} alt="GitHub Logo" />
        <span>{isLoading ? "..." : `${stars || "Error"}`}</span>
      </Container>
    </a>
  );
};

export default GitHubStars;
