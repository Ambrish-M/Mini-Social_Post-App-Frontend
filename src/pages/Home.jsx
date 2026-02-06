import { useState } from "react";
import AppNavbar from "../components/AppNavbar";
import CreatePost from "../components/CreatePost";
import FeedTabs from "../components/FeedTabs";
import PostList from "../components/PostList";
import { Container } from "react-bootstrap";

export default function Home() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <>
      <AppNavbar />

      <Container className="mt-3">
       
        <CreatePost />
        <FeedTabs activeTab={activeTab} onChange={setActiveTab} />
        <PostList activeTab={activeTab} />
      </Container>
    </>
  );
}
